import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from 'vitest/browser'
import { tabVisitsButtons } from '../../../test-utils/keyboard'
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
 * The modal-behaviour contract for `Dialog` — the half jsdom cannot host.
 *
 * `jsdom` does not implement `HTMLDialogElement`: `showModal` and `close` are `undefined`
 * on every installed version (26.1.0, 28.1.0, 29.1.1), and an unopened `<dialog>` is
 * `display: none` from its UA stylesheet. Focus trapping, `Escape`, the top layer and
 * background inerting are therefore unverifiable there, and stubbing `showModal` in a
 * setup file would assert against the stub — the `form/radio-card/` failure the 0.3 gate
 * exists to prevent.
 *
 * These tests landed in #317 against the **Radix** implementation, where all of it was
 * done in JavaScript. They are the reason this rewrite could be attempted at all.
 *
 * Two things about this file that are not incidental:
 *
 * 1. **`userEvent` comes from `vitest/browser`, not `@testing-library/user-event`.**
 *    Testing Library dispatches *untrusted* events, and an untrusted keydown does not
 *    drive the user agent's own `<dialog>` cancel/close behaviour. Built on those, the
 *    `Escape` test would pass against our React handler while proving nothing about the
 *    platform — green and meaningless.
 * 2. **The inerting test was rewritten, not relocated.** Radix marked siblings
 *    `aria-hidden="true"`, so #317 asserted `trigger.closest('[aria-hidden="true"]')`.
 *    A native modal dialog inerts through the top layer and sets **no attribute
 *    anywhere** — there is nothing to query. It is asserted as behaviour instead:
 *    `:modal` matches, the trigger cannot be clicked, and it cannot take focus.
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

const dialogEl = () => screen.getByRole('dialog') as HTMLDialogElement

/**
 * Wait for the open animation to finish.
 *
 * `.content` animates `translateY(25%) -> none` over 150ms, so any box measured before
 * that settles is offset from where the element actually lands. Anything deriving click
 * coordinates from `getBoundingClientRect()` has to wait first.
 */
const settle = (el: Element) =>
	Promise.all(el.getAnimations().map((animation) => animation.finished))

