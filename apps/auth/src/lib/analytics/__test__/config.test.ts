import { describe, expect, it } from 'vitest'

import { shouldCaptureAuthAnalytics } from '../config'

const TOKEN = 'phc_test_token'
const PRODUCTION_URL = 'https://auth.downbeatacademy.services'

describe('shouldCaptureAuthAnalytics', () => {
	it('captures when running as the production auth service', () => {
		expect(
			shouldCaptureAuthAnalytics({
				authServiceUrl: PRODUCTION_URL,
				token: TOKEN,
			})
		).toBe(true)
	})

	it('does not capture without a token', () => {
		expect(
			shouldCaptureAuthAnalytics({
				authServiceUrl: PRODUCTION_URL,
				token: undefined,
			})
		).toBe(false)
	})

	it('does not capture from localhost', () => {
		expect(
			shouldCaptureAuthAnalytics({
				authServiceUrl: 'http://localhost:3002',
				token: TOKEN,
			})
		).toBe(false)
	})

	it('does not capture from a preview deploy', () => {
		// Gated on the service URL rather than NODE_ENV precisely because a
		// preview deploy also runs with NODE_ENV=production.
		expect(
			shouldCaptureAuthAnalytics({
				authServiceUrl: 'https://auth-pr-42.up.railway.app',
				token: TOKEN,
			})
		).toBe(false)
	})

	it('does not capture from a lookalike host', () => {
		expect(
			shouldCaptureAuthAnalytics({
				authServiceUrl: 'https://auth.downbeatacademy.services.evil.example',
				token: TOKEN,
			})
		).toBe(false)
	})

	it('does not throw on a malformed service URL', () => {
		// This runs during auth initialisation — throwing here would take down
		// sign-in for everyone over an analytics config problem.
		expect(() =>
			shouldCaptureAuthAnalytics({
				authServiceUrl: 'not a url',
				token: TOKEN,
			})
		).not.toThrow()

		expect(
			shouldCaptureAuthAnalytics({ authServiceUrl: 'not a url', token: TOKEN })
		).toBe(false)
	})

	it('does not capture when the service URL is unset', () => {
		expect(
			shouldCaptureAuthAnalytics({ authServiceUrl: undefined, token: TOKEN })
		).toBe(false)
	})

	it('captures anywhere when the debug escape hatch is on', () => {
		expect(
			shouldCaptureAuthAnalytics({
				authServiceUrl: 'http://localhost:3002',
				token: TOKEN,
				forceEnable: true,
			})
		).toBe(true)
	})
})
