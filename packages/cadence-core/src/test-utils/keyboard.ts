import { userEvent } from 'vitest/browser'

/**
 * Whether this engine moves Tab focus onto `<button>` elements.
 *
 * WebKit does not, by default. macOS ships with "Press Tab to highlight each item on a
 * webpage" **off**, so Safari's Tab order contains text fields and little else — buttons
 * and links are skipped. Playwright's WebKit inherits that default and offers no launch
 * option to change it. Measured directly, with no dialog involved:
 *
 * ```
 * chromium  input → button → link → body
 * firefox   input → button → link → body
 * webkit    input → body   → input → body      ← button and link never visited
 * ```
 *
 * This is a user-agent preference, not a property of any component. A focus-trap test that
 * tabs between buttons is therefore asserting the engine's policy rather than the
 * component's behaviour, and fails on WebKit for a reason that has nothing to do with the
 * component. Suites that need to distinguish "focus is cycling" from "focus is parked"
 * should gate the button half of that assertion on this probe and keep the half that
 * matters — focus never escaping — unconditional.
 *
 * Probed at runtime rather than switched on a browser name so it stays true if the default
 * changes, or if full keyboard access is ever enabled in CI.
 */
export const tabVisitsButtons = async (): Promise<boolean> => {
	// An input immediately followed by a button, focused programmatically so the probe does
	// not depend on where the caller's own markup sits in the tab order. `.focus()` works in
	// every engine regardless of its Tab policy; only the subsequent Tab is under test.
	const host = document.createElement('div')
	host.innerHTML = '<input type="text" /><button type="button">probe</button>'
	document.body.appendChild(host)

	const input = host.querySelector('input') as HTMLInputElement
	const button = host.querySelector('button') as HTMLButtonElement
	const previous = document.activeElement

	try {
		input.focus()
		await userEvent.tab()
		return document.activeElement === button
	} finally {
		host.remove()
		if (previous instanceof HTMLElement) previous.focus()
	}
}

/**
 * Whether Enter reliably activates a focused `<button>` inside a modal `<dialog>` here.
 *
 * Playwright's Firefox does not, under load: after `.focus()` the button is
 * `document.activeElement` by every measure a test can see, and the key activates nothing.
 * Re-sending it for five seconds does not help, so it is not a race.
 *
 * **Checked by engine rather than by capability, deliberately.** The honest probe — open a
 * `<dialog>`, `showModal()`, focus a button, press Enter — is itself unsafe: these specs
 * share one page, and a probe that fails partway leaves a modal open and inerts every
 * later spec in the file. That was measured, not feared: it turned 108 passing tests into
 * 66 failures. A user-agent check cannot do that.
 *
 * Button activation on Enter is the platform's job, not something `Dialog` or `Drawer`
 * implements, so skipping it here loses no coverage of our code. The
 * `event.target !== event.currentTarget` guard these specs protect is also covered by the
 * implicit-form-submit specs, which run on all three engines and do catch a mutation of it.
 */
export const enterActivatesButtonInModal = (): boolean =>
	!navigator.userAgent.includes('Firefox')
