import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
} from '../index'
import s from '../dropdown-menu.module.css'

/**
 * `DropdownMenu`'s contract after C.4.
 *
 * **The API is deliberately narrower than it was.** Submenus, checkbox items, radio items,
 * `Group` and `Portal` were removed rather than rebuilt: nothing in the repo rendered any
 * of them, and they are where a menu's genuinely hard behaviour lives — safe-triangle
 * tracking between a submenu trigger and its content, and indicator state. The previous
 * suite covered all of it against Radix; those specs went with the exports.
 *
 * What is here covers what the package actually ships and what its two consumers use:
 * `admin/users/_components/user-actions-menu.tsx` and
 * `admin/subscribers/_components/subscriber-actions-menu.tsx`.
 */

const Basic = ({
	onSelect,
	disabled = false,
}: {
	onSelect?: () => void
	disabled?: boolean
}) => (
	<DropdownMenu>
		<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>Manage</DropdownMenuLabel>
			<DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
			<DropdownMenuItem disabled={disabled}>Duplicate</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Delete</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)

const openWithPointer = () =>
	fireEvent.click(screen.getByRole('button', { name: 'Actions' }))

const openWithKeyboard = () =>
	fireEvent.keyDown(screen.getByRole('button', { name: 'Actions' }), {
		key: 'ArrowDown',
	})

describe('DropdownMenu composition and roles', () => {
	it('renders a trigger and no menu until opened', () => {
		render(<Basic />)
		expect(screen.getByRole('button', { name: 'Actions' })).toBeInTheDocument()
		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
	})

	it('marks the trigger as owning a menu', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Actions' })
		expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
		expect(trigger).toHaveAttribute('aria-expanded', 'false')
		// Dangling references confuse screen readers, so this only exists while open.
		expect(trigger).not.toHaveAttribute('aria-controls')
	})

	it('wires trigger and menu together when open', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Actions' })
		openWithPointer()

		const menu = screen.getByRole('menu')
		expect(trigger).toHaveAttribute('aria-expanded', 'true')
		expect(trigger).toHaveAttribute('aria-controls', menu.id)
		expect(menu).toHaveAttribute('aria-labelledby', trigger.id)
	})

	it('renders items as menuitems and the separator as a separator', () => {
		render(<Basic />)
		openWithPointer()
		expect(screen.getAllByRole('menuitem')).toHaveLength(3)
		expect(screen.getByRole('separator')).toBeInTheDocument()
	})

	it('does not expose the label as a selectable item', () => {
		render(<Basic />)
		openWithPointer()
		// A group heading announced as a menu item is a heading the user tries to activate.
		expect(
			screen.queryByRole('menuitem', { name: 'Manage' })
		).not.toBeInTheDocument()
		expect(screen.getByText('Manage')).toBeInTheDocument()
	})

	it('is type=button so a menu inside a form never submits it', () => {
		render(<Basic />)
		expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute(
			'type',
			'button'
		)
	})
})

describe('DropdownMenu opening and closing', () => {
	it('toggles on trigger click', () => {
		render(<Basic />)
		openWithPointer()
		expect(screen.getByRole('menu')).toBeInTheDocument()
		openWithPointer()
		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
	})

	it.each(['ArrowDown', 'Enter', ' '])('opens on %s', (key) => {
		render(<Basic />)
		fireEvent.keyDown(screen.getByRole('button', { name: 'Actions' }), { key })
		expect(screen.getByRole('menu')).toBeInTheDocument()
	})

	it('focuses the first item when opened by keyboard', () => {
		render(<Basic />)
		openWithKeyboard()
		expect(document.activeElement).toBe(
			screen.getByRole('menuitem', { name: 'Edit' })
		)
	})

	it('does not move focus when opened by pointer', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Actions' })
		trigger.focus()
		openWithPointer()
		// APG distinguishes the two. Focusing an item on a mouse click puts a focus ring on
		// something the user did not ask for.
		expect(document.activeElement).toBe(trigger)
	})

	it('closes on Escape and returns focus to the trigger', () => {
		render(<Basic />)
		openWithKeyboard()
		fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })

		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
		// Without this a keyboard user is dropped at the top of the document every time
		// they dismiss a menu.
		expect(document.activeElement).toBe(
			screen.getByRole('button', { name: 'Actions' })
		)
	})

	it('closes on an outside press', () => {
		render(
			<>
				<Basic />
				<button type="button">Elsewhere</button>
			</>
		)
		openWithPointer()
		fireEvent.pointerDown(screen.getByRole('button', { name: 'Elsewhere' }))
		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
	})

	it('does not close on a press inside the menu', () => {
		render(<Basic />)
		openWithPointer()
		fireEvent.pointerDown(screen.getByRole('menu'))
		expect(screen.getByRole('menu')).toBeInTheDocument()
	})

	it('does not reopen when the outside press is the trigger itself', () => {
		render(<Basic />)
		openWithPointer()
		// The trigger toggles. If the outside handler also closed it, a click would close
		// and immediately reopen, and the menu would look stuck.
		const trigger = screen.getByRole('button', { name: 'Actions' })
		fireEvent.pointerDown(trigger)
		fireEvent.click(trigger)
		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
	})

	it('closes on Tab, letting focus continue past the trigger', () => {
		render(<Basic />)
		openWithKeyboard()
		fireEvent.keyDown(screen.getByRole('menu'), { key: 'Tab' })
		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
	})
})

