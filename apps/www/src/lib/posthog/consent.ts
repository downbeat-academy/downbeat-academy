import type { PostHog } from 'posthog-js'

import type { ConsentStatus } from '@lib/consent'

type ConsentClient = Pick<
	PostHog,
	'get_explicit_consent_status' | 'opt_in_capturing' | 'opt_out_capturing' | 'reset'
>

/**
 * Brings PostHog's consent state in line with the visitor's choice.
 *
 * PostHog is initialised with `cookieless_mode: 'on_reject'` and
 * `opt_out_capturing_by_default: true`, so "pending" and "denied" both capture
 * cookielessly — counted with a server-side hash, nothing stored on the device —
 * and only "granted" switches to cookies and a persistent identity.
 *
 * Safe to call repeatedly: it only acts when the two disagree.
 */
export function applyPostHogConsent(
	client: ConsentClient,
	status: ConsentStatus
): void {
	const current = client.get_explicit_consent_status()

	if (status === 'granted') {
		if (current !== 'granted') client.opt_in_capturing()
		return
	}

	// PostHog still holds a grant the visitor has since withdrawn — from the
	// banner, in another tab, or because our cookie expired. Discard the
	// identity, then return to cookieless.
	if (current === 'granted') resetToCookieless(client)
}

/**
 * `reset()` alone is not enough to withdraw: it discards the identity but
 * immediately persists a fresh one to a new cookie and localStorage, which
 * would sit on the device until the next page load. Opting out straight after
 * clears them and puts PostHog back on the cookieless hash. What remains is
 * PostHog's own opt-out flag in localStorage — a record of the refusal, which
 * is the kind of storage that needs no consent.
 */
function resetToCookieless(client: ConsentClient): void {
	client.reset()
	client.opt_out_capturing()
}

/**
 * `posthog.reset()` for sign-out. Reset also clears PostHog's stored consent,
 * which would silently drop a visitor who accepted back to cookieless, so the
 * choice is re-applied afterwards. PostHog requires that order: reset, then
 * opt in — never the reverse.
 */
export function resetPostHogIdentity(
	client: ConsentClient,
	status: ConsentStatus
): void {
	if (status !== 'granted') {
		resetToCookieless(client)
		return
	}

	client.reset()
	// A re-application, not a new decision, so no `$opt_in` event.
	client.opt_in_capturing({ captureEventName: false })
}
