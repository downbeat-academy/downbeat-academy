/**
 * Hosts the auth service is allowed to report analytics from.
 *
 * The same principle as `POSTHOG_ALLOWED_HOSTS` in `apps/www`: without a gate,
 * local development and every preview deploy write into the production PostHog
 * project, and there is no way to tell real sign-ins from your own.
 *
 * Gated on the service's own configured URL rather than `NODE_ENV`, because a
 * preview deploy also runs with `NODE_ENV=production`.
 */
export const POSTHOG_ALLOWED_AUTH_HOSTS = ['auth.downbeatacademy.services']

export type AuthAnalyticsGateInput = {
	/** `AUTH_SERVICE_URL` — the origin this service believes it is serving. */
	authServiceUrl: string | undefined
	/** `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`. */
	token: string | undefined
	/**
	 * Escape hatch for verifying instrumentation locally, via
	 * `POSTHOG_DEBUG=true`. Events land in the production project.
	 */
	forceEnable?: boolean
}

export function shouldCaptureAuthAnalytics({
	authServiceUrl,
	token,
	forceEnable = false,
}: AuthAnalyticsGateInput): boolean {
	if (!token) return false
	if (forceEnable) return true
	if (!authServiceUrl) return false

	try {
		const { hostname } = new URL(authServiceUrl)
		return POSTHOG_ALLOWED_AUTH_HOSTS.includes(hostname)
	} catch {
		// A malformed AUTH_SERVICE_URL should not capture, and should not throw
		// during auth initialisation either.
		return false
	}
}