describe('DropdownMenu keyboard navigation', () => {
	const items = () => screen.getAllByRole('menuitem')

	it('moves down and up with the arrow keys', () => {
		render(<Basic />)
		openWithKeyboard()
		const menu = screen.getByRole('menu')

		fireEvent.keyDown(menu, { key: 'ArrowDown' })
		expect(document.activeElement).toBe(items()[1])
		fireEvent.keyDown(menu, { key: 'ArrowUp' })
		expect(document.activeElement).toBe(items()[0])
	})

	it('wraps at both ends', () => {
		render(<Basic />)
		openWithKeyboard()
		const menu = screen.getByRole('menu')

		fireEvent.keyDown(menu, { key: 'ArrowUp' })
		expect(document.activeElement).toBe(items()[2])
		fireEvent.keyDown(menu, { key: 'ArrowDown' })
		expect(document.activeElement).toBe(items()[0])
	})

	it('jumps to first and last with Home and End', () => {
		render(<Basic />)
		openWithKeyboard()
		const menu = screen.getByRole('menu')

		fireEvent.keyDown(menu, { key: 'End' })
		expect(document.activeElement).toBe(items()[2])
		fireEvent.keyDown(menu, { key: 'Home' })
		expect(document.activeElement).toBe(items()[0])
	})

	it('keeps exactly one item in the tab order', () => {
		render(<Basic />)
		openWithKeyboard()
		const tabbable = items().filter((i) => i.tabIndex === 0)
		// Roving tabindex: one stop for the whole menu, arrows move within it.
		expect(tabbable).toHaveLength(1)

		fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' })
		expect(items().filter((i) => i.tabIndex === 0)).toHaveLength(1)
	})

	it('skips a disabled item when moving', () => {
		render(<Basic disabled />)
		openWithKeyboard()
		fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' })

		// "Duplicate" is disabled, so the move lands on "Delete".
		expect(document.activeElement).toBe(
			screen.getByRole('menuitem', { name: 'Delete' })
		)
	})

	it('leaves a disabled item in the menu for a screen reader to find', () => {
		render(<Basic disabled />)
		openWithPointer()
		const duplicate = screen.getByRole('menuitem', { name: 'Duplicate' })
		// `aria-disabled`, not removal: its existence should be discoverable.
		expect(duplicate).toHaveAttribute('aria-disabled', 'true')
	})
})

describe('DropdownMenu typeahead', () => {
	it('jumps to the item matching what was typed', () => {
		render(<Basic />)
		openWithKeyboard()
		fireEvent.keyDown(screen.getByRole('menu'), { key: 'd' })
		expect(document.activeElement).toBe(
			screen.getByRole('menuitem', { name: 'Duplicate' })
		)
	})

	it('cycles through items sharing a first letter', () => {
		render(<Basic />)
		openWithKeyboard()
		const menu = screen.getByRole('menu')

		fireEvent.keyDown(menu, { key: 'd' })
		expect(document.activeElement).toBe(
			screen.getByRole('menuitem', { name: 'Duplicate' })
		)
		// The search starts after the current item, so the same letter advances rather
		// than sticking.
		fireEvent.keyDown(menu, { key: 'd' })
		expect(document.activeElement).toBe(
			screen.getByRole('menuitem', { name: 'Delete' })
		)
	})

	it('ignores keys pressed with a modifier', () => {
		render(<Basic />)
		openWithKeyboard()
		const first = screen.getByRole('menuitem', { name: 'Edit' })
		fireEvent.keyDown(screen.getByRole('menu'), { key: 'd', metaKey: true })
		// A modifier means a shortcut, not a search.
		expect(document.activeElement).toBe(first)
	})
})

