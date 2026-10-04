import { PostHog } from 'posthog-node'
import type { AnalyticsEvent, AnalyticsEventMap } from 'analytics'

import { shouldCapturePostHogServer } from './config'

/**
 * `undefined` = not yet resolved, `null` = deliberately disabled. Distinguishing
 * the two keeps the gate from being re-evaluated on every error.
 */
let client: PostHog | null | undefined

/**
 * Server-side PostHog client, for exception capture and for the few events
 * that must come from the server (see `captureServerEvent`). Product analytics
 * in `www` stay client-side, through `capture.ts`.
 *
 * A singleton because `www` is a long-running Node server on Railway, not a
 * serverless function. `flushAt: 1` sends each event immediately, so no
 * shutdown hook is needed to avoid losing them.
 */
export function getPostHogServer(): PostHog | null {
	if (client !== undefined) return client

	const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

	if (
		!shouldCapturePostHogServer({
			projectUrl: process.env.NEXT_PUBLIC_PROJECT_URL,
			token,
			forceEnable: process.env.NEXT_PUBLIC_POSTHOG_DEBUG === 'true',
		})
	) {
		client = null
		return null
	}

	client = new PostHog(token as string, {
		host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
		flushAt: 1,
		flushInterval: 0,
	})

	return client
}

/**
 * Reads the visitor's distinct id from the `ph_<token>_posthog` cookie that
 * posthog-js sets, so a server error lands on the same person as their
 * client-side events. Returns `undefined` for visitors without one (bots,
 * first requests, or anyone on a host where the client never initialised),
 * and PostHog then records the exception without a person.
 */
export function getDistinctIdFromCookie(
	cookieHeader: string | undefined,
	token: string | undefined
): string | undefined {
	if (!cookieHeader || !token) return undefined

	const name = `ph_${token}_posthog=`
	const raw = cookieHeader
		.split(';')
		.map((part) => part.trim())
		.find((part) => part.startsWith(name))
		?.slice(name.length)

	if (!raw) return undefined

	try {
		const parsed = JSON.parse(decodeURIComponent(raw)) as {
			distinct_id?: unknown
		}
		return typeof parsed.distinct_id === 'string'
			? parsed.distinct_id
			: undefined
	} catch {
		return undefined
	}
}

type CaptureInput<E extends AnalyticsEvent> = [AnalyticsEventMap[E]] extends [
	never,
]
	? { distinctId: string; event: E; properties?: undefined }
	: { distinctId: string; event: E; properties: AnalyticsEventMap[E] }

/**
 * Captures a taxonomy event from the server. Reserved for events that must not
 * depend on the browser — an audit record, for instance, should not vanish
 * because an admin runs an ad blocker. Everything else belongs in `capture.ts`.
 *
 * Never throws: a failed capture must not fail the action that triggered it.
 */
export function captureServerEvent<E extends AnalyticsEvent>({
	distinctId,
	event,
	properties,
}: CaptureInput<E>): void {
	const posthog = getPostHogServer()
	if (!posthog) return

	try {
		posthog.capture({
			distinctId,
			event,
			properties: properties as Record<string, unknown> | undefined,
		})
	} catch {
		// Analytics must never break the caller.
	}
}

/** Test seam — forces the gate to be re-evaluated on the next call. */
export function resetPostHogServerForTests(): void {
	client = undefined
}
