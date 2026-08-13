import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
import s from '../drawer.module.css'
import { declaredSelectors } from '../../../test-utils'

/**
 * The regression contract for `Drawer`, written against the **current Radix
 * implementation** so the B.2b rewrite onto the native `<dialog>` base has something to
 * satisfy.
 *
 * This is task **B.2a**, and it exists because the 0.3 gate was never actually met here.
 * `Drawer` had a suite — three tests, 58 lines, `fireEvent`-based, every query a
 * `getByText` — which is why it was not on 0.3's list of "untested" components. It had no
 * `getByRole` query, no keyboard coverage and no a11y file, so it failed the epic's own
 * success criterion while looking like it passed. A thin suite is a worse signal than no
 * suite: `form/radio-card/` shipped inaccessible with tests on it.
 *
 * Two facts established by probing the real markup rather than assumed:
 *
 * 1. **The content is portalled to `document.body`**, so it is not inside the container
 *    `render()` returns. Every query here goes through `screen`, and the a11y suite passes
 *    `document.body` to axe — passing `container` inspects a tree holding only the
 *    trigger and reports zero violations however broken the drawer is.
 * 2. **Radix contributes a large attribute surface** — `aria-haspopup`, `aria-expanded`,
 *    `aria-controls` and `data-state` on the trigger; `tabindex="-1"` with generated
 *    `aria-labelledby`/`aria-describedby` on the content. Pinned so B.2b reproduces them
 *    deliberately rather than dropping them by accident.
 *
 * **Modal behaviour is not in this file** — focus trapping, `Escape`, focus return and
 * background inerting live in `drawer.browser.test.tsx`, because jsdom does not implement
 * `HTMLDialogElement` and B.2b moves onto it. Those tests are written behaviourally so
 * they hold for both implementations.
 */

const Basic = ({
	open,
	side,
	onOpenChange,
}: {
	open?: boolean
	side?: 'left' | 'right'
	onOpenChange?: (open: boolean) => void
}) => (
	<Drawer open={open} onOpenChange={onOpenChange}>
		<DrawerTrigger>Open</DrawerTrigger>
		<DrawerContent side={side}>
			<DrawerHeader>
				<DrawerTitle>Changelog</DrawerTitle>
				<DrawerDescription>Recent updates to this content.</DrawerDescription>
			</DrawerHeader>
			<DrawerBody>Body content</DrawerBody>
			<DrawerFooter>
				<DrawerClose>Cancel</DrawerClose>
				<button type="button">Confirm</button>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
)

