import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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
import s from '../dropdown-menu.module.css'

/**
 * The regression contract for `DropdownMenu`.
 *
 * **This component is a deliberate Tier C retention, not a migration target.** ADR
 * `0002-known-gaps.md` records the decision: typeahead, submenu safe-triangle tracking,
 * roving focus, and collision-aware positioning are too much accessibility risk for a solo
 * maintainer to rebuild first. Task C.4 is a re-decision point, not a commitment.
 *
 * So these tests exist for a different reason than the other 0.3 slices. The component is
 * the most complex in the package and shipped completely untested; this pins what it does
 * today so a Radix upgrade cannot change it silently. The `displayName` regression that
 * arrived in 1.1.23 — and that this very component carried in five files until #312 — is
 * exactly the failure mode being guarded against.
 *
 * **The content portals to `document.body`.** `axeViolations(container)` reports zero on a
 * menu with three real violations; the a11y suite passes `document.body`. Queries here go
 * through `screen` for the same reason.
 */

const Menu = ({
	onSelect,
	...props
}: { onSelect?: () => void } & React.ComponentProps<typeof DropdownMenu>) => (
	<DropdownMenu {...props}>
		<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem onSelect={onSelect}>
					Profile
					<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>Billing</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
)

const open = async (user: ReturnType<typeof userEvent.setup>) => {
	await user.click(screen.getByRole('button', { name: 'Open menu' }))
	return screen.findByRole('menu')
}

