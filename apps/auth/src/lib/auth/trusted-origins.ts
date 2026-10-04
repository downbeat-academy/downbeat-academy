/**
 * Origins better-auth trusts for cross-origin requests and redirect targets.
 *
 * Shared with `resolveVerificationCallbackUrl`: better-auth origin-checks the
 * verification link's `callbackURL` against this list, so any URL that link
 * redirects to must be built from it.
 */
export function getTrustedOrigins(isDev = process.env.NODE_ENV === 'development'): string[] {
	return [
		'https://downbeatacademy.com',
		'https://www.downbeatacademy.com',
		'https://auth.downbeatacademy.services',
		'https://links.downbeatacademy.services',
		// Add localhost for development
		...(isDev ? ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'] : []),
	]
}
