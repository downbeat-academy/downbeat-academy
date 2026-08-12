import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
 * Axe coverage for the current Radix implementation, so the B.1 rewrite onto native
 * `<dialog>` has a baseline to hold.
 *
 * **Every assertion here passes `document.body`, never the `container` that `render()`
 * returns.** `DialogContent` portals itself out of that container, so `axeViolations(
 * container)` inspects a tree holding nothing but the trigger and reports zero violations
 * — on a dialog that in fact had two. That was measured, not assumed, and it is precisely
 * the vacuous-green suite task 0.3 exists to prevent.
 *
 * `axeViolations` disables `color-contrast` and does not allow re-enabling it — jsdom has
 * no layout engine, so that rule can only produce a false pass. Contrast on the overlay and
 * the close button is checked in the Storybook a11y addon panel instead.
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
		const user = userEvent.setup()
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

		await user.click(screen.getByRole('button', { name: 'Open' }))

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('gives the built-in close button an accessible name', async () => {
		// The regression this suite caught. `DialogContent` renders its own close button
		// containing only `<X />`, and `cadence-icons`' X sets `role="img"` with
		// `aria-labelledby={titleId}` — undefined unless a title is passed, so React
		// omits the attribute. That left the svg nameless under `svg-img-alt` and the
		// button nameless under `button-name`, on all six shipping consumer surfaces.
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
