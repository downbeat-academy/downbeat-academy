import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from '../index'
import s from '../dialog.module.css'

/**
 * The regression contract for `Dialog`, written against the **current Radix
 * implementation** so the B.1 rewrite onto native `<dialog>` + `showModal()` has something
 * to satisfy. Task 0.3 makes this a hard gate: no component is migrated before it has
 * tests, because `form/radio-card/` shipped inaccessible for want of exactly this.
 *
 * Two facts about this component drive how everything below is written, and both were
 * established by probing the real markup rather than assumed:
 *
 * 1. **The content is portalled to `document.body`.** It is *not* inside the container
 *    `render()` returns. Every query here goes through `screen`, and the a11y suite passes
 *    `document.body` to axe — passing `container` reports zero violations on a dialog that
 *    has two, which is the vacuous-test failure this suite exists to prevent.
 * 2. **Radix contributes a large attribute surface** — `aria-haspopup`, `aria-expanded`,
 *    `aria-controls`, and `data-state` on the trigger; `tabindex="-1"` and generated
 *    `aria-labelledby`/`aria-describedby` on the content. These are pinned below so B.1
 *    reproduces them deliberately rather than dropping them by accident.
 *
 * **Modal behaviour is not in this file.** Focus trapping, `Escape`, the top layer and
 * background inerting live in `dialog.browser.test.tsx`, which runs under
 * Playwright/Chromium, because jsdom does not implement `HTMLDialogElement` —
 * `showModal` and `close` are `undefined` on every installed version (26.1.0, 28.1.0,
 * 29.1.1). Those four are the browser's responsibility once B.1b moves onto native
 * `<dialog>`, and stubbing `showModal` in `setup-tests.ts` would assert against the
 * stub. What remains here is markup and wiring, which jsdom checks well and quickly.
 */

const Basic = ({ open }: { open?: boolean }) => (
	<Dialog open={open}>
		<DialogTrigger>Open</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Ban user</DialogTitle>
				<DialogDescription>This revokes their sessions.</DialogDescription>
			</DialogHeader>
			<p>Body copy</p>
			<DialogFooter>
				<DialogClose>Cancel</DialogClose>
				<button type="button">Confirm</button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
)

