import type { AuthMethod } from 'analytics'

/**
 * Works out whether a request authenticated via OAuth or email/password, from
 * the better-auth endpoint path that handled it.
 *
 * The path is the only signal available inside a database hook. This mirrors
 * the resolution better-auth's own `last-login-method` plugin performs, kept
 * to the two methods this service actually supports.
 *
 * Returns `null` when the path is not a recognised authentication entry point —
 * a session created by some other route should not be reported as either.
 */
export function resolveAuthMethod(path: string | undefined): AuthMethod | null {
	if (!path) return null

	if (path.startsWith('/callback/') || path.startsWith('/oauth2/callback/')) {
		return 'oauth'
	}

	if (path === '/sign-in/email' || path === '/sign-up/email') {
		return 'email'
	}

	return null
}
