/**
 * Hosts PostHog is allowed to report from.
 *
 * Mirrors the `includedDomains` restriction already applied to Fathom in
 * `src/lib/fathom.tsx`. Without this, local development and every preview
 * deploy write into the same PostHog project as production, which makes the
 * data untrustworthy — you cannot tell real traffic from your own.
 */
export const POSTHOG_ALLOWED_HOSTS = [
	'downbeatacademy.com',
	'www.downbeatacademy.com',
]

export type PostHogGateInput = {
	/** `window.location.hostname` at init time. */
	hostname: string
	/** `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`. */
	token: string | undefined
	/**
	 * Escape hatch for verifying your own instrumentation locally, set via
	 * `NEXT_PUBLIC_POSTHOG_DEBUG=true`. Events captured this way land in the
	 * production project, so turn it off again when you are done.
	 */
	forceEnable?: boolean
}

/**
 * Whether PostHog should initialise at all. Kept separate from
 * `instrumentation-client.ts` so the gate is testable — that file runs its
 * side effects at import time and cannot be exercised directly.
 */
export function shouldInitPostHog({
	hostname,
	token,
	forceEnable = false,
}: PostHogGateInput): boolean {
	if (!token) return false
	if (forceEnable) return true

	return POSTHOG_ALLOWED_HOSTS.includes(hostname)
}

export type PostHogServerGateInput = {
	/** `NEXT_PUBLIC_PROJECT_URL` — the origin this deployment believes it is serving. */
	projectUrl: string | undefined
	/** `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`. */
	token: string | undefined
	/** Same escape hatch as the client, via `NEXT_PUBLIC_POSTHOG_DEBUG=true`. */
	forceEnable?: boolean
}

/**
 * The server-side counterpart of `shouldInitPostHog`, used for exception capture
 * in `instrumentation.ts`. There is no `window.location` on the server, so it
 * gates on the configured project URL instead — the same approach `apps/auth`
 * takes with `AUTH_SERVICE_URL`. `NODE_ENV` is no use here: a preview deploy
 * also runs with `NODE_ENV=production`.
 */
export function shouldCapturePostHogServer({
	projectUrl,
	token,
	forceEnable = false,
}: PostHogServerGateInput): boolean {
	if (!token) return false
	if (forceEnable) return true
	if (!projectUrl) return false

	try {
		return POSTHOG_ALLOWED_HOSTS.includes(new URL(projectUrl).hostname)
	} catch {
		// A malformed URL should not capture, and must not throw while reporting
		// an error.
		return false
	}
}
