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