describe('Dialog modal behaviour', () => {
	/**
	 * The executable statement of why this project exists.
	 *
	 * Everything below would pass under jsdom against the old Radix implementation,
	 * because it was all JavaScript. Against this one it would pass for a worse reason:
	 * the component falls back to a non-modal `open` attribute where `showModal` is
	 * missing, so the markup would look right while none of the modality existed. The
	 * engine is load-bearing, and worth asserting rather than assuming.
	 *
	 * Running this file under the jsdom project is already a hard error — the
	 * `vitest/browser` import above throws *"can be imported only inside the Browser
	 * Mode"*. This is the belt to that braces.
	 */
	it('runs in an engine that actually implements HTMLDialogElement', () => {
		expect(typeof HTMLDialogElement.prototype.showModal).toBe('function')
		expect(typeof HTMLDialogElement.prototype.close).toBe('function')
	})

	it('enters the top layer as a modal, not merely an open dialog', async () => {
		// `<dialog open>` renders a non-modal dialog: no top layer, no backdrop, no
		// inerting. `:modal` is what separates the two, and it is the single most
		// important assertion in this file — every other guarantee follows from it.
		render(<Basic />)
		await userEvent.click(screen.getByRole('button', { name: 'Open' }))

		expect(dialogEl().matches(':modal')).toBe(true)
	})

	it('moves focus into the dialog when it opens', async () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Open' })

		await userEvent.click(trigger)

		expect(dialogEl().contains(document.activeElement)).toBe(true)
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

	it('stays open under Escape when a controlled owner ignores onOpenChange', async () => {
		// The `preventDefault()` on `cancel` is what makes this hold. Without it the user
		// agent closes the element itself, React never learns, and because `open` never
		// changed the effect never reopens it — the dialog would be gone while its owner
		// still believed it was showing.
		const onOpenChange = vi.fn()
		render(
			<Dialog open onOpenChange={onOpenChange}>
				<DialogContent>
					<DialogTitle>Pinned open</DialogTitle>
				</DialogContent>
			</Dialog>
		)

		await userEvent.keyboard('{Escape}')

		expect(onOpenChange).toHaveBeenCalledWith(false)
		expect(dialogEl().matches(':modal')).toBe(true)
	})

	it('returns focus to the trigger when it closes', async () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Open' })
		await userEvent.click(trigger)

		await userEvent.keyboard('{Escape}')

		await waitFor(() => expect(document.activeElement).toBe(trigger))
	})

	it('inerts the background', async () => {
		// Rewritten from #317's `aria-hidden` check — see the file header. A native modal
		// inerts through the top layer, which leaves no attribute to look for, so the
		// assertion has to be behavioural.
		render(
			<div>
				<button type="button">Background button</button>
				<Basic />
			</div>
		)
		const background = screen.getByRole('button', { name: 'Background button' })
		await userEvent.click(screen.getByRole('button', { name: 'Open' }))

		// Inert content cannot take focus.
		background.focus()
		expect(document.activeElement).not.toBe(background)

		// And it cannot be reached by a pointer: the backdrop covers it, so whatever is
		// at the button's own coordinates is not the button.
		//
		// Asserted through hit-testing rather than by calling `background.click()`, which
		// would prove nothing — a programmatic `.click()` dispatches straight at the
		// element and fires its handler no matter how inert it is. That version of this
		// test passed against a dialog that was not modal at all.
		const rect = background.getBoundingClientRect()
		const atPoint = document.elementFromPoint(
			rect.left + rect.width / 2,
			rect.top + rect.height / 2
		)
		expect(atPoint).not.toBe(background)
	})

	it('keeps Tab within the dialog', async () => {
		render(
			<div>
				<button type="button">Background button</button>
				<Basic />
			</div>
		)
		const background = screen.getByRole('button', { name: 'Background button' })
		const trigger = screen.getByRole('button', { name: 'Open' })
		await userEvent.click(trigger)
		const dialog = dialogEl()

		// Tab through more stops than the dialog contains, recording where focus lands.
		const visited: Element[] = []
		for (let i = 0; i < 8; i++) {
			await userEvent.tab()
			if (document.activeElement) visited.push(document.activeElement)
		}

		// The guarantee is that focus never reaches page content behind the modal.
		//
		// Asserting `dialog.contains(activeElement)` on every step instead would be
		// wrong, and was: tabbing past the last control in the top layer hands focus to
		// the browser's own UI before wrapping, which surfaces as `document.body` for two
		// steps. That is the user agent behaving correctly, not focus escaping — measured
		// in Chromium, where the cycle runs Cancel, Confirm, Close, body, body, Cancel.
		expect(visited).not.toContain(background)
		expect(visited).not.toContain(trigger)

		// And it really is cycling rather than parked: every control inside the dialog is
		// reached. Without this a dialog that dumped focus on `body` forever would pass.
		//
		// Gated, because this half asserts the *engine's* Tab policy rather than the
		// dialog's behaviour. WebKit skips buttons entirely unless macOS full keyboard
		// access is on, so there focus legitimately never lands on one — see
		// `tabVisitsButtons`. The escape guarantee above is the part that must hold
		// everywhere, and it does.
		if (await tabVisitsButtons()) {
			const controls = ['Cancel', 'Confirm', 'Close'].map((name) =>
				screen.getByRole('button', { name })
			)
			for (const control of controls) {
				expect(visited).toContain(control)
				expect(dialog.contains(control)).toBe(true)
			}
		} else {
			// The anti-vacuity guard still has to mean something on WebKit: focus moved into
			// the dialog on open and stayed in the top layer, rather than never having been
			// there at all.
			expect(dialog.matches(':modal')).toBe(true)
		}
	})

	it('locks background scroll while open', async () => {
		render(<Basic />)
		await userEvent.click(screen.getByRole('button', { name: 'Open' }))

		// `showModal()` inerts the document but does not stop it scrolling — that is the
		// `html:has(.content[open])` rule in dialog.module.css doing the work.
		expect(getComputedStyle(document.documentElement).overflow).toBe('hidden')
	})

	it('closes on a backdrop click but not on a click inside the dialog', async () => {
		render(<Basic />)
		await userEvent.click(screen.getByRole('button', { name: 'Open' }))
		const dialog = dialogEl()

		// The open animation translates the dialog, so a box measured while it is still
		// running is 30px away from where the element ends up — and every coordinate
		// derived from it lands somewhere unintended. This test read as passing for that
		// reason before the wait was added.
		await settle(dialog)
		const rect = dialog.getBoundingClientRect()

		// Inside the padding gutter. This targets the `<dialog>` element itself, because
		// padding belongs to the element rather than any child — which is exactly why
		// `event.target === dialog` cannot mean "clicked the backdrop", and why the
		// handler hit-tests against the box instead.
		await userEvent.click(dialog, {
			position: { x: Math.round(rect.width / 2), y: 4 },
		})
		expect(screen.queryByRole('dialog')).toBeInTheDocument()

		// Outside the box entirely — the backdrop. A backdrop click reports the
		// `<dialog>` as its target too, with coordinates beyond the box.
		await userEvent.click(document.body, { position: { x: 2, y: 2 } })
		await waitFor(() =>
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		)
	})

	it('survives StrictMode double-invoking the open effect', async () => {
		// React runs effects twice in development, and Next.js turns StrictMode on by
		// default — so this is the shape every local `pnpm www:dev` session runs in, not
		// an exotic one. `showModal()` throws `InvalidStateError` on an already-open
		// dialog, so without the `el.open` guards in the effect the second invocation
		// takes the component down.
		render(
			<React.StrictMode>
				<Dialog defaultOpen>
					<DialogContent>
						<DialogTitle>Strict</DialogTitle>
					</DialogContent>
				</Dialog>
			</React.StrictMode>
		)

		expect(dialogEl().matches(':modal')).toBe(true)
	})

	it('does not close when Enter implicitly submits a form inside it', async () => {
		// The shape `apps/www/src/app/(pages)/account/update-profile/` ships: a form in a
		// dialog. Implicit submission synthesises a click at (0, 0), which hit-tests as
		// outside the dialog — so without the `event.detail === 0` guard, pressing Enter
		// in a text field would dismiss the dialog instead of submitting.
		const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
		render(
			<Dialog defaultOpen>
				<DialogContent>
					<DialogTitle>Update profile</DialogTitle>
					<form onSubmit={onSubmit}>
						<input type="text" aria-label="Name" />
						<button type="submit">Save</button>
					</form>
				</DialogContent>
			</Dialog>
		)

		await userEvent.click(screen.getByRole('textbox', { name: 'Name' }))
		await userEvent.keyboard('{Enter}')

		expect(onSubmit).toHaveBeenCalled()
		expect(screen.queryByRole('dialog')).toBeInTheDocument()
	})

	it('does not close when a button inside is activated with the keyboard', async () => {
		// A keyboard-activated button synthesises a click at (0, 0), which hit-tests as
		// outside the dialog. Without the `event.detail === 0` guard every Enter press on
		// an inner control would dismiss the dialog.
		const onConfirm = vi.fn()
		render(
			<Dialog defaultOpen>
				<DialogContent>
					<DialogTitle>Confirm</DialogTitle>
					<button type="button" onClick={onConfirm}>
						Confirm
					</button>
				</DialogContent>
			</Dialog>
		)

		screen.getByRole('button', { name: 'Confirm' }).focus()
		await userEvent.keyboard('{Enter}')

		expect(onConfirm).toHaveBeenCalled()
		expect(screen.queryByRole('dialog')).toBeInTheDocument()
	})

	it('reopens cleanly after being closed', async () => {
		// `showModal()` throws `InvalidStateError` on an already-open dialog and `close()`
		// fires a spurious `close` event on a shut one, so the effect guards on `el.open`.
		// This is the test that fails if either guard is dropped.
		const Controlled = () => {
			const [open, setOpen] = useState(false)
			return (
				<>
					<button type="button" onClick={() => setOpen(true)}>
						Open
					</button>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent>
							<DialogTitle>Round trip</DialogTitle>
							<DialogClose>Cancel</DialogClose>
						</DialogContent>
					</Dialog>
				</>
			)
		}
		render(<Controlled />)

		for (let i = 0; i < 2; i++) {
			await userEvent.click(screen.getByRole('button', { name: 'Open' }))
			expect(dialogEl().matches(':modal')).toBe(true)

			await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
			await waitFor(() =>
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			)
		}
	})
})
