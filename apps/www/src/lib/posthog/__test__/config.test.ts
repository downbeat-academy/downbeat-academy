import { describe, expect, it } from 'vitest'

import {
	POSTHOG_ALLOWED_HOSTS,
	shouldCapturePostHogServer,
	shouldInitPostHog,
} from '../config'

const TOKEN = 'phc_test_token'

describe('shouldInitPostHog', () => {
	it('initialises on the production hosts', () => {
		for (const hostname of POSTHOG_ALLOWED_HOSTS) {
			expect(shouldInitPostHog({ hostname, token: TOKEN })).toBe(true)
		}
	})

	it('does not initialise without a token', () => {
		expect(
			shouldInitPostHog({ hostname: 'downbeatacademy.com', token: undefined })
		).toBe(false)
		expect(
			shouldInitPostHog({ hostname: 'downbeatacademy.com', token: '' })
		).toBe(false)
	})

	it('does not initialise on localhost', () => {
		expect(shouldInitPostHog({ hostname: 'localhost', token: TOKEN })).toBe(
			false
		)
	})

	it('does not initialise on preview deploys', () => {
		// The failure this guards: preview traffic silently polluting the
		// production project, indistinguishable from real users.
		expect(
			shouldInitPostHog({
				hostname: 'downbeat-academy-pr-123.up.railway.app',
				token: TOKEN,
			})
		).toBe(false)
	})

	it('does not initialise on a lookalike host', () => {
		expect(
			shouldInitPostHog({
				hostname: 'downbeatacademy.com.evil.example',
				token: TOKEN,
			})
		).toBe(false)
		expect(
			shouldInitPostHog({ hostname: 'staging.downbeatacademy.com', token: TOKEN })
		).toBe(false)
	})

	it('initialises anywhere when the debug escape hatch is on', () => {
		expect(
			shouldInitPostHog({
				hostname: 'localhost',
				token: TOKEN,
				forceEnable: true,
			})
		).toBe(true)
	})

	it('still requires a token when the debug escape hatch is on', () => {
		expect(
			shouldInitPostHog({
				hostname: 'localhost',
				token: undefined,
				forceEnable: true,
			})
		).toBe(false)
	})
})

describe('shouldCapturePostHogServer', () => {
	it('captures when the project URL is a production host', () => {
		for (const hostname of POSTHOG_ALLOWED_HOSTS) {
			expect(
				shouldCapturePostHogServer({
					projectUrl: `https://${hostname}`,
					token: TOKEN,
				})
			).toBe(true)
		}
	})

	it('does not capture locally or on preview deploys', () => {
		for (const projectUrl of [
			'http://localhost:3000',
			'https://www-preview.up.railway.app',
		]) {
			expect(shouldCapturePostHogServer({ projectUrl, token: TOKEN })).toBe(
				false
			)
		}
	})

	it('does not capture without a token or a project URL', () => {
		expect(
			shouldCapturePostHogServer({
				projectUrl: 'https://downbeatacademy.com',
				token: undefined,
			})
		).toBe(false)
		expect(
			shouldCapturePostHogServer({ projectUrl: undefined, token: TOKEN })
		).toBe(false)
	})

	it('does not throw on a malformed project URL', () => {
		expect(
			shouldCapturePostHogServer({ projectUrl: 'not a url', token: TOKEN })
		).toBe(false)
	})

	it('captures from anywhere with the debug escape hatch, given a token', () => {
		expect(
			shouldCapturePostHogServer({
				projectUrl: 'http://localhost:3000',
				token: TOKEN,
				forceEnable: true,
			})
		).toBe(true)
		expect(
			shouldCapturePostHogServer({
				projectUrl: 'http://localhost:3000',
				token: undefined,
				forceEnable: true,
			})
		).toBe(false)
	})
})