describe('DropdownMenu', () => {
	describe('the trigger', () => {
		it('renders a button that advertises a menu', () => {
			render(<Menu />)
			const trigger = screen.getByRole('button', { name: 'Open menu' })

			expect(trigger).toHaveAttribute('type', 'button')
			expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
		})

		it('renders no menu until opened', () => {
			render(<Menu />)

			expect(screen.queryByRole('menu')).not.toBeInTheDocument()
		})

		it('flips aria-expanded and points aria-controls at the menu', async () => {
			const user = userEvent.setup()
			render(<Menu />)
			const trigger = screen.getByRole('button', { name: 'Open menu' })

			const menu = await open(user)

			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			expect(trigger.getAttribute('aria-controls')).toBe(menu.id)
		})

		it('names the menu from the trigger', async () => {
			const user = userEvent.setup()
			render(<Menu />)
			const trigger = screen.getByRole('button', { name: 'Open menu' })

			const menu = await open(user)

			expect(menu.getAttribute('aria-labelledby')).toBe(trigger.id)
		})
	})

	describe('menu structure', () => {
		it('exposes a vertical menu with its items', async () => {
			const user = userEvent.setup()
			render(<Menu />)

			const menu = await open(user)

			expect(menu).toHaveAttribute('aria-orientation', 'vertical')
			expect(screen.getAllByRole('menuitem')).toHaveLength(3)
		})

		it('portals the menu out of the render container', async () => {
			const user = userEvent.setup()
			const { container } = render(<Menu />)

			await open(user)

			expect(container.querySelector('[role="menu"]')).toBeNull()
			expect(document.body.querySelector('[role="menu"]')).not.toBeNull()
		})

		it('groups items and renders a separator', async () => {
			const user = userEvent.setup()
			render(<Menu />)

			await open(user)

			expect(screen.getAllByRole('group').length).toBeGreaterThanOrEqual(1)
			expect(screen.getByRole('separator')).toHaveAttribute(
				'aria-orientation',
				'horizontal'
			)
		})

		it('marks a disabled item as disabled', async () => {
			const user = userEvent.setup()
			render(<Menu />)

			await open(user)

			expect(screen.getByRole('menuitem', { name: 'Billing' })).toHaveAttribute(
				'aria-disabled',
				'true'
			)
		})

		it('renders a shortcut inside its item', async () => {
			const user = userEvent.setup()
			render(<Menu />)

			await open(user)

			const item = screen.getByRole('menuitem', { name: /Profile/ })
			expect(item.querySelector(`.${s.shortcut}`)).toHaveTextContent('⌘P')
		})
	})

	describe('keyboard operation', () => {
		it('opens from the trigger with Enter and focuses the first item', async () => {
			const user = userEvent.setup()
			render(<Menu />)
			screen.getByRole('button', { name: 'Open menu' }).focus()

			await user.keyboard('{Enter}')

			await screen.findByRole('menu')
			expect(document.activeElement).toHaveTextContent('Profile')
		})

		it('focuses the menu itself when opened by click, not the first item', async () => {
			// The two entry paths differ, which is easy to get wrong when writing these:
			// Enter on the trigger lands on the first item, a click lands on the menu
			// container and the first ArrowDown then moves to the first item.
			const user = userEvent.setup()
			render(<Menu />)

			const menu = await open(user)

			expect(document.activeElement).toBe(menu)
		})

		it('moves down the items with ArrowDown, skipping disabled ones', async () => {
			const user = userEvent.setup()
			render(<Menu />)
			await open(user)

			await user.keyboard('{ArrowDown}')
			expect(document.activeElement).toHaveTextContent('Profile')

			// Billing sits between Profile and Settings and is disabled.
			await user.keyboard('{ArrowDown}')
			expect(document.activeElement).toHaveTextContent('Settings')
		})

		it('moves back up with ArrowUp', async () => {
			const user = userEvent.setup()
			render(<Menu />)
			await open(user)

			await user.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}')

			expect(document.activeElement).toHaveTextContent('Profile')
		})

		it('supports typeahead', async () => {
			// One of the four behaviours the epic cites for keeping this on Radix.
			const user = userEvent.setup()
			render(<Menu />)
			await open(user)

			await user.keyboard('se')

			expect(document.activeElement).toHaveTextContent('Settings')
		})

		it('closes on Escape and returns focus to the trigger', async () => {
			const user = userEvent.setup()
			render(<Menu />)
			const trigger = screen.getByRole('button', { name: 'Open menu' })
			await open(user)

			await user.keyboard('{Escape}')

			await waitFor(() =>
				expect(screen.queryByRole('menu')).not.toBeInTheDocument()
			)
			expect(document.activeElement).toBe(trigger)
		})

		it('keeps items out of the tab order', async () => {
			// Menu items are reached with arrows, never Tab — roving focus, so every
			// item carries tabindex="-1".
			const user = userEvent.setup()
			render(<Menu />)
			await open(user)

			for (const item of screen.getAllByRole('menuitem')) {
				expect(item).toHaveAttribute('tabindex', '-1')
			}
		})
	})

	describe('selection', () => {
		it('fires onSelect and closes the menu', async () => {
			const user = userEvent.setup()
			const onSelect = vi.fn()
			render(<Menu onSelect={onSelect} />)
			await open(user)

			await user.click(screen.getByRole('menuitem', { name: /Profile/ }))

			expect(onSelect).toHaveBeenCalledOnce()
			await waitFor(() =>
				expect(screen.queryByRole('menu')).not.toBeInTheDocument()
			)
		})

		it('makes a disabled item inert to pointer interaction', async () => {
			// Asserted through the DOM rather than by clicking: `user.click()` on this
			// element throws outright, because Radix applies `pointer-events: none` and
			// user-event refuses interactions a real user could not perform. That throw
			// is itself the proof, but asserting it as a rejection would pass for any
			// error — checking the two hooks that cause it is the honest version.
			const user = userEvent.setup()
			render(<Menu />)
			await open(user)

			const disabled = screen.getByRole('menuitem', { name: 'Billing' })
			expect(disabled).toHaveAttribute('data-disabled')
			expect(getComputedStyle(disabled).pointerEvents).toBe('none')
		})

		it('never lets keyboard focus reach a disabled item', async () => {
			const user = userEvent.setup()
			const onSelect = vi.fn()
			render(<Menu onSelect={onSelect} />)
			await open(user)

			// Walk the whole menu; Billing must never take focus, so Enter can never
			// select it.
			for (let i = 0; i < 6; i++) {
				await user.keyboard('{ArrowDown}')
				expect(document.activeElement).not.toHaveTextContent('Billing')
			}
		})

		it('reports open state through onOpenChange', async () => {
			const user = userEvent.setup()
			const onOpenChange = vi.fn()
			render(<Menu onOpenChange={onOpenChange} />)

			await open(user)

			expect(onOpenChange).toHaveBeenCalledWith(true)
		})

		it('honours a controlled open prop', async () => {
			render(<Menu open onOpenChange={() => {}} />)

			expect(await screen.findByRole('menu')).toBeInTheDocument()
		})

		it('does not drift when a controlled owner ignores onOpenChange', async () => {
			const user = userEvent.setup()
			render(<Menu open onOpenChange={() => {}} />)
			await screen.findByRole('menu')

			await user.keyboard('{Escape}')

			expect(screen.getByRole('menu')).toBeInTheDocument()
		})
	})

	describe('checkbox items', () => {
		const WithCheckbox = ({ checked = true }: { checked?: boolean }) => (
			<DropdownMenu>
				<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuCheckboxItem checked={checked}>
						Show hints
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)

		it('exposes the checked state', async () => {
			const user = userEvent.setup()
			render(<WithCheckbox />)
			await open(user)

			expect(
				screen.getByRole('menuitemcheckbox', { name: 'Show hints' })
			).toHaveAttribute('aria-checked', 'true')
		})

		it('exposes the unchecked state and hides the indicator', async () => {
			const user = userEvent.setup()
			const { baseElement } = render(<WithCheckbox checked={false} />)
			await open(user)

			expect(
				screen.getByRole('menuitemcheckbox', { name: 'Show hints' })
			).toHaveAttribute('aria-checked', 'false')
			// The indicator wrapper stays for layout; its contents do not render.
			expect(baseElement.querySelector(`.${s.indicator}`)).toBeEmptyDOMElement()
		})

		it('reports changes through onCheckedChange', async () => {
			const user = userEvent.setup()
			const onCheckedChange = vi.fn()
			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem
							checked={false}
							onCheckedChange={onCheckedChange}
						>
							Show hints
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
			await open(user)

			await user.click(screen.getByRole('menuitemcheckbox'))

			expect(onCheckedChange).toHaveBeenCalledWith(true)
		})

		it('keeps its check icon out of the accessibility tree', async () => {
			// Decorative: the state is already carried by aria-checked, so the icon must
			// not add a nameless role="img" to the tree. Fixed alongside these tests.
			const user = userEvent.setup()
			const { baseElement } = render(<WithCheckbox />)
			await open(user)

			const svg = baseElement.querySelector(`.${s.indicator} svg`)
			expect(svg).not.toBeNull()
			expect(svg).toHaveAttribute('aria-hidden', 'true')
		})
	})

	describe('radio items', () => {
		const WithRadio = ({ value = 'light' }: { value?: string }) => (
			<DropdownMenu>
				<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuRadioGroup value={value}>
						<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)

		it('checks only the selected item', async () => {
			const user = userEvent.setup()
			render(<WithRadio />)
			await open(user)

			expect(screen.getByRole('menuitemradio', { name: 'Light' })).toHaveAttribute(
				'aria-checked',
				'true'
			)
			expect(screen.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute(
				'aria-checked',
				'false'
			)
		})

		it('follows a controlled value', async () => {
			const user = userEvent.setup()
			const Controlled = () => {
				const [value, setValue] = useState('light')
				return (
					<DropdownMenu>
						<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuRadioGroup value={value} onValueChange={setValue}>
								<DropdownMenuRadioItem value="light">
									Light
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			}
			render(<Controlled />)
			await open(user)

			await user.click(screen.getByRole('menuitemradio', { name: 'Dark' }))
			await open(user)

			expect(screen.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute(
				'aria-checked',
				'true'
			)
		})

		it('keeps its dot icon out of the accessibility tree', async () => {
			const user = userEvent.setup()
			const { baseElement } = render(<WithRadio />)
			await open(user)

			const svg = baseElement.querySelector(`.${s.indicator} svg`)
			expect(svg).not.toBeNull()
			expect(svg).toHaveAttribute('aria-hidden', 'true')
		})
	})

	describe('submenus', () => {
		const WithSub = () => (
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
		)

		it('renders the sub trigger as a menuitem advertising a submenu', async () => {
			const user = userEvent.setup()
			render(<WithSub />)
			await open(user)

			const sub = screen.getByRole('menuitem', { name: /More/ })
			expect(sub).toHaveAttribute('aria-haspopup', 'menu')
			expect(sub).toHaveAttribute('aria-expanded', 'false')
		})

		it('opens the submenu with ArrowRight', async () => {
			const user = userEvent.setup()
			render(<WithSub />)
			await open(user)

			// Click-open focuses the menu, so the first ArrowDown reaches Profile and
			// the second reaches the sub trigger.
			await user.keyboard('{ArrowDown}{ArrowDown}')
			expect(document.activeElement).toHaveTextContent('More')

			await user.keyboard('{ArrowRight}')

			expect(
				await screen.findByRole('menuitem', { name: 'Nested action' })
			).toBeInTheDocument()
		})

		it('keeps the sub trigger chevron out of the accessibility tree', async () => {
			const user = userEvent.setup()
			const { baseElement } = render(<WithSub />)
			await open(user)

			const svg = baseElement.querySelector(`.${s.subTriggerIcon} svg`)
			expect(svg).not.toBeNull()
			expect(svg).toHaveAttribute('aria-hidden', 'true')
		})
	})

	describe('styling hooks', () => {
		// Asserted against the imported CSS-module binding, never a literal.
		it('applies the content and item classes', async () => {
			const user = userEvent.setup()
			render(<Menu />)

			const menu = await open(user)

			expect(menu).toHaveClass(s.content)
			expect(screen.getByRole('menuitem', { name: /Profile/ })).toHaveClass(
				s.item
			)
		})

		it('applies the label and separator classes', async () => {
			const user = userEvent.setup()
			const { baseElement } = render(<Menu />)

			await open(user)

			expect(baseElement.querySelector(`.${s.label}`)).toHaveTextContent(
				'Account'
			)
			expect(screen.getByRole('separator')).toHaveClass(s.separator)
		})

		it('adds the inset modifier only when inset is set', async () => {
			const user = userEvent.setup()
			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem inset>Inset item</DropdownMenuItem>
						<DropdownMenuItem>Plain item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
			await open(user)

			expect(screen.getByRole('menuitem', { name: 'Inset item' })).toHaveClass(
				s.itemInset
			)
			expect(
				screen.getByRole('menuitem', { name: 'Plain item' })
			).not.toHaveClass(s.itemInset)
		})

		it('passes className through on content, item, label and separator', async () => {
			const user = userEvent.setup()
			const { baseElement } = render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
					<DropdownMenuContent className="content-class">
						<DropdownMenuLabel className="label-class">L</DropdownMenuLabel>
						<DropdownMenuSeparator className="separator-class" />
						<DropdownMenuItem className="item-class">Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)

			const menu = await open(user)

			expect(menu).toHaveClass('content-class')
			expect(menu).toHaveClass(s.content)
			expect(baseElement.querySelector('.label-class')).not.toBeNull()
			expect(screen.getByRole('separator')).toHaveClass('separator-class')
			expect(screen.getByRole('menuitem')).toHaveClass('item-class')
		})
	})

	describe('display names', () => {
		// Five of these assigned their displayName off the Radix primitive across two
		// lines, so they survived the first sweep in #312 and were still `undefined`
		// after 1.1.23 stopped setting them. Found while writing this suite. The six
		// bare aliases below are re-exported Radix components with no wrapper at all —
		// the epic records them as needing real implementations if this ever migrates —
		// so they legitimately have no displayName of ours to assert.
		it.each([
			[DropdownMenuContent, 'DropdownMenuContent'],
			[DropdownMenuItem, 'DropdownMenuItem'],
			[DropdownMenuCheckboxItem, 'DropdownMenuCheckboxItem'],
			[DropdownMenuRadioItem, 'DropdownMenuRadioItem'],
			[DropdownMenuLabel, 'DropdownMenuLabel'],
			[DropdownMenuSeparator, 'DropdownMenuSeparator'],
			[DropdownMenuSubTrigger, 'DropdownMenuSubTrigger'],
			[DropdownMenuSubContent, 'DropdownMenuSubContent'],
			[DropdownMenuShortcut, 'DropdownMenuShortcut'],
		] as const)('is set on %o', (Component, expected) => {
			expect((Component as { displayName?: string }).displayName).toBe(expected)
		})
	})
})
