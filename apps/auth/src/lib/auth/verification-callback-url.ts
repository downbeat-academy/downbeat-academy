/**
 * Every consumer app (www, cadence-links) serves a page here that starts a
 * fresh OAuth flow on load.
 */
const CONSUMER_SIGN_IN_PATH = '/sign-in'

interface ResolveVerificationCallbackUrlOptions {
	authServiceUrl: string
	defaultRedirectUrl: string
	trustedOrigins: string[]
}

function parseUrl(value: string | null | undefined): URL | null {
	if (!value) return null
	try {
		return new URL(value)
	} catch {
		return null
	}
}

/**
 * Where the sign-up verification link sends a new user once they are verified
 * and signed in on the auth service, so they land signed in to the app they
 * started from.
 *
 * `redirectUri` is what the sign-in page hands the sign-up form: during an
 * OAuth flow, the rebuilt `/oauth2/authorize` URL. We deliberately do **not**
 * send the user back to that URL. The consumer's OAuth `state` cookie lasts
 * five minutes and the signed authorize URL ten, so by the time someone opens
 * the email — possibly in another browser — it fails with `state_mismatch`.
 * Instead the user goes to the consumer's own sign-in page, which starts a new
 * flow that completes without a prompt, because they are already signed in
 * here.
 *
 * Only trusted origins are ever returned: better-auth origin-checks this URL
 * when the link is clicked, so an untrusted one would fail after the user has
 * done everything right. Returns `undefined` when there is nothing trusted to
 * go to, leaving better-auth's default of `/`.
 */
export function resolveVerificationCallbackUrl(
	redirectUri: string | undefined,
	{ authServiceUrl, defaultRedirectUrl, trustedOrigins }: ResolveVerificationCallbackUrlOptions,
): string | undefined {
	const authOrigin = parseUrl(authServiceUrl)?.origin
	const isConsumerOrigin = (origin: string) =>
		origin !== authOrigin && trustedOrigins.includes(origin)

	const target = parseUrl(redirectUri)

	if (target?.origin === authOrigin) {
		if (target.pathname.endsWith('/oauth2/authorize')) {
			// The app's OAuth callback, e.g. https://www…/api/auth/oauth2/callback/downbeat-auth
			const app = parseUrl(target.searchParams.get('redirect_uri'))
			if (app && isConsumerOrigin(app.origin)) {
				return `${app.origin}${CONSUMER_SIGN_IN_PATH}`
			}
		} else {
			// Somewhere on the auth service itself — the session is already here
			return target.toString()
		}
	} else if (target && isConsumerOrigin(target.origin)) {
		// The path is dropped: the consumer only accepts a narrow set of
		// relative callback paths, and a rejected one would leave the user on
		// an error page instead of signed in.
		return `${target.origin}${CONSUMER_SIGN_IN_PATH}`
	}

	// No usable context (e.g. someone signed up directly on the auth service)
	const fallback = parseUrl(defaultRedirectUrl)
	if (fallback && isConsumerOrigin(fallback.origin)) {
		return `${fallback.origin}${CONSUMER_SIGN_IN_PATH}`
	}

	return undefined
}
