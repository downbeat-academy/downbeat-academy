import { describe, expect, it, vi } from 'vitest'

import { applyPostHogConsent, resetPostHogIdentity } from '../consent'

type Explicit = 'granted' | 'denied' | 'pending'

/**
 * A stand-in for the PostHog methods involved, tracking explicit consent the
 * way posthog-js does: `opt_in_capturing` grants it, `opt_out_capturing`
 * denies it, `reset` clears it.
 */
function fakePostHog(initial: Explicit) {
	let explicit = initial
	const calls: string[] = []

	return {
		calls,
		get_explicit_consent_status: vi.fn(() => explicit),
		opt_in_capturing: vi.fn(() => {
			calls.push('opt_in_capturing')
			explicit = 'granted'
		}),
		opt_out_capturing: vi.fn(() => {
			calls.push('opt_out_capturing')
			explicit = 'denied'
		}),
		reset: vi.fn(() => {
			calls.push('reset')
			explicit = 'pending'
		}),
	}
}

describe('applyPostHogConsent', () => {
	it('opts in when the visitor accepts', () => {
		const client = fakePostHog('pending')

		applyPostHogConsent(client, 'granted')

		expect(client.opt_in_capturing).toHaveBeenCalledTimes(1)
		expect(client.reset).not.toHaveBeenCalled()
	})

	it('does not opt in again on every page load', () => {
		// opt_in_capturing sends a `$opt_in` event; repeating it would record one
		// per page view instead of one per decision.
		const client = fakePostHog('granted')

		applyPostHogConsent(client, 'granted')

		expect(client.opt_in_capturing).not.toHaveBeenCalled()
	})

	it.each(['pending', 'denied'] as const)(
		'leaves PostHog on its cookieless default when %s',
		(status) => {
			const client = fakePostHog('pending')

			applyPostHogConsent(client, status)

			expect(client.calls).toEqual([])
		}
	)

	it.each(['pending', 'denied'] as const)(
		'wipes a stale grant when the choice is now %s',
		(status) => {
			// Withdrawn from the banner, in another tab, or our cookie expired
			// while PostHog's own flag did not.
			const client = fakePostHog('granted')

			applyPostHogConsent(client, status)

			// reset() discards the identity but persists a fresh one; opting out
			// straight after clears it from the device. Verified in Chromium:
			// reset() alone leaves a new ph_ cookie until the next page load.
			expect(client.calls).toEqual(['reset', 'opt_out_capturing'])
		}
	)
})

describe('resetPostHogIdentity', () => {
	it('resets, then re-applies a grant — in that order', () => {
		// reset() clears PostHog's stored consent. Opting in first and resetting
		// after would silently drop a visitor who accepted back to cookieless.
		const client = fakePostHog('granted')

		resetPostHogIdentity(client, 'granted')

		expect(client.calls).toEqual(['reset', 'opt_in_capturing'])
	})

	it('does not record a fresh $opt_in on every sign-out', () => {
		const client = fakePostHog('granted')

		resetPostHogIdentity(client, 'granted')

		expect(client.opt_in_capturing).toHaveBeenCalledWith({
			captureEventName: false,
		})
	})

	it.each(['pending', 'denied'] as const)(
		'returns to cookieless after resetting when %s',
		(status) => {
			const client = fakePostHog('pending')

			resetPostHogIdentity(client, status)

			expect(client.calls).toEqual(['reset', 'opt_out_capturing'])
		}
	)
})
