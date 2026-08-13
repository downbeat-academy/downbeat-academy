import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
import { axeViolations } from '../../../test-utils'

/**
 * Axe coverage for `Drawer`.
 *
 * **In the browser project by choice, and it would have to move there anyway.** B.2b puts
 * `Drawer` on the native `<dialog>` base, and jsdom hides an unopened `<dialog>` through
 * its UA stylesheet while providing no `showModal()` to open it — so axe would walk a
 * hidden subtree, skip nearly every rule, and return a clean result for a drawer it never
 * really inspected. Writing it here now avoids relocating it mid-migration, and axe
 * against real layout and real computed styles is the better check regardless.
 *
 * **Every assertion passes `document.body`, never the `container` that `render()`
 * returns.** The Radix content is portalled out of that container, so `axeViolations(
 * container)` would inspect a tree holding nothing but the trigger. That is not
 * hypothetical — it reported zero violations on a `dialog` that had two, which is how the
 * rule was learned.
 *
 * `axeViolations` disables `color-contrast` permanently and does not allow re-enabling
 * it. Contrast on the scrim and the close button is checked in the Storybook a11y panel.
 */

const open = async () =>
	userEvent.click(screen.getByRole('button', { name: 'Open' }))

describe('Drawer accessibility', () => {
	it('has no axe violations with a title and description', async () => {
		render(
			<Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Changelog</DrawerTitle>
						<DrawerDescription>Recent updates.</DrawerDescription>
					</DrawerHeader>
					<DrawerBody>Body content</DrawerBody>
				</DrawerContent>
			</Drawer>
		)
		await open()

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations with a title only', async () => {
		// `aria-describedby` with no description is the shape that produced a dangling
		// IDREF in `dialog`. Axe does not flag it, which is exactly why this case is
		// covered by a behaviour test too rather than left to the a11y suite.
		render(
			<Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
					<DrawerTitle>Changelog</DrawerTitle>
				</DrawerContent>
			</Drawer>
		)
		await open()

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations on the left side', async () => {
		render(
			<Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent side="left">
					<DrawerTitle>Changelog</DrawerTitle>
					<DrawerBody>Body content</DrawerBody>
				</DrawerContent>
			</Drawer>
		)
		await open()

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations with interactive content and a footer', async () => {
		render(
			<Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Settings</DrawerTitle>
					</DrawerHeader>
					<DrawerBody>
						<label htmlFor="name">Name</label>
						<input id="name" type="text" />
						<a href="#somewhere">A link</a>
					</DrawerBody>
					<DrawerFooter>
						<DrawerClose>Cancel</DrawerClose>
						<button type="button">Save</button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		)
		await open()

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations while closed', async () => {
		render(
			<Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
					<DrawerTitle>Changelog</DrawerTitle>
				</DrawerContent>
			</Drawer>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})
})
