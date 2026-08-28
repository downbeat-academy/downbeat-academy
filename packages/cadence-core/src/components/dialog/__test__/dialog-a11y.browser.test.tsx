import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
import { axeViolations } from '../../../test-utils'

/**
 * Axe coverage for `Dialog`.
 *
 * **This file runs in the browser project, and has to.** Under jsdom a `<dialog>` that was
 * never opened is `display: none` from the UA stylesheet, and `showModal()` does not exist
 * there to open it — so axe would walk a hidden subtree, skip almost every rule, and
 * report a clean bill of health for a dialog it never really looked at. That is the
 * vacuous-green suite the 0.3 gate exists to prevent, arrived at from a new direction.
 *
 * **Every assertion passes `document.body`, never the `container` that `render()`
 * returns.** That was necessary under Radix because the content was portalled out of the
 * container; it is kept now because a modal dialog's relationship to the rest of the page
 * — inerting in particular — is only visible from the document root.
 *
 * `axeViolations` disables `color-contrast` and does not allow re-enabling it. Contrast on
 * the scrim and the close button is checked in the Storybook a11y addon panel instead.
 */

describe('Dialog accessibility', () => {
	it('has no axe violations with a title and description', async () => {
		render(
			<Dialog open>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ban user</DialogTitle>
						<DialogDescription>
							This revokes every active session for the account.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations with a title alone', async () => {
		render(
			<Dialog open>
				<DialogContent>
					<DialogTitle>Update profile</DialogTitle>
				</DialogContent>
			</Dialog>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations in the shipping admin-dialog shape', async () => {
		// Modelled on `apps/www/src/app/admin/users/_components/ban-user-dialog.tsx` —
		// controlled, with a footer of actions.
		render(
			<Dialog open onOpenChange={() => {}}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ban user</DialogTitle>
						<DialogDescription>
							Bans jory@example.com and revokes their sessions.
						</DialogDescription>
					</DialogHeader>
					<label htmlFor="reason">Reason</label>
					<input id="reason" name="reason" type="text" />
					<DialogFooter>
						<DialogClose>Cancel</DialogClose>
						<button type="button">Ban user</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations while closed', async () => {
		render(
			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<DialogTitle>Closed</DialogTitle>
				</DialogContent>
			</Dialog>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations after opening from the trigger', async () => {
		render(
			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Opened</DialogTitle>
						<DialogDescription>Opened from the trigger.</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		)

		await userEvent.click(screen.getByRole('button', { name: 'Open' }))

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('gives the built-in close button an accessible name', async () => {
		// The regression this suite caught. `DialogContent` renders its own close button
		// containing only `<X />`, and `cadence-icons`' X then set `role="img"` with
		// `aria-labelledby={titleId}` — undefined unless a title is passed, so React
		// omitted the attribute. That left the svg nameless under `svg-img-alt` and the
		// button nameless under `button-name`, on all six shipping consumer surfaces.
		// An untitled icon is now `aria-hidden` with no role, so the class of defect is
		// closed at its source; this button still needs its own name.
		//
		// Worse than it sounds: initial focus lands on this button, so opening any dialog
		// announced an unnamed button. `drawer-content.tsx` had the identical defect and
		// is fixed alongside.
		render(
			<Dialog open>
				<DialogContent>
					<DialogTitle>Named close</DialogTitle>
				</DialogContent>
			</Dialog>
		)

		expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
		expect(await axeViolations(document.body)).toEqual([])
	})
})