describe('Drawer', () => {
	describe('composition and roles', () => {
		it('renders nothing but the trigger while closed', () => {
			render(<Basic />)

			expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			expect(screen.queryByText('Body content')).not.toBeInTheDocument()
		})

		it('exposes the content as role="dialog" when open', () => {
			render(<Basic open />)

			expect(screen.getByRole('dialog')).toBeInTheDocument()
			expect(screen.getByText('Body content')).toBeInTheDocument()
		})

		it('names the drawer from DrawerTitle', () => {
			render(<Basic open />)

			// The accessible name must come from the title element wired by id, not from
			// an aria-label the component invents.
			expect(screen.getByRole('dialog', { name: 'Changelog' })).toBeInTheDocument()

			const labelledBy = screen.getByRole('dialog').getAttribute('aria-labelledby')
			expect(labelledBy).toBeTruthy()
			expect(document.getElementById(labelledBy as string)).toHaveTextContent(
				'Changelog'
			)
		})

		it('describes the drawer from DrawerDescription', () => {
			render(<Basic open />)

			const describedBy = screen
				.getByRole('dialog')
				.getAttribute('aria-describedby')
			expect(describedBy).toBeTruthy()
			expect(document.getElementById(describedBy as string)).toHaveTextContent(
				'Recent updates to this content.'
			)
		})

		it('renders the title as a heading', () => {
			render(<Basic open />)

			expect(
				screen.getByRole('heading', { name: 'Changelog' })
			).toBeInTheDocument()
		})

		it('makes the content programmatically focusable', () => {
			render(<Basic open />)

			expect(screen.getByRole('dialog')).toHaveAttribute('tabindex', '-1')
		})

		it('renders the content in place rather than portalling it', () => {
			// The inverse of what Radix did, and deliberate. A portal existed to escape
			// ancestor stacking and overflow; the top layer does that without moving the
			// element, so the `<dialog>` is an ordinary descendant of wherever it was
			// written.
			const { container } = render(<Basic open />)

			expect(container.querySelector('dialog')).not.toBeNull()
		})

		it('paints the scrim with ::backdrop instead of an overlay element', () => {
			// `.overlay` is gone — `::backdrop` already is a full-viewport box painted
			// beneath the drawer, so the element that faked one has no job left.
			const selectors = declaredSelectors(s.content)

			expect(selectors.some((sel) => sel.includes('::backdrop'))).toBe(true)
		})

		it('omits aria-describedby when there is no DrawerDescription', () => {
			// Radix emitted it unconditionally, leaving a dangling IDREF on any drawer
			// without a description. Axe does not flag that; it is still wrong.
			render(
				<Drawer open>
					<DrawerContent>
						<DrawerTitle>No description here</DrawerTitle>
					</DrawerContent>
				</Drawer>
			)

			const drawer = screen.getByRole('dialog')
			expect(drawer).not.toHaveAttribute('aria-describedby')
			expect(drawer).toHaveAttribute('aria-labelledby')
		})
	})

	describe('the side prop', () => {
		it('defaults to the right', () => {
			render(<Basic open />)

			expect(screen.getByRole('dialog')).toHaveClass(s.contentRight)
			expect(screen.getByRole('dialog')).not.toHaveClass(s.contentLeft)
		})

		it('honours side="left"', () => {
			render(<Basic open side="left" />)

			expect(screen.getByRole('dialog')).toHaveClass(s.contentLeft)
			expect(screen.getByRole('dialog')).not.toHaveClass(s.contentRight)
		})

		it('keeps the base content class either way', () => {
			const { unmount } = render(<Basic open side="left" />)
			expect(screen.getByRole('dialog')).toHaveClass(s.content)
			unmount()

			render(<Basic open side="right" />)
			expect(screen.getByRole('dialog')).toHaveClass(s.content)
		})

		it('positions each side from the stylesheet rather than inline styles', () => {
			// The side is a CSS concern. If B.2b moves the offsets inline, this is the
			// test that says so — under the native `<dialog>` base the UA centres the
			// element with `inset: 0; margin: auto`, so pinning to an edge needs a
			// deliberate override rather than the `right: 0` that works today.
			render(<Basic open side="left" />)

			expect(screen.getByRole('dialog').style.left).toBe('')
			expect(screen.getByRole('dialog')).toHaveClass(s.contentLeft)
		})
	})

	describe('the trigger', () => {
		it('carries the popup attributes a drawer trigger needs', () => {
			render(<Basic />)
			const trigger = screen.getByRole('button', { name: 'Open' })

			expect(trigger).toHaveAttribute('type', 'button')
			expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
		})

		it('omits aria-controls while closed', () => {
			// @radix-ui/react-dialog 1.1.23 stopped emitting it while closed, because the
			// element it named does not exist yet. That is correct — a dangling IDREF —
			// so it is pinned rather than restored.
			render(<Basic />)

			expect(screen.getByRole('button', { name: 'Open' })).not.toHaveAttribute(
				'aria-controls'
			)
		})

		it('points aria-controls at the drawer that opens', async () => {
			const user = userEvent.setup()
			render(<Basic />)
			const trigger = screen.getByRole('button', { name: 'Open' })

			await user.click(trigger)

			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			expect(trigger.getAttribute('aria-controls')).toBe(
				screen.getByRole('dialog').id
			)
		})

		it('merges its props onto a custom element via asChild', async () => {
			// `apps/www/src/components/changelog/changelog-drawer.tsx` ships this exact
			// shape, wrapping a Cadence Button. B.2b must reimplement `asChild` on the
			// in-house Slot rather than let it disappear.
			const user = userEvent.setup()
			render(
				<Drawer>
					<DrawerTrigger asChild>
						<button type="button" className="custom">
							View changelog
						</button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerTitle>Changelog</DrawerTitle>
					</DrawerContent>
				</Drawer>
			)

			const trigger = screen.getByRole('button', { name: 'View changelog' })
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

		it('closes from DrawerClose when uncontrolled', async () => {
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

		it('reports dismissal through onOpenChange', async () => {
			const user = userEvent.setup()
			const onOpenChange = vi.fn()
			render(<Basic open onOpenChange={onOpenChange} />)

			await user.click(screen.getByRole('button', { name: 'Cancel' }))

			expect(onOpenChange).toHaveBeenCalledWith(false)
		})

		it('does not drift when a controlled owner ignores onOpenChange', async () => {
			// A controlled drawer whose owner never updates `open` must stay open. If it
			// closes itself it is holding state it should not have.
			const user = userEvent.setup()
			render(<Basic open onOpenChange={() => {}} />)

			await user.click(screen.getByRole('button', { name: 'Cancel' }))

			expect(screen.getByRole('dialog')).toBeInTheDocument()
		})

		it('follows a controlled owner that does update state', async () => {
			const user = userEvent.setup()
			const Controlled = () => {
				const [open, setOpen] = useState(true)
				return (
					<Drawer open={open} onOpenChange={setOpen}>
						<DrawerContent>
							<DrawerTitle>Closable</DrawerTitle>
							<DrawerClose>Cancel</DrawerClose>
						</DrawerContent>
					</Drawer>
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
		// are hashed by `generateScopedName` in vite.config.ts.
		it('applies the part classes', () => {
			const { baseElement } = render(<Basic open />)

			expect(screen.getByRole('dialog')).toHaveClass(s.content)
			expect(baseElement.querySelector(`.${s.header}`)).not.toBeNull()
			expect(screen.getByText('Changelog')).toHaveClass(s.title)
			expect(screen.getByText('Recent updates to this content.')).toHaveClass(
				s.description
			)
			expect(screen.getByText('Body content')).toHaveClass(s.body)
			expect(baseElement.querySelector(`.${s.footer}`)).not.toBeNull()
		})

		it.each([
			['DrawerTitle', DrawerTitle],
			['DrawerDescription', DrawerDescription],
			['DrawerHeader', DrawerHeader],
			['DrawerBody', DrawerBody],
			['DrawerFooter', DrawerFooter],
		] as const)('appends a custom className on %s', (name, Part) => {
			const Component = Part as React.ElementType
			render(
				<Drawer open>
					<DrawerContent>
						<Component className="custom-class">content</Component>
					</DrawerContent>
				</Drawer>
			)

			expect(document.body.querySelector('.custom-class')).not.toBeNull()
		})

		it('keeps the component class alongside a custom one', () => {
			render(
				<Drawer open>
					<DrawerContent className="custom-class">
						<DrawerTitle>T</DrawerTitle>
					</DrawerContent>
				</Drawer>
			)

			const drawer = screen.getByRole('dialog')
			expect(drawer).toHaveClass(s.content)
			expect(drawer).toHaveClass('custom-class')
		})

		it('passes className through on the trigger and close', async () => {
			const user = userEvent.setup()
			render(
				<Drawer>
					<DrawerTrigger className="trigger-class">Open</DrawerTrigger>
					<DrawerContent>
						<DrawerTitle>T</DrawerTitle>
						<DrawerClose className="close-class">Cancel</DrawerClose>
					</DrawerContent>
				</Drawer>
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
				<Drawer open>
					<DrawerContent ref={ref}>
						<DrawerTitle>T</DrawerTitle>
					</DrawerContent>
				</Drawer>
			)

			expect(ref.current).toBeInstanceOf(HTMLElement)
			expect(ref.current).toBe(screen.getByRole('dialog'))
		})

		it('forwards a ref to the trigger element', () => {
			const ref = React.createRef<HTMLButtonElement>()
			render(
				<Drawer>
					<DrawerTrigger ref={ref}>Open</DrawerTrigger>
					<DrawerContent>
						<DrawerTitle>T</DrawerTitle>
					</DrawerContent>
				</Drawer>
			)

			expect(ref.current).toBe(screen.getByRole('button', { name: 'Open' }))
		})

		it('forwards a ref to the title, description and close', async () => {
			const user = userEvent.setup()
			const titleRef = React.createRef<HTMLHeadingElement>()
			const descRef = React.createRef<HTMLParagraphElement>()
			const closeRef = React.createRef<HTMLButtonElement>()
			render(
				<Drawer>
					<DrawerTrigger>Open</DrawerTrigger>
					<DrawerContent>
						<DrawerTitle ref={titleRef}>T</DrawerTitle>
						<DrawerDescription ref={descRef}>D</DrawerDescription>
						<DrawerClose ref={closeRef}>Cancel</DrawerClose>
					</DrawerContent>
				</Drawer>
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
		// Storybook's docgen keys its output off these. Radix ≥1.1.23 stopped setting
		// `displayName` on its primitives, which silently emptied every one that had been
		// copied off a primitive rather than hand-set. Assert the strings; never inherit
		// them. B.2b must keep them exactly.
		it.each([
			[Drawer, 'Drawer'],
			[DrawerTrigger, 'DrawerTrigger'],
			[DrawerContent, 'DrawerContent'],
			[DrawerTitle, 'DrawerTitle'],
			[DrawerDescription, 'DrawerDescription'],
			[DrawerClose, 'DrawerClose'],
			[DrawerHeader, 'DrawerHeader'],
			[DrawerBody, 'DrawerBody'],
			[DrawerFooter, 'DrawerFooter'],
		] as const)('is set on %o', (Component, expected) => {
			expect((Component as { displayName?: string }).displayName).toBe(expected)
		})
	})

	describe('the built-in close button', () => {
		it('renders exactly one close button inside the content', () => {
			render(<Basic open />)

			expect(document.body.querySelectorAll(`.${s.close}`)).toHaveLength(1)
		})

		it('has an accessible name', () => {
			// Regression guard. The equivalent button in `dialog` and `toast` shipped with
			// no accessible name at all: it contains only `<X />`, which renders
			// `role="img"` with no label, leaving both the svg and the button nameless.
			render(<Basic open />)

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
		})

		it('hides its icon from assistive technology', () => {
			render(<Basic open />)

			const icon = screen
				.getByRole('button', { name: 'Close' })
				.querySelector('svg')
			expect(icon).toHaveAttribute('aria-hidden', 'true')
		})

		it('closes the drawer when clicked', async () => {
			const user = userEvent.setup()
			render(<Basic />)
			await user.click(screen.getByRole('button', { name: 'Open' }))

			await user.click(screen.getByRole('button', { name: 'Close' }))

			await waitFor(() =>
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			)
		})
	})

	describe('the shipping consumer shape', () => {
		it('drives the changelog drawer the way apps/www does', async () => {
			// `apps/www/src/components/changelog/changelog-drawer.tsx`: an `asChild`
			// trigger wrapping a Button, `side="right"`, and a scrollable body between a
			// header and no footer. It is the only consumer.
			const user = userEvent.setup()
			render(
				<Drawer>
					<DrawerTrigger asChild>
						<button type="button">Updated Aug 13, 2026</button>
					</DrawerTrigger>
					<DrawerContent side="right">
						<DrawerHeader>
							<DrawerTitle>Changelog</DrawerTitle>
							<DrawerDescription>
								A history of meaningful updates to this content.
							</DrawerDescription>
						</DrawerHeader>
						<DrawerBody>Entry one</DrawerBody>
					</DrawerContent>
				</Drawer>
			)

			await user.click(
				screen.getByRole('button', { name: 'Updated Aug 13, 2026' })
			)

			expect(
				screen.getByRole('dialog', { name: 'Changelog' })
			).toHaveClass(s.contentRight)
			expect(screen.getByText('Entry one')).toBeInTheDocument()
		})
	})
})
