import { PostHog } from 'posthog-node'
import type { AnalyticsEvent, AnalyticsEventMap } from 'analytics'

import { shouldCaptureAuthAnalytics } from './config'

/**
 * `undefined` = not yet resolved, `null` = deliberately disabled. Distinguishing
 * the two keeps the gate from being re-evaluated on every event.
 */
let client: PostHog | null | undefined

function getClient(): PostHog | null {
	if (client !== undefined) return client

	const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

	if (
		!shouldCaptureAuthAnalytics({
			authServiceUrl: process.env.AUTH_SERVICE_URL,
			token,
			forceEnable: process.env.POSTHOG_DEBUG === 'true',
		})
	) {
		client = null
		return null
	}

	// A singleton, unlike `www`'s old per-call construction: this is a
	// long-running Node server on Railway, not a serverless function.
	// `flushAt: 1` sends each event immediately, so no shutdown hook is needed
	// to avoid losing them.
	client = new PostHog(token as string, {
		host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
		flushAt: 1,
		flushInterval: 0,
	})

	return client
}

type CaptureInput<E extends AnalyticsEvent> = [AnalyticsEventMap[E]] extends [
	never,
]
	? { distinctId: string; event: E; properties?: undefined }
	: { distinctId: string; event: E; properties: AnalyticsEventMap[E] }

/**
 * Captures an auth-funnel event.
 *
 * `distinctId` must be the better-auth `user.id`. That is the same id
 * `apps/www` identifies with, and it is the only thing tying the two together:
 * they sit on different domains (`downbeatacademy.com` and
 * `auth.downbeatacademy.services`), so there is no shared cookie and no common
 * anonymous id.
 *
 * Deliberately **not** awaited by callers and never throws. This runs inside
 * better-auth hooks on the critical path of signing in — analytics failing must
 * never fail an authentication.
 */
export function captureAuthEvent<E extends AnalyticsEvent>({
	distinctId,
	event,
	properties,
}: CaptureInput<E>): void {
	const posthog = getClient()
	if (!posthog) return

	try {
		posthog.capture({
			distinctId,
			event,
			properties: properties as Record<string, unknown> | undefined,
		})
	} catch {
		// Never let analytics break authentication.
	}
}

/** Test seam — forces the gate to be re-evaluated on the next capture. */
export function resetPostHogClientForTests(): void {
	client = undefined
}
