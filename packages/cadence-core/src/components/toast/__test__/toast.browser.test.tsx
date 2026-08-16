import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from 'vitest/browser'
import {
	Toast,
	ToastProvider,
	ToastViewport,
	ToastTitle,
	ToastDescription,
	ToastClose,
} from '../index'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../../dialog'

/**
 * The half of `Toast` jsdom cannot host: auto-dismiss timing against a real clock, the
 * top layer, and pointer gestures.
 *
 * The top-layer spec is the one that matters most. B.1b fixed a defect where a toast
 * raised from inside a modal `<dialog>` painted *behind* the backdrop — three admin
 * dialogs call `toast()` on their failure path, which is exactly when the message needs
 * reading. That fix was a `popover="manual"` promotion plus a re-assert on
 * `cds-dialog-open`, and C.1 had to carry it across the rewrite intact.
 */

afterEach(() => {
	const active = document.activeElement
	if (active instanceof HTMLElement) active.blur()
})

const Fixture = ({
	duration,
	onOpenChange,
}: {
	duration?: number
	onOpenChange?: (open: boolean) => void
}) => {
	const [open, setOpen] = React.useState(true)
	return (
		<ToastProvider duration={duration}>
			<Toast
				open={open}
				onOpenChange={(next) => {
					setOpen(next)
					onOpenChange?.(next)
				}}
			>
				<ToastTitle>Saved</ToastTitle>
				<ToastDescription>Your profile was updated.</ToastDescription>
				<ToastClose />
			</Toast>
			<ToastViewport />
		</ToastProvider>
	)
}

describe('Toast auto-dismiss', () => {
	it('dismisses itself once its duration elapses', async () => {
		render(<Fixture duration={300} />)
		expect(screen.getByRole('listitem')).toBeInTheDocument()
		await waitFor(() =>
			expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
		)
	})

	it('does not dismiss while the pointer is over it', async () => {
		render(<Fixture duration={300} />)
		const item = screen.getByRole('listitem')
		await userEvent.hover(item)

		// The countdown is paused, not restarted — a toast that expires mid-read is the
		// defect this guards.
		await new Promise((r) => setTimeout(r, 700))
		expect(screen.getByRole('listitem')).toBeInTheDocument()
	})

	it('resumes the countdown when the pointer leaves', async () => {
		render(<Fixture duration={300} />)
		const item = screen.getByRole('listitem')
		await userEvent.hover(item)
		await new Promise((r) => setTimeout(r, 400))
		expect(screen.getByRole('listitem')).toBeInTheDocument()

		await userEvent.unhover(item)
		await waitFor(() =>
			expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
		)
	})

	it('does not dismiss while focus is inside it', async () => {
		render(<Fixture duration={300} />)
		screen.getByRole('button', { name: 'Close' }).focus()

		// Tabbing towards the close or action button must not race the timer.
		await new Promise((r) => setTimeout(r, 700))
		expect(screen.getByRole('listitem')).toBeInTheDocument()
	})

	it('stays open forever when duration is Infinity', async () => {
		render(<Fixture duration={Infinity} />)
		await new Promise((r) => setTimeout(r, 500))
		expect(screen.getByRole('listitem')).toBeInTheDocument()
	})
})

describe('Toast dismissal', () => {
	it('closes when the close button is pressed', async () => {
		render(<Fixture duration={Infinity} />)
		await userEvent.click(screen.getByRole('button', { name: 'Close' }))
		await waitFor(() =>
			expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
		)
	})
})

describe('Toast viewport', () => {
	it('is a list inside a labelled region', () => {
		render(<Fixture duration={Infinity} />)
		const region = screen.getByRole('region', { name: /notifications/i })
		const list = screen.getByRole('list')
		expect(region.contains(list)).toBe(true)
	})

	it('moves focus to the region on F8', async () => {
		render(<Fixture duration={Infinity} />)
		// The shortcut is named in the region's own accessible label, so it has to work —
		// a label promising a hotkey that does nothing is worse than no hotkey.
		await userEvent.keyboard('{F8}')
		const region = screen.getByRole('region', { name: /notifications/i })
		expect(document.activeElement).toBe(region)
	})

	it('is promoted into the top layer', () => {
		render(<Fixture duration={Infinity} />)
		const list = screen.getByRole('list')
		if (typeof (list as HTMLElement).showPopover !== 'function') return
		expect(list.matches(':popover-open')).toBe(true)
	})
})

describe('Toast and a modal dialog', () => {
	/**
	 * **This documents a live defect, not a passing contract. Read before changing it.**
	 *
	 * B.1b promoted the viewport to `popover="manual"` and made it re-assert itself on
	 * `cds-dialog-open`, on the reasoning that top-layer ordering follows insertion, so
	 * re-showing would lift it back above a dialog opened later. The intent was that a
	 * toast raised from inside a modal dialog stays readable — three admin dialogs call
	 * `toast()` on their failure path, which is exactly when it matters.
	 *
	 * **It does not work, and never did.** Measured directly against the raw platform,
	 * with no components involved, identically in Chromium, WebKit and Firefox:
	 *
	 * ```
	 * popover alone            → the popover is the topmost element
	 * after dlg.showModal()    → the DIALOG is topmost, popover still :popover-open
	 * after hide + showPopover → the DIALOG is still topmost
	 * ```
	 *
	 * A modal `<dialog>` renders above popovers regardless of insertion order: opening one
	 * makes everything outside it inert, and an inert top-layer element paints below the
	 * modal. Re-asserting cannot beat that.
	 *
	 * This was never verified by a test — C.1 is the first time anything checked it — so
	 * the epic and the changelog both record a fix that is not in effect. The promotion is
	 * kept because it does work against ordinary stacked content (proved above), and
	 * removing it would regress that. Recorded in `docs/adr/0002-known-gaps.md`.
	 */
	it('is still painted below a modal dialog — known gap, see the comment above', async () => {
		render(
			<ToastProvider duration={Infinity}>
				<Toast open>
					<ToastTitle>Could not save</ToastTitle>
				</Toast>
				<ToastViewport />
				<Dialog>
					<DialogTrigger>Open</DialogTrigger>
					<DialogContent>
						<DialogTitle>Ban user</DialogTitle>
					</DialogContent>
				</Dialog>
			</ToastProvider>
		)

		const list = screen.getByRole('list')
		if (typeof (list as HTMLElement).showPopover !== 'function') return

		await userEvent.click(screen.getByRole('button', { name: 'Open' }))
		await screen.findByRole('dialog')

		// The promotion itself survives the rewrite — the viewport is still a manual
		// popover and still open. That part of B.1b is intact and is what keeps toasts
		// above ordinary page content.
		expect(list.matches(':popover-open')).toBe(true)

		// What does not hold is the consequence B.1b wanted. Asserted as it actually
		// behaves, so this spec fails loudly if a future engine change fixes it — at which
		// point the known-gaps entry should go, not this expectation be quietly relaxed.
		const box = within(list).getByText('Could not save').getBoundingClientRect()
		const hit = document.elementFromPoint(
			box.left + box.width / 2,
			box.top + box.height / 2
		)
		expect(hit?.tagName).toBe('DIALOG')
	})
})
