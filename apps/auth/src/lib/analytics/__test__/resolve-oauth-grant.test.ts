import { describe, expect, it } from 'vitest'

import { resolveOAuthGrant } from '../resolve-oauth-grant'

/**
 * Builds an unsigned JWT with the given payload. The resolver never verifies
 * the signature — the provider minted the real token itself moments earlier —
 * so a stub segment is enough to exercise the decode path.
 */
function idTokenWith(payload: Record<string, unknown>): string {
	const encode = (value: unknown) =>
		Buffer.from(JSON.stringify(value)).toString('base64url')

	return `${encode({ alg: 'EdDSA', typ: 'JWT' })}.${encode(payload)}.signature`
}

const WWW_GRANT = {
	path: '/oauth2/token',
	grantType: 'authorization_code',
	idToken: idTokenWith({ sub: 'user_abc123', aud: 'www-client-id' }),
}

describe('resolveOAuthGrant', () => {
	it('resolves a completed authorization code exchange', () => {
		expect(resolveOAuthGrant(WWW_GRANT)).toEqual({
			distinctId: 'user_abc123',
			client_id: 'www-client-id',
		})
	})

	it('reads the user from `sub` and the app from `aud`', () => {
		// These are the two OIDC claims the event is built on. `sub` has to be
		// the better-auth user.id or the auth funnel stops stitching to the www
		// events, which is the failure that is hardest to notice.
		const grant = resolveOAuthGrant({
			...WWW_GRANT,
			idToken: idTokenWith({ sub: 'user_xyz', aud: 'cadence-links-client' }),
		})

		expect(grant?.distinctId).toBe('user_xyz')
		expect(grant?.client_id).toBe('cadence-links-client')
	})

	it('ignores a refresh token exchange', () => {
		// The single most important negative case. A refresh hits the same
		// endpoint with the same shape of response, and counting it would turn
		// this event into a measure of how long people stay signed in.
		expect(
			resolveOAuthGrant({ ...WWW_GRANT, grantType: 'refresh_token' }),
		).toBeNull()
	})

	it('ignores every other endpoint', () => {
		expect(resolveOAuthGrant({ ...WWW_GRANT, path: '/oauth2/authorize' })).toBeNull()
		expect(resolveOAuthGrant({ ...WWW_GRANT, path: '/oauth2/userinfo' })).toBeNull()
		expect(resolveOAuthGrant({ ...WWW_GRANT, path: undefined })).toBeNull()
	})

	it('returns null when there is no id_token', () => {
		// The provider only issues one when `openid` is among the scopes. Both
		// consumer apps request it, but a client that did not would produce no
		// event rather than an event with a missing user.
		expect(resolveOAuthGrant({ ...WWW_GRANT, idToken: undefined })).toBeNull()
	})

	it('returns null rather than throwing on a malformed token', () => {
		// This runs inside an auth hook. Throwing here would fail the token
		// exchange itself, so a broken token must degrade to no event.
		for (const idToken of [
			'not-a-jwt',
			'only.two',
			'a.!!!not-base64!!!.c',
			`${Buffer.from('{').toString('base64url')}.${Buffer.from('{').toString('base64url')}.c`,
			123,
			null,
		]) {
			expect(() => resolveOAuthGrant({ ...WWW_GRANT, idToken })).not.toThrow()
			expect(resolveOAuthGrant({ ...WWW_GRANT, idToken })).toBeNull()
		}
	})

	it('rejects claims that are present but not usable strings', () => {
		// An event carrying an empty or non-string client_id is worse than no
		// event: it produces a chart that looks plausible and is wrong.
		const cases = [
			{ sub: 'user_abc', aud: '' },
			{ sub: '', aud: 'www-client-id' },
			{ sub: 'user_abc' },
			{ aud: 'www-client-id' },
			// The spec permits an array audience. This provider issues a single
			// string, so an array means something changed and should not be
			// coerced into `[object Object]`.
			{ sub: 'user_abc', aud: ['www-client-id'] },
			{ sub: { id: 'user_abc' }, aud: 'www-client-id' },
		]

		for (const payload of cases) {
			expect(
				resolveOAuthGrant({ ...WWW_GRANT, idToken: idTokenWith(payload) }),
			).toBeNull()
		}
	})

	it('returns null when the payload is not a JSON object', () => {
		const encode = (value: unknown) =>
			Buffer.from(JSON.stringify(value)).toString('base64url')

		for (const payload of ['a string', 42, ['sub', 'aud'], null]) {
			expect(
				resolveOAuthGrant({
					...WWW_GRANT,
					idToken: `${encode({})}.${encode(payload)}.signature`,
				}),
			).toBeNull()
		}
	})
})
