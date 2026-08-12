import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuShortcut,
} from '../index'
import { axeViolations } from '../../../test-utils'

/**
 * Axe coverage for `DropdownMenu`, which is a **deliberate Tier C retention** rather than a
 * migration target — see `docs/adr/0002-known-gaps.md`. These tests exist to stop a Radix
 * upgrade changing the component's semantics silently, not to prepare a rewrite.
 *
 * Two things about how this file is set up, both deliberate:
 *
 * 1. **Axe runs against `document.body`.** The menu portals out of the render container,
 *    and `axeViolations(container)` reported **zero violations on a menu with three** —
 *    measured. Same trap as `dialog` and `toast`.
 * 2. **The `region` rule is disabled, deliberately.** Radix portals the popper straight
 *    onto `document.body`, so it can never sit inside a landmark — not here and not in a
 *    real page, since the portal target is `body` either way and the component exposes no
 *    container prop. `region` is an axe best-practice rule about overall page structure,
 *    not about this component's semantics, and it fires on the popper wrapper rather than
 *    on anything `dropdown-menu` controls. Wrapping the trigger in a `<main>` does not
 *    silence it, which is how I confirmed the cause. Everything still renders inside a
 *    realistic page so the remaining structural rules stay meaningful.
 *
 *    Note this is why `dialog` and `toast` pass the same check without an override:
 *    `role="dialog"` and the toast viewport's explicit `role="region"` both satisfy the
 *    rule on their own, while `role="menu"` in a bare wrapper does not.
 *
 * `axeViolations` disables `color-contrast` permanently — jsdom has no layout engine, so
 * the rule can only false-pass. Item hover and disabled contrast are a Storybook a11y
 * panel job.
 */

/** The portalled popper cannot sit inside a landmark — see the note above. */
const PORTAL_RULES = { region: { enabled: false } }

const Page = ({ children }: { children: React.ReactNode }) => (
	<main>
		<h1>Settings</h1>
		{children}
	</main>
)

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
	await user.click(screen.getByRole('button', { name: 'Open menu' }))
	await screen.findByRole('menu')
}

describe('DropdownMenu accessibility', () => {
	it('has no axe violations while closed', async () => {
		render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Profile</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations with a plain item list', async () => {
		const user = userEvent.setup()
		render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem disabled>Billing</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)

		await openMenu(user)

		expect(await axeViolations(document.body, PORTAL_RULES)).toEqual([])
	})

	it('has no axe violations with labels, groups and separators', async () => {
		const user = userEvent.setup()
		render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								Profile
								<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>Sign out</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)

		await openMenu(user)

		expect(await axeViolations(document.body, PORTAL_RULES)).toEqual([])
	})

	it('has no axe violations with checkbox items', async () => {
		// The indicator icon is decorative — `aria-checked` already carries the state,
		// so a nameless `role="img"` inside the item is a violation, not a nicety.
		const user = userEvent.setup()
		render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem checked>
							Show hints
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={false}>
							Show grid
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)

		await openMenu(user)

		expect(await axeViolations(document.body, PORTAL_RULES)).toEqual([])
	})

	it('has no axe violations with radio items', async () => {
		const user = userEvent.setup()
		render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuRadioGroup value="light">
							<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)

		await openMenu(user)

		expect(await axeViolations(document.body, PORTAL_RULES)).toEqual([])
	})

	it('has no axe violations with a submenu trigger', async () => {
		const user = userEvent.setup()
		render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Nested action</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)

		await openMenu(user)

		expect(await axeViolations(document.body, PORTAL_RULES)).toEqual([])
	})

	it('has no axe violations with an open submenu', async () => {
		const user = userEvent.setup()
		render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Nested action</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)
		await openMenu(user)

		await user.keyboard('{ArrowDown}{ArrowDown}{ArrowRight}')
		await screen.findByRole('menuitem', { name: 'Nested action' })

		expect(await axeViolations(document.body, PORTAL_RULES)).toEqual([])
	})

	it('keeps every decorative indicator icon out of the accessibility tree', async () => {
		// The regression this suite caught. `Check`, `DotFilled` and `ChevronRight` all
		// render `role="img"` with no accessible name, because `cadence-icons` sets
		// `aria-labelledby={titleId}` and React drops it when no title is passed. Three
		// `svg-img-alt` violations in one menu — and the fourth, fifth and sixth
		// instances of the same root cause after `dialog`, `drawer` and `toast`.
		const user = userEvent.setup()
		const { baseElement } = render(
			<Page>
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem checked>Hints</DropdownMenuCheckboxItem>
						<DropdownMenuRadioGroup value="light">
							<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Nested</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>
			</Page>
		)

		await openMenu(user)

		const svgs = Array.from(baseElement.querySelectorAll('svg'))
		expect(svgs.length).toBeGreaterThanOrEqual(3)
		for (const svg of svgs) {
			expect(svg).toHaveAttribute('aria-hidden', 'true')
		}
		expect(await axeViolations(document.body, PORTAL_RULES)).toEqual([])
	})
})
