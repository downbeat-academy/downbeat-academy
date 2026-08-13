import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from 'vitest/browser'
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
	DrawerClose,
} from '../index'

/**
 * The modal-behaviour contract for `Drawer` — the half jsdom cannot host.
 *
 * Written against the **current Radix implementation**, which does all of this in
 * JavaScript, so B.2b's move onto the native `<dialog>` base has a contract to satisfy.
 *
 * **Every assertion here is deliberately behavioural**, and that is the whole design of
 * this file. The obvious way to pin Radix's inerting is
 * `trigger.closest('[aria-hidden="true"]')`, because that is the mechanism it uses — and
 * it is precisely what had to be thrown away and rewritten when `Dialog` migrated, since
 * a native modal inerts through the top layer and sets no attribute anywhere. Asserting
 * what the *user* can reach instead of how the library achieves it means these tests
 * survive the migration rather than being rewritten by the person it is meant to protect.
 *
 * `userEvent` comes from `vitest/browser`, not `@testing-library/user-event`: Testing
 * Library dispatches untrusted events, which do not drive user-agent behaviour. Under
 * Radix that distinction is invisible — after B.2b it is the difference between testing
 * the platform and testing our own keydown handler.
 */

const Basic = ({ side }: { side?: 'left' | 'right' }) => (
	<div>
		<button type="button">Background button</button>
		<Drawer>
			<DrawerTrigger>Open</DrawerTrigger>
			<DrawerContent side={side}>
				<DrawerHeader>
					<DrawerTitle>Changelog</DrawerTitle>
					<DrawerDescription>Recent updates.</DrawerDescription>
				</DrawerHeader>
				<DrawerBody>Body content</DrawerBody>
				<DrawerFooter>
					<DrawerClose>Cancel</DrawerClose>
					<button type="button">Confirm</button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	</div>
)

const openDrawer = () =>
	userEvent.click(screen.getByRole('button', { name: 'Open' }))

describe('Drawer modal behaviour', () => {
	it('moves focus into the drawer when it opens', async () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Open' })

		await openDrawer()

		const drawer = screen.getByRole('dialog')
		expect(drawer.contains(document.activeElement)).toBe(true)
		expect(document.activeElement).not.toBe(trigger)
	})

	it('closes on Escape', async () => {
		render(<Basic />)
		await openDrawer()

		await userEvent.keyboard('{Escape}')

		await waitFor(() =>
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		)
	})

	it('returns focus to the trigger when it closes', async () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Open' })
		await openDrawer()

		await userEvent.keyboard('{Escape}')

		await waitFor(() => expect(document.activeElement).toBe(trigger))
	})

	it('keeps content behind it out of reach', async () => {
		// Behavioural on purpose — see the file header. Radix marks siblings
		// `aria-hidden`; a native modal uses the top layer and marks nothing. Both
		// satisfy this.
		render(<Basic />)
		const background = screen.getByRole('button', { name: 'Background button' })
		await openDrawer()

		background.focus()
		expect(document.activeElement).not.toBe(background)

		const rect = background.getBoundingClientRect()
		const atPoint = document.elementFromPoint(
			rect.left + rect.width / 2,
			rect.top + rect.height / 2
		)
		expect(atPoint).not.toBe(background)
	})

	it('keeps Tab within the drawer', async () => {
		render(<Basic />)
		const background = screen.getByRole('button', { name: 'Background button' })
		const trigger = screen.getByRole('button', { name: 'Open' })
		await openDrawer()

		const visited: Element[] = []
		for (let i = 0; i < 8; i++) {
			await userEvent.tab()
			if (document.activeElement) visited.push(document.activeElement)
		}

		// The guarantee is that focus never reaches page content behind the modal.
		// Asserting containment on every step instead would be wrong: tabbing past the
		// last control hands focus to the browser's own UI for a step or two, which
		// surfaces as `document.body` and is the user agent behaving correctly.
		expect(visited).not.toContain(background)
		expect(visited).not.toContain(trigger)

		// And it is genuinely cycling rather than parked — without this, a drawer that
		// dumped focus on `body` forever would pass.
		for (const name of ['Cancel', 'Confirm', 'Close']) {
			expect(visited).toContain(screen.getByRole('button', { name }))
		}
	})

	it('closes on an overlay click but not on a click inside the drawer', async () => {
		render(<Basic />)
		await openDrawer()
		const drawer = screen.getByRole('dialog')

		// Settle the slide-in before measuring: the box moves 100% of its own width
		// during the animation, so coordinates taken too early point somewhere else
		// entirely.
		await Promise.all(drawer.getAnimations().map((a) => a.finished))
		const rect = drawer.getBoundingClientRect()

		// Inside the drawer's own box.
		await userEvent.click(drawer, {
			position: { x: Math.round(rect.width / 2), y: Math.round(rect.height / 2) },
		})
		expect(screen.queryByRole('dialog')).toBeInTheDocument()

		// Outside it — the overlay. The drawer is pinned to one edge, so the opposite
		// edge of the viewport is reliably clear of it.
		await userEvent.click(document.body, { position: { x: 2, y: 2 } })
		await waitFor(() =>
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		)
	})

	it('locks background scroll while open', async () => {
		// `showModal()` inerts the document but does not stop it scrolling — the
		// `html:has(.content[open])` rule in drawer.module.css is what does. Added after
		// a mutation check found that removing that rule broke nothing: `Dialog` had this
		// assertion and `Drawer` did not.
		render(<Basic />)
		await openDrawer()

		expect(getComputedStyle(document.documentElement).overflow).toBe('hidden')
	})

	it('renders on the side it was given', async () => {
		// The one layout assertion worth making in a real browser: `side` is the whole
		// reason `Drawer` exists separately from `Dialog`, and jsdom cannot compute it.
		// B.2b has to keep this true against the UA's `inset: 0; margin: auto`, which
		// centres a modal `<dialog>` unless the margins are overridden deliberately.
		render(<Basic side="left" />)
		await openDrawer()
		const drawer = screen.getByRole('dialog')
		await Promise.all(drawer.getAnimations().map((a) => a.finished))

		const rect = drawer.getBoundingClientRect()
		expect(rect.left).toBeLessThan(2)
		expect(rect.right).toBeLessThan(window.innerWidth)
	})

	it('renders on the right by default', async () => {
		render(<Basic />)
		await openDrawer()
		const drawer = screen.getByRole('dialog')
		await Promise.all(drawer.getAnimations().map((a) => a.finished))

		const rect = drawer.getBoundingClientRect()
		expect(rect.right).toBeGreaterThan(window.innerWidth - 2)
		expect(rect.left).toBeGreaterThan(0)
	})

	it('reopens cleanly after being closed', async () => {
		render(<Basic />)

		for (let i = 0; i < 2; i++) {
			await openDrawer()
			expect(screen.getByRole('dialog')).toBeInTheDocument()

			await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
			await waitFor(() =>
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			)
		}
	})

	it('does not close when a control inside is activated with the keyboard', async () => {
		const onConfirm = vi.fn()
		render(
			<Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
					<DrawerTitle>Confirm</DrawerTitle>
					<DrawerBody>
						<button type="button" onClick={onConfirm}>
							Confirm
						</button>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		)
		await openDrawer()

		screen.getByRole('button', { name: 'Confirm' }).focus()
		await userEvent.keyboard('{Enter}')

		expect(onConfirm).toHaveBeenCalled()
		expect(screen.queryByRole('dialog')).toBeInTheDocument()
	})
})
