/**
 * Works out whether a request to the OAuth token endpoint granted a consumer
 * app access to a user's account, and to whom.
 *
 * ## Why this endpoint, and not the consent screen
 *
 * There is no consent screen. All three consumer apps are first-party and
 * registered with `skipConsent`, so `/oauth2/authorize` redirects straight back
 * with a code and no one is ever asked to approve anything. Instrumenting a
 * consent click would report zero forever.
 *
 * `/oauth2/token` is where the grant actually becomes real: the code is
 * exchanged, the access token row is written, and the consumer app can now act
 * for the user. It happens exactly once per authorisation.
 *
 * ## Why the id_token, and not better-auth's internals
 *
 * `sub` (the subject) and `aud` (the audience) are OpenID Connect claims with
 * spec-defined meanings — the user the token is about, and the client it was
 * issued for. Reading them keeps this tied to the protocol rather than to
 * better-auth's plugin internals, which are not a stable interface: the
 * authorize endpoint signals success by *throwing* a redirect, and the token
 * row is a plugin model that `databaseHooks` cannot see. Both were considered
 * and rejected — an analytics event that breaks silently on a minor version
 * bump is the exact failure this instrumentation exists to prevent.
 *
 * The token is not verified here. We minted it ourselves microseconds earlier
 * and are only reading it back; nothing security-relevant depends on the
 * result, and a forged token could at worst distort an analytics count.
 */
import type { AnalyticsEventMap } from 'analytics'

export type OAuthGrant = {
	/** The better-auth `user.id`, from the `sub` claim. */
	distinctId: string
} & AnalyticsEventMap['oauth_authorization_granted']

export type ResolveOAuthGrantInput = {
	/** The better-auth endpoint path that handled the request. */
	path: string | undefined
	/** `grant_type` from the token request body. */
	grantType: unknown
	/** The `id_token` from the token response. */
	idToken: unknown
}

/**
 * Returns `null` for anything that is not a completed authorisation-code
 * exchange carrying both claims.
 */
export function resolveOAuthGrant({
	path,
	grantType,
	idToken,
}: ResolveOAuthGrantInput): OAuthGrant | null {
	if (path !== '/oauth2/token') return null

	// A refresh also arrives here. Renewing a token the user already granted is
	// not a new authorisation, and counting it would turn this event into a
	// measure of session length — the same mistake `resolveAuthMethod` exists to
	// prevent for `sign_in_completed`.
	if (grantType !== 'authorization_code') return null

	const claims = decodeJwtClaims(idToken)
	if (!claims) return null

	const { sub, aud } = claims

	// `aud` is permitted to be an array by the spec. This provider always issues
	// a single audience, but narrowing rather than assuming keeps a malformed
	// token from becoming an event with a `[object Object]` client_id.
	if (typeof sub !== 'string' || !sub) return null
	if (typeof aud !== 'string' || !aud) return null

	return { distinctId: sub, client_id: aud }
}

/**
 * Reads the payload of a JWT without verifying it. Returns `null` for anything
 * that is not a decodable three-segment token with a JSON object payload.
 */
function decodeJwtClaims(token: unknown): Record<string, unknown> | null {
	if (typeof token !== 'string') return null

	const segments = token.split('.')
	if (segments.length !== 3) return null

	try {
		const payload = Buffer.from(segments[1], 'base64url').toString('utf8')
		const parsed: unknown = JSON.parse(payload)

		if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
			return null
		}

		return parsed as Record<string, unknown>
	} catch {
		// A malformed token must not throw inside an auth hook.
		return null
	}
}
