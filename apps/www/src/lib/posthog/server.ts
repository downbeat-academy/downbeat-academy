import { PostHog } from 'posthog-node'

import { shouldCapturePostHogServer } from './config'

/**
 * `undefined` = not yet resolved, `null` = deliberately disabled. Distinguishing
 * the two keeps the gate from being re-evaluated on every error.
 */
let client: PostHog | null | undefined

/**
 * Server-side PostHog client, used only for exception capture. Product
 * analytics in `www` stay client-side, through `capture.ts`.
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

/** Test seam — forces the gate to be re-evaluated on the next call. */
export function resetPostHogServerForTests(): void {
	client = undefined
}
