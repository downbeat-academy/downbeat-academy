import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from 'vitest/browser'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from '../index'

/**
 * The modal-behaviour half of `Dialog`'s regression contract, split out of
 * `dialog.test.tsx` because jsdom cannot host it.
 *
 * `jsdom` does not implement `HTMLDialogElement`. `showModal` and `close` are `undefined`
 * on every installed version (26.1.0, 28.1.0, 29.1.1) and the element degrades to a plain
 * `HTMLElement`. Focus trapping, `Escape`, the top layer and background inerting are
 * therefore unverifiable there — and stubbing `showModal` in a setup file would assert
 * against the stub, which is exactly the `form/radio-card/` failure the 0.3 gate exists to
 * prevent.
 *
 * These five assertions currently pass because **Radix implements all of it in
 * JavaScript**. That is the point of landing them here first: they pin the behaviour
 * against the implementation being replaced, so B.1b's rewrite onto native `<dialog>` +
 * `showModal()` has a contract to satisfy rather than a promise to keep.
 *
 * Two things about this file that are not incidental:
 *
 * 1. **`userEvent` comes from `vitest/browser`, not `@testing-library/user-event`.**
 *    Testing Library dispatches *untrusted* synthetic events, and untrusted keydowns do
 *    not drive the user agent's own `<dialog>` cancel/close behaviour. Once B.1b lands,
 *    an Escape test built on untrusted events would pass against our React handler while
 *    proving nothing about the platform — green and meaningless. Keep these trusted.
 * 2. **The inerting assertion below is Radix-shaped and does not survive B.1b.** Radix
 *    marks siblings `aria-hidden="true"`; a native modal `<dialog>` inerts through the top
 *    layer and sets no attribute anywhere. B.1b must rewrite that test as behaviour
 *    (`:modal`, click-does-not-fire, focus-does-not-move), not relocate it.
 */

const Basic = ({ open }: { open?: boolean }) => (
	<Dialog open={open}>
		<DialogTrigger>Open</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Ban user</DialogTitle>
				<DialogDescription>This revokes their sessions.</DialogDescription>
			</DialogHeader>
			<p>Body copy</p>
			<DialogFooter>
				<DialogClose>Cancel</DialogClose>
				<button type="button">Confirm</button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
)

describe('Dialog modal behaviour', () => {
	/**
	 * The executable statement of why this project exists.
	 *
	 * Everything below would pass under jsdom too, because Radix implements all of it in
	 * JavaScript and needs no platform support — and would go on passing after B.1b
	 * replaces that JavaScript with the platform, right up until production. So the
	 * engine these specs run in is load-bearing, and worth asserting rather than
	 * assuming.
	 *
	 * Running this file under the jsdom project is already a hard error rather than a
	 * silent pass — the `vitest/browser` import above throws *"can be imported only
	 * inside the Browser Mode"* at import time (verified). This assertion is the
	 * belt to that braces, and states the requirement in the file that depends on it.
	 */
	it('runs in an engine that actually implements HTMLDialogElement', () => {
		expect(typeof HTMLDialogElement.prototype.showModal).toBe('function')
		expect(typeof HTMLDialogElement.prototype.close).toBe('function')
	})

	it('moves focus into the dialog when it opens', async () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Open' })

		await userEvent.click(trigger)

		const dialog = screen.getByRole('dialog')
		expect(dialog.contains(document.activeElement)).toBe(true)
		expect(document.activeElement).not.toBe(trigger)
	})

	it('closes on Escape', async () => {
		render(<Basic />)
		await userEvent.click(screen.getByRole('button', { name: 'Open' }))

		await userEvent.keyboard('{Escape}')

		await waitFor(() =>
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		)
	})

	it('returns focus to the trigger when it closes', async () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Open' })
		await userEvent.click(trigger)

		await userEvent.keyboard('{Escape}')

		await waitFor(() => expect(document.activeElement).toBe(trigger))
	})

	it('inerts the background from assistive technology', async () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Open' })

		await userEvent.click(trigger)

		// The trigger's own subtree is hidden from AT while the dialog is up, so the
		// dialog is the only thing a screen reader can reach.
		//
		// This is Radix's mechanism, not the platform's. B.1b replaces it — see the file
		// header.
		expect(trigger.closest('[aria-hidden="true"]')).not.toBeNull()
		expect(screen.getByRole('dialog').closest('[aria-hidden="true"]')).toBeNull()
	})

	it('keeps Tab within the dialog', async () => {
		render(<Basic />)
		await userEvent.click(screen.getByRole('button', { name: 'Open' }))
		const dialog = screen.getByRole('dialog')

		// Tab through more stops than the dialog contains; focus must never escape.
		for (let i = 0; i < 8; i++) {
			await userEvent.tab()
			expect(dialog.contains(document.activeElement)).toBe(true)
		}
	})
})