describe('Dialog', () => {
	describe('composition and roles', () => {
		it('renders nothing but the trigger while closed', () => {
			render(<Basic />)

			expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			expect(screen.queryByText('Body copy')).not.toBeInTheDocument()
		})

		it('exposes the content as role="dialog" when open', () => {
			render(<Basic open />)

			expect(screen.getByRole('dialog')).toBeInTheDocument()
			expect(screen.getByText('Body copy')).toBeInTheDocument()
		})

		it('names the dialog from DialogTitle', () => {
			render(<Basic open />)

			// The accessible name has to come from the title element, wired by id —
			// not from an aria-label the component invents.
			expect(screen.getByRole('dialog', { name: 'Ban user' })).toBeInTheDocument()

			const dialog = screen.getByRole('dialog')
			const titleId = dialog.getAttribute('aria-labelledby')
			expect(titleId).toBeTruthy()
			expect(document.getElementById(titleId as string)).toHaveTextContent(
				'Ban user'
			)
		})

		it('describes the dialog from DialogDescription', () => {
			render(<Basic open />)

			const dialog = screen.getByRole('dialog')
			const describedBy = dialog.getAttribute('aria-describedby')
			expect(describedBy).toBeTruthy()
			expect(document.getElementById(describedBy as string)).toHaveTextContent(
				'This revokes their sessions.'
			)
		})

		it('renders the title as a heading', () => {
			render(<Basic open />)

			expect(
				screen.getByRole('heading', { name: 'Ban user' })
			).toBeInTheDocument()
		})

		it('portals the content out of the render container', () => {
			// Pinned deliberately. B.1 replaces the portal with the top layer, and this
			// test is what tells the next reader the content was never a descendant of
			// the trigger's tree to begin with.
			const { container } = render(<Basic open />)

			expect(container.querySelector('[role="dialog"]')).toBeNull()
			expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
		})

		it('renders an overlay behind the content', () => {
			const { baseElement } = render(<Basic open />)

			expect(baseElement.querySelector(`.${s.overlay}`)).not.toBeNull()
		})
	})

	describe('the trigger', () => {
		it('carries the popup attributes a dialog trigger needs', () => {
			render(<Basic />)
			const trigger = screen.getByRole('button', { name: 'Open' })

			expect(trigger).toHaveAttribute('type', 'button')
			expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
		})

		it('omits aria-controls while closed', () => {
			// Changed in @radix-ui/react-dialog 1.1.23 (bumped in #310): the closed
			// trigger no longer carries `aria-controls`, because the element it named
			// does not exist until the dialog opens. That is the correct behaviour — a
			// dangling IDREF — so it is pinned rather than restored.
			render(<Basic />)

			expect(screen.getByRole('button', { name: 'Open' })).not.toHaveAttribute(
				'aria-controls'
			)
		})

		it('flips aria-expanded when the dialog opens', async () => {
			const user = userEvent.setup()
			render(<Basic />)
			const trigger = screen.getByRole('button', { name: 'Open' })

			await user.click(trigger)

			expect(trigger).toHaveAttribute('aria-expanded', 'true')
		})

		it('points aria-controls at the dialog that opens', async () => {
			const user = userEvent.setup()
			render(<Basic />)
			const trigger = screen.getByRole('button', { name: 'Open' })

			await user.click(trigger)

			expect(trigger.getAttribute('aria-controls')).toBe(
				screen.getByRole('dialog').id
			)
		})

		it('merges its props onto a custom element via asChild', async () => {
			// `apps/www/src/app/(pages)/account/update-profile/index.tsx` ships this
			// exact shape. `asChild` is a Radix prop, so B.1 must either reimplement it
			// on the in-house Slot from A.6 or migrate that consumer.
			const user = userEvent.setup()
			render(
				<Dialog>
					<DialogTrigger asChild>
						<button type="button" className="custom">
							Update profile
						</button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Update profile</DialogTitle>
					</DialogContent>
				</Dialog>
			)

			const trigger = screen.getByRole('button', { name: 'Update profile' })
			expect(trigger).toHaveClass('custom')
			expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')

			await user.click(trigger)
			expect(screen.getByRole('dialog')).toBeInTheDocument()
		})
	})

	describe('open state', () => {
		it('opens from the trigger when uncontrolled', async () => {
			const user = userEvent.setup()
			render(<Basic />)

			await user.click(screen.getByRole('button', { name: 'Open' }))

			expect(screen.getByRole('dialog')).toBeInTheDocument()
		})

		it('closes from DialogClose when uncontrolled', async () => {
			const user = userEvent.setup()
			render(<Basic />)
			await user.click(screen.getByRole('button', { name: 'Open' }))

			await user.click(screen.getByRole('button', { name: 'Cancel' }))

			await waitFor(() =>
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			)
		})

		it('honours a controlled open prop', () => {
			render(<Basic open />)

			expect(screen.getByRole('dialog')).toBeInTheDocument()
		})

		it('calls onOpenChange(false) when the user dismisses it', async () => {
			// The shape `admin/users/_components/ban-user-dialog.tsx` ships.
			const user = userEvent.setup()
			const onOpenChange = vi.fn()
			render(
				<Dialog open onOpenChange={onOpenChange}>
					<DialogContent>
						<DialogTitle>Ban user</DialogTitle>
						<DialogClose>Cancel</DialogClose>
					</DialogContent>
				</Dialog>
			)

			await user.click(screen.getByRole('button', { name: 'Cancel' }))

			expect(onOpenChange).toHaveBeenCalledWith(false)
		})

		it('does not drift when a controlled owner ignores onOpenChange', async () => {
			// A controlled dialog whose owner never updates `open` must stay open. If it
			// closes itself, it is holding internal state it should not have.
			const user = userEvent.setup()
			render(
				<Dialog open onOpenChange={() => {}}>
					<DialogContent>
						<DialogTitle>Pinned open</DialogTitle>
						<DialogClose>Cancel</DialogClose>
					</DialogContent>
				</Dialog>
			)

			await user.click(screen.getByRole('button', { name: 'Cancel' }))

			expect(screen.getByRole('dialog')).toBeInTheDocument()
		})

		it('follows a controlled owner that does update state', async () => {
			const user = userEvent.setup()
			const Controlled = () => {
				const [open, setOpen] = useState(true)
				return (
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent>
							<DialogTitle>Closable</DialogTitle>
							<DialogClose>Cancel</DialogClose>
						</DialogContent>
					</Dialog>
				)
			}
			render(<Controlled />)

			await user.click(screen.getByRole('button', { name: 'Cancel' }))

			await waitFor(() =>
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			)
		})
	})

	describe('styling hooks', () => {
		// Asserted against the imported CSS-module binding, never a literal — class names
		// are hashed by the `generateScopedName` function in vite.config.ts.
		it('applies the content class', () => {
			render(<Basic open />)
			expect(screen.getByRole('dialog')).toHaveClass(s.content)
		})

		it('applies the header, title, description and footer classes', () => {
			const { baseElement } = render(<Basic open />)

			expect(baseElement.querySelector(`.${s.header}`)).not.toBeNull()
			expect(screen.getByText('Ban user')).toHaveClass(s.title)
			expect(screen.getByText('This revokes their sessions.')).toHaveClass(
				s.description
			)
			expect(baseElement.querySelector(`.${s.footer}`)).not.toBeNull()
		})

		it.each([
			['DialogContent', DialogContent],
			['DialogOverlay', DialogOverlay],
			['DialogTitle', DialogTitle],
			['DialogDescription', DialogDescription],
			['DialogHeader', DialogHeader],
			['DialogFooter', DialogFooter],
		] as const)('appends a custom className on %s', (name, Part) => {
			const Component = Part as React.ElementType
			render(
				<Dialog open>
					<DialogPortal>
						<Component className="custom-class">
							{name === 'DialogOverlay' ? undefined : 'content'}
						</Component>
					</DialogPortal>
				</Dialog>
			)

			expect(document.body.querySelector('.custom-class')).not.toBeNull()
		})

		it('keeps the component class alongside a custom one', () => {
			render(
				<Dialog open>
					<DialogContent className="custom-class">
						<DialogTitle>T</DialogTitle>
					</DialogContent>
				</Dialog>
			)

			const dialog = screen.getByRole('dialog')
			expect(dialog).toHaveClass(s.content)
			expect(dialog).toHaveClass('custom-class')
		})

		it('passes className through on the trigger and close', async () => {
			const user = userEvent.setup()
			render(
				<Dialog>
					<DialogTrigger className="trigger-class">Open</DialogTrigger>
					<DialogContent>
						<DialogTitle>T</DialogTitle>
						<DialogClose className="close-class">Cancel</DialogClose>
					</DialogContent>
				</Dialog>
			)

			expect(screen.getByRole('button', { name: 'Open' })).toHaveClass(
				'trigger-class'
			)
			await user.click(screen.getByRole('button', { name: 'Open' }))
			expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass(
				'close-class'
			)
		})
	})

	describe('ref forwarding', () => {
		it('forwards a ref to the content element', () => {
			const ref = React.createRef<HTMLDivElement>()
			render(
				<Dialog open>
					<DialogContent ref={ref}>
						<DialogTitle>T</DialogTitle>
					</DialogContent>
				</Dialog>
			)

			expect(ref.current).toBeInstanceOf(HTMLElement)
			expect(ref.current).toBe(screen.getByRole('dialog'))
		})

		it('forwards a ref to the trigger element', () => {
			const ref = React.createRef<HTMLButtonElement>()
			render(
				<Dialog>
					<DialogTrigger ref={ref}>Open</DialogTrigger>
					<DialogContent>
						<DialogTitle>T</DialogTitle>
					</DialogContent>
				</Dialog>
			)

			expect(ref.current).toBe(screen.getByRole('button', { name: 'Open' }))
		})

		it('forwards a ref to the title, description and close', async () => {
			const user = userEvent.setup()
			const titleRef = React.createRef<HTMLHeadingElement>()
			const descRef = React.createRef<HTMLParagraphElement>()
			const closeRef = React.createRef<HTMLButtonElement>()
			render(
				<Dialog>
					<DialogTrigger>Open</DialogTrigger>
					<DialogContent>
						<DialogTitle ref={titleRef}>T</DialogTitle>
						<DialogDescription ref={descRef}>D</DialogDescription>
						<DialogClose ref={closeRef}>Cancel</DialogClose>
					</DialogContent>
				</Dialog>
			)
			await user.click(screen.getByRole('button', { name: 'Open' }))

			expect(titleRef.current).toHaveTextContent('T')
			expect(descRef.current).toHaveTextContent('D')
			expect(closeRef.current).toBe(
				screen.getByRole('button', { name: 'Cancel' })
			)
		})
	})

	describe('display names', () => {
		// Storybook's docgen keys its output off these, and until #310 six of them were
		// copied straight off the Radix primitive — `DialogPrimitive.Content.displayName`
		// and friends. @radix-ui/react-dialog 1.1.23 stopped setting them, so every one
		// silently became `undefined`. These tests caught it; all thirteen copied
		// displayNames across dialog, tooltip, hover-card and dropdown-menu are now
		// hand-set. B.1 must keep them at exactly these strings.
		it.each([
			[Dialog, 'Dialog'],
			[DialogTrigger, 'DialogTrigger'],
			[DialogContent, 'DialogContent'],
			[DialogOverlay, 'DialogOverlay'],
			[DialogTitle, 'DialogTitle'],
			[DialogDescription, 'DialogDescription'],
			[DialogClose, 'DialogClose'],
			[DialogHeader, 'DialogHeader'],
			[DialogFooter, 'DialogFooter'],
		] as const)('is set on %o', (Component, expected) => {
			expect((Component as { displayName?: string }).displayName).toBe(expected)
		})
	})

	describe('the built-in close button', () => {
		it('renders one close button inside the content', () => {
			render(<Basic open />)
			const { baseElement } = { baseElement: document.body }

			expect(baseElement.querySelectorAll(`.${s.close}`)).toHaveLength(1)
		})

		it('has an accessible name', () => {
			// Regression guard. This button shipped with no accessible name at all: it
			// contains only `<X />`, which renders `role="img"` with an undefined
			// `aria-labelledby`, so both the svg and the button were nameless. Fixed
			// alongside this suite — axe caught it in dialog-a11y.test.tsx.
			render(<Basic open />)

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
		})

		it('closes the dialog when clicked', async () => {
			const user = userEvent.setup()
			render(<Basic />)
			await user.click(screen.getByRole('button', { name: 'Open' }))

			await user.click(screen.getByRole('button', { name: 'Close' }))

			await waitFor(() =>
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			)
		})
	})

})
