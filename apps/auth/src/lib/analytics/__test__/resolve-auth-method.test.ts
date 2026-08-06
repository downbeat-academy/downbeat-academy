import { describe, expect, it } from 'vitest'

import { resolveAuthMethod } from '../resolve-auth-method'

describe('resolveAuthMethod', () => {
	it('resolves the OAuth callback paths', () => {
		expect(resolveAuthMethod('/callback/google')).toBe('oauth')
		expect(resolveAuthMethod('/oauth2/callback/github')).toBe('oauth')
	})

	it('resolves the email paths', () => {
		expect(resolveAuthMethod('/sign-in/email')).toBe('email')
		expect(resolveAuthMethod('/sign-up/email')).toBe('email')
	})

	it('returns null for anything that is not a sign-in entry point', () => {
		// This is what keeps session refreshes out of the sign-in count. A
		// session row is created for reasons other than someone signing in, and
		// reporting those as sign-ins would silently inflate the funnel.
		expect(resolveAuthMethod('/get-session')).toBeNull()
		expect(resolveAuthMethod('/update-user')).toBeNull()
		expect(resolveAuthMethod('/token')).toBeNull()
	})

	it('returns null when there is no path', () => {
		expect(resolveAuthMethod(undefined)).toBeNull()
		expect(resolveAuthMethod('')).toBeNull()
	})

	it('does not treat a lookalike path as a callback', () => {
		expect(resolveAuthMethod('/not-a/callback/google')).toBeNull()
		expect(resolveAuthMethod('/sign-in/email-otp')).toBeNull()
	})
})
