import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from 'vitest/browser'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '../index'

/**
 * Placement and real-engine keyboard behaviour, which jsdom cannot host.
 *
 * As with `Tooltip` and `HoverCard`, placement is asserted as geometry rather than
 * mechanism, so one set of expectations covers both paths — CSS anchor positioning on
 * Chromium and Firefox, the JS fallback on WebKit.
 */

/** See the note on the same constant in `tooltip.browser.test.tsx`. */
const CLOSE_ENOUGH = 6

afterEach(() => {
	const active = document.activeElement
	if (active instanceof HTMLElement) active.blur()
})

const near = (actual: number, expected: number, label: string) => {
	expect(
		Math.abs(actual - expected),
		`${label}: expected ~${expected}, got ${actual}`
	).toBeLessThanOrEqual(CLOSE_ENOUGH)
}

const settled = async (el: Element) => {
	await Promise.all(el.getAnimations().map((a) => a.finished))
}

const Fixture = ({
	side,
	align,
}: {
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
}) => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh',
		}}
	>
		<DropdownMenu side={side} align={align}>
			<DropdownMenuTrigger style={{ width: 140, height: 36 }}>
				Actions
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Duplicate</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
)

const open = async () => {
	const trigger = screen.getByRole('button', { name: 'Actions' })
	await userEvent.click(trigger)
	const menu = await screen.findByRole('menu')
	await settled(menu)
	return {
		trigger: trigger.getBoundingClientRect(),
		menu: menu.getBoundingClientRect(),
		menuEl: menu,
		triggerEl: trigger,
	}
}

describe('DropdownMenu placement', () => {
	it('opens below the trigger, start-aligned, by default', async () => {
		render(<Fixture />)
		const { trigger, menu } = await open()
		near(menu.top, trigger.bottom + 4, 'gap below trigger')
		near(menu.left, trigger.left, 'start-aligned left edge')
	})

	it('opens above when asked', async () => {
		render(<Fixture side="top" />)
		const { trigger, menu } = await open()
		near(menu.bottom, trigger.top - 4, 'gap above trigger')
	})

	it('end-aligns to the trigger', async () => {
		render(<Fixture side="bottom" align="end" />)
		const { trigger, menu } = await open()
		near(menu.right, trigger.right, 'end-aligned right edge')
	})

	it('is on screen with real dimensions', async () => {
		render(<Fixture />)
		const { menu } = await open()
		expect(menu.width).toBeGreaterThan(0)
		expect(menu.height).toBeGreaterThan(0)
		expect(menu.top).toBeGreaterThanOrEqual(0)
		expect(menu.left).toBeGreaterThanOrEqual(0)
	})

	it('is promoted into the top layer', async () => {
		render(<Fixture />)
		const { menuEl } = await open()
		if (typeof (menuEl as HTMLElement).showPopover !== 'function') return
		await waitFor(() => expect(menuEl.matches(':popover-open')).toBe(true))
	})

	it('paints above a higher-stacked sibling', async () => {
		render(
			<>
				<div
					style={{
						position: 'fixed',
						inset: 0,
						zIndex: 100000,
						background: 'rgba(255,0,0,0.2)',
						pointerEvents: 'none',
					}}
				/>
				<Fixture />
			</>
		)
		const { menuEl } = await open()
		if (typeof (menuEl as HTMLElement).showPopover !== 'function') return

		// The cover claims z-index 100000, well above the stylesheet's, so being in the top
		// layer is the only way to paint above it. `:popover-open` is exactly that
		// membership.
		//
		// Asserted rather than hit-tested for the reason recorded in
		// `tooltip.browser.test.tsx`: `elementFromPoint` on a top-layer element proved
		// engine-dependent on Linux Firefox, and it was never the guarantee anyway.
		await waitFor(() => expect(menuEl.matches(':popover-open')).toBe(true))
	})
})

describe('DropdownMenu in a real engine', () => {
	it('opens by keyboard and focuses the first item', async () => {
		render(<Fixture />)
		const trigger = screen.getByRole('button', { name: 'Actions' })
		trigger.focus()
		await userEvent.keyboard('{ArrowDown}')

		const menu = await screen.findByRole('menu')
		expect(menu).toBeInTheDocument()
		expect(document.activeElement).toBe(
			screen.getByRole('menuitem', { name: 'Edit' })
		)
	})

	it('walks the items with the arrow keys', async () => {
		render(<Fixture />)
		screen.getByRole('button', { name: 'Actions' }).focus()
		await userEvent.keyboard('{ArrowDown}')
		await screen.findByRole('menu')

		await userEvent.keyboard('{ArrowDown}')
		expect(document.activeElement).toBe(
			screen.getByRole('menuitem', { name: 'Duplicate' })
		)
	})

	it('closes on Escape and returns focus to the trigger', async () => {
		render(<Fixture />)
		const trigger = screen.getByRole('button', { name: 'Actions' })
		trigger.focus()
		await userEvent.keyboard('{ArrowDown}')
		const menu = await screen.findByRole('menu')
		const id = menu.id

		await userEvent.keyboard('{Escape}')
		await waitFor(() => expect(document.getElementById(id)).toBeNull())
		expect(document.activeElement).toBe(trigger)
	})

	it('closes on an outside click', async () => {
		render(
			<>
				<button type="button" style={{ position: 'fixed', top: 0, left: 0 }}>
					Elsewhere
				</button>
				<Fixture />
			</>
		)
		const { menuEl } = await open()
		const id = menuEl.id

		await userEvent.click(screen.getByRole('button', { name: 'Elsewhere' }))
		await waitFor(() => expect(document.getElementById(id)).toBeNull())
	})

	it('selects an item with a real click and closes', async () => {
		render(<Fixture />)
		const { menuEl } = await open()
		const id = menuEl.id

		await userEvent.click(screen.getByRole('menuitem', { name: 'Duplicate' }))
		await waitFor(() => expect(document.getElementById(id)).toBeNull())
	})
})
