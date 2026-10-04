import { describe, expect, it } from 'vitest'

import { getTrustedOrigins } from '../trusted-origins'
import { resolveVerificationCallbackUrl } from '../verification-callback-url'

const options = {
	authServiceUrl: 'https://auth.downbeatacademy.services',
	defaultRedirectUrl: 'https://downbeatacademy.com',
	trustedOrigins: getTrustedOrigins(false),
}

// Shaped as the auth sign-in page rebuilds it during an OAuth flow
function authorizeUrl(redirectUri: string) {
	const url = new URL('https://auth.downbeatacademy.services/api/auth/oauth2/authorize')
	url.searchParams.set('response_type', 'code')
	url.searchParams.set('client_id', 'www')
	url.searchParams.set('redirect_uri', redirectUri)
	url.searchParams.set('state', 'consumer-state')
	url.searchParams.set('code_challenge', 'challenge')
	url.searchParams.set('code_challenge_method', 'S256')
	url.searchParams.set('exp', '1790000000')
	url.searchParams.set('sig', 'signature')
	return url.toString()
}

describe('resolveVerificationCallbackUrl', () => {
	it('sends a user who started from www back to www’s sign-in', () => {
		const redirectUri = authorizeUrl(
			'https://www.downbeatacademy.com/api/auth/oauth2/callback/downbeat-auth',
		)

		expect(resolveVerificationCallbackUrl(redirectUri, options)).toBe(
			'https://www.downbeatacademy.com/sign-in',
		)
	})

	it('sends a user who started from cadence-links back to cadence-links', () => {
		const redirectUri = authorizeUrl(
			'https://links.downbeatacademy.services/api/auth/oauth2/callback/downbeat-auth',
		)

		expect(resolveVerificationCallbackUrl(redirectUri, options)).toBe(
			'https://links.downbeatacademy.services/sign-in',
		)
	})

	it('never returns the authorize URL itself', () => {
		// Its consumer state outlives neither the five-minute cookie nor the
		// signed URL's expiry, so reusing it would fail with state_mismatch.
		const redirectUri = authorizeUrl(
			'https://www.downbeatacademy.com/api/auth/oauth2/callback/downbeat-auth',
		)

		expect(resolveVerificationCallbackUrl(redirectUri, options)).not.toContain('oauth2/authorize')
	})

	it('falls back to the default app when the authorize redirect is untrusted', () => {
		const redirectUri = authorizeUrl('https://evil.example.com/callback')

		expect(resolveVerificationCallbackUrl(redirectUri, options)).toBe(
			'https://downbeatacademy.com/sign-in',
		)
	})

	it('sends a plain redirect to a consumer app to that app’s sign-in', () => {
		expect(
			resolveVerificationCallbackUrl('https://www.downbeatacademy.com/lessons?level=2', options),
		).toBe('https://www.downbeatacademy.com/sign-in')
	})

	it('leaves a redirect within the auth service as it is', () => {
		expect(
			resolveVerificationCallbackUrl('https://auth.downbeatacademy.services/admin', options),
		).toBe('https://auth.downbeatacademy.services/admin')
	})

	it('falls back to the default app with no redirect context', () => {
		expect(resolveVerificationCallbackUrl(undefined, options)).toBe(
			'https://downbeatacademy.com/sign-in',
		)
		expect(resolveVerificationCallbackUrl('not a url', options)).toBe(
			'https://downbeatacademy.com/sign-in',
		)
	})

	it('falls back for an untrusted plain redirect', () => {
		expect(resolveVerificationCallbackUrl('https://evil.example.com/', options)).toBe(
			'https://downbeatacademy.com/sign-in',
		)
	})

	it('returns undefined when even the default is untrusted', () => {
		expect(
			resolveVerificationCallbackUrl(undefined, {
				...options,
				defaultRedirectUrl: 'https://evil.example.com',
			}),
		).toBeUndefined()
	})

	it('resolves local development URLs when localhost is trusted', () => {
		const redirectUri = new URL('http://localhost:3002/api/auth/oauth2/authorize')
		redirectUri.searchParams.set(
			'redirect_uri',
			'http://localhost:3001/api/auth/oauth2/callback/downbeat-auth',
		)

		expect(
			resolveVerificationCallbackUrl(redirectUri.toString(), {
				authServiceUrl: 'http://localhost:3002',
				defaultRedirectUrl: 'http://localhost:3000',
				trustedOrigins: getTrustedOrigins(true),
			}),
		).toBe('http://localhost:3001/sign-in')
	})
})