describe('DropdownMenuItem selection', () => {
	it('calls onSelect and closes on click', () => {
		const onSelect = vi.fn()
		render(<Basic onSelect={onSelect} />)
		openWithPointer()
		fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }))

		expect(onSelect).toHaveBeenCalledOnce()
		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
	})

	it.each(['Enter', ' '])('selects on %s', (key) => {
		const onSelect = vi.fn()
		render(<Basic onSelect={onSelect} />)
		openWithKeyboard()
		fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Edit' }), { key })
		expect(onSelect).toHaveBeenCalledOnce()
	})

	it('returns focus to the trigger after selecting', () => {
		render(<Basic />)
		openWithKeyboard()
		fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }))
		expect(document.activeElement).toBe(
			screen.getByRole('button', { name: 'Actions' })
		)
	})

	it('does nothing when the item is disabled', () => {
		const onSelect = vi.fn()
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem disabled onSelect={onSelect}>
						Edit
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
		openWithPointer()
		fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }))

		expect(onSelect).not.toHaveBeenCalled()
		expect(screen.getByRole('menu')).toBeInTheDocument()
	})
})

describe('DropdownMenu controlled state', () => {
	it('does not drift when the owner ignores onOpenChange', () => {
		const onOpenChange = vi.fn()
		render(
			<DropdownMenu open={false} onOpenChange={onOpenChange}>
				<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
		openWithPointer()

		expect(onOpenChange).toHaveBeenCalledWith(true)
		expect(screen.queryByRole('menu')).not.toBeInTheDocument()
	})

	it('follows an owner that honours onOpenChange', () => {
		const Controlled = () => {
			const [open, setOpen] = useState(false)
			return (
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
		render(<Controlled />)
		openWithPointer()
		expect(screen.getByRole('menu')).toBeInTheDocument()
	})
})

describe('DropdownMenu styling and passthrough', () => {
	it('publishes an anchor name shared by trigger and menu', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Actions' })
		openWithPointer()
		const menu = screen.getByRole('menu')

		const anchor = menu.style.getPropertyValue('--cds-dropdown-menu-anchor')
		expect(anchor).toMatch(/^--cds-dropdown-menu-[a-zA-Z0-9_-]+$/)
		expect(trigger.style.getPropertyValue('--cds-dropdown-menu-anchor')).toBe(
			anchor
		)
	})

	it('carries the side and align it will be positioned by', () => {
		render(
			<DropdownMenu side="right" align="end" defaultOpen>
				<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
		const menu = screen.getByRole('menu')
		expect(menu).toHaveAttribute('data-side', 'right')
		expect(menu).toHaveAttribute('data-align', 'end')
	})

	it('never renders the popover attribute from JSX', () => {
		render(<Basic />)
		openWithPointer()
		// jsdom parses `popover` without implementing the API, which would leave the menu
		// `display: none` for the whole jsdom project.
		expect(screen.getByRole('menu')).not.toHaveAttribute('popover')
	})

	it('appends custom classNames to every part', () => {
		render(
			<DropdownMenu defaultOpen>
				<DropdownMenuTrigger className="t">Actions</DropdownMenuTrigger>
				<DropdownMenuContent className="c">
					<DropdownMenuLabel className="l">Manage</DropdownMenuLabel>
					<DropdownMenuItem className="i">Edit</DropdownMenuItem>
					<DropdownMenuSeparator className="sep" />
					<DropdownMenuShortcut className="sc">⌘E</DropdownMenuShortcut>
				</DropdownMenuContent>
			</DropdownMenu>
		)

		expect(screen.getByRole('button', { name: 'Actions' })).toHaveClass('t')
		expect(screen.getByRole('menu')).toHaveClass('c', s.content)
		expect(screen.getByText('Manage')).toHaveClass('l', s.label)
		expect(screen.getByRole('menuitem')).toHaveClass('i', s.item)
		expect(screen.getByRole('separator')).toHaveClass('sep', s.separator)
		expect(screen.getByText('⌘E')).toHaveClass('sc', s.shortcut)
	})

	it('renders the consumer element with asChild', () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<a href="#actions">Actions</a>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
		const link = screen.getByRole('link', { name: 'Actions' })
		expect(link.tagName).toBe('A')
		expect(link).toHaveAttribute('aria-haspopup', 'menu')
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
	})
})

describe('Display names', () => {
	it('are set by hand, not inherited from a primitive', () => {
		expect(DropdownMenu.displayName).toBe('DropdownMenu')
		expect(DropdownMenuTrigger.displayName).toBe('DropdownMenuTrigger')
		expect(DropdownMenuContent.displayName).toBe('DropdownMenuContent')
		expect(DropdownMenuItem.displayName).toBe('DropdownMenuItem')
		expect(DropdownMenuLabel.displayName).toBe('DropdownMenuLabel')
		expect(DropdownMenuSeparator.displayName).toBe('DropdownMenuSeparator')
	})
})

describe('Usage errors', () => {
	it('names the offending component when used outside a DropdownMenu', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
		expect(() =>
			render(<DropdownMenuTrigger>Orphan</DropdownMenuTrigger>)
		).toThrow(
			/`DropdownMenuTrigger` must be rendered inside a `<DropdownMenu>`/
		)
		spy.mockRestore()
	})
})
