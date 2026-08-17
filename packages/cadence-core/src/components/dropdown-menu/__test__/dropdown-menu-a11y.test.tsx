import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { axeViolations } from '../../../test-utils'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '../index'

/**
 * The previous a11y suite scoped `axeViolations` to the render container, which reported
 * zero on a menu with real violations — Radix portalled the content to `document.body`,
 * outside what was being scanned. The rebuild renders the menu inside the container, so
 * these scans actually reach it.
 */
const Menu = ({ open = false, disabled = false }) => (
	<DropdownMenu defaultOpen={open}>
		<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>Manage</DropdownMenuLabel>
			<DropdownMenuItem>Edit</DropdownMenuItem>
			<DropdownMenuItem disabled={disabled}>Duplicate</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Delete</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)

describe('DropdownMenu accessibility', () => {
	it('has no violations while closed', async () => {
		const { container } = render(<Menu />)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations while open', async () => {
		const { container } = render(<Menu open />)
		// The menu is genuinely inside `container` now, so this is a real scan rather than
		// a scan of an empty subtree.
		expect(container.querySelector('[role="menu"]')).not.toBeNull()
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with a disabled item', async () => {
		const { container } = render(<Menu open disabled />)
		expect(await axeViolations(container)).toEqual([])
	})

	it('gives the menu an accessible name from its trigger', () => {
		render(<Menu open />)
		const menu = screen.getByRole('menu')
		const trigger = screen.getByRole('button', { name: 'Actions' })
		expect(menu).toHaveAttribute('aria-labelledby', trigger.id)
		expect(document.getElementById(trigger.id)).toBe(trigger)
	})

	it('does not leave a dangling aria-controls when closed', () => {
		render(<Menu />)
		const trigger = screen.getByRole('button', { name: 'Actions' })
		expect(trigger).not.toHaveAttribute('aria-controls')

		fireEvent.click(trigger)
		const id = trigger.getAttribute('aria-controls')
		expect(id).toBeTruthy()
		expect(document.getElementById(id as string)).not.toBeNull()
	})

	it('declares its orientation for assistive technology', () => {
		render(<Menu open />)
		expect(screen.getByRole('menu')).toHaveAttribute(
			'aria-orientation',
			'vertical'
		)
	})
})
