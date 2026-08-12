import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../index'
import s from '../tabs.module.css'

/**
 * The regression contract for `Tabs`, written against the **current Radix implementation**
 * so the B.3 rewrite onto the WAI-ARIA APG roving-tabindex pattern has something to
 * satisfy. Task 0.3 makes this a hard gate: no component is migrated before it has tests.
 *
 * Unlike most of this epic, B.3 is **not** a breaking type change — `tabs/types.ts` is
 * already hand-written and Radix-free.
 *
 * Two things probing the real markup settled before any of this was written:
 *
 * 1. **Roving tabindex is lazy.** On first render *every* tab has `tabindex="-1"` and the
 *    `tablist` itself holds `tabindex="0"`. That looks like a defect against the APG, but
 *    it is Radix's entry-point mechanism: the first `Tab` keypress hands off, and the
 *    selected tab takes `tabindex="0"` and receives focus. Verified below rather than
 *    assumed, because the naive reading would have filed a bug that does not exist.
 * 2. **`Home`/`End` and the arrow keys skip disabled tabs**, and wrapping is `loop` on
 *    `TabsList` (default `true`), not a prop on the root.
 *
 * Entry is always driven through a preceding button and `user.tab()` rather than a direct
 * `.focus()` call — that exercises the real hand-off, and avoids the `act()` warnings a
 * bare `.focus()` provokes from Radix's RovingFocusGroup.
 */

const Fixture = ({
	loop,
	...props
}: React.ComponentProps<typeof Tabs> & { loop?: boolean }) => (
	<>
		<button type="button">Before</button>
		<Tabs defaultValue="a" {...props}>
			<TabsList loop={loop}>
				<TabsTrigger value="a">Alpha</TabsTrigger>
				<TabsTrigger value="b">Bravo</TabsTrigger>
				<TabsTrigger value="c">Charlie</TabsTrigger>
			</TabsList>
			<TabsContent value="a">Panel A</TabsContent>
			<TabsContent value="b">Panel B</TabsContent>
			<TabsContent value="c">Panel C</TabsContent>
		</Tabs>
	</>
)

/** Enter the tablist the way a keyboard user does. */
const tabInto = async (user: ReturnType<typeof userEvent.setup>) => {
	screen.getByRole('button', { name: 'Before' }).focus()
	await user.tab()
}

const tabNames = () => screen.getAllByRole('tab').map((t) => t.textContent)

describe('Tabs', () => {
	describe('structure and roles', () => {
		it('exposes a tablist, tabs, and the selected tabpanel', () => {
			render(<Fixture />)

			expect(screen.getByRole('tablist')).toBeInTheDocument()
			expect(screen.getAllByRole('tab')).toHaveLength(3)
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A')
		})

		it('marks only the selected tab as selected', () => {
			render(<Fixture />)

			expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute(
				'aria-selected',
				'true'
			)
			expect(screen.getByRole('tab', { name: 'Bravo' })).toHaveAttribute(
				'aria-selected',
				'false'
			)
		})

		it('renders tabs as real buttons', () => {
			// `type="button"` matters — inside a form, a bare <button> submits it.
			render(<Fixture />)

			for (const tab of screen.getAllByRole('tab')) {
				expect(tab.tagName).toBe('BUTTON')
				expect(tab).toHaveAttribute('type', 'button')
			}
		})

		it('wires each tab to its panel in both directions', () => {
			render(<Fixture />)
			const tab = screen.getByRole('tab', { name: 'Alpha' })
			const panel = screen.getByRole('tabpanel')

			expect(tab.getAttribute('aria-controls')).toBe(panel.id)
			expect(panel.getAttribute('aria-labelledby')).toBe(tab.id)
		})

		it('hides the unselected panels rather than unmounting the elements', () => {
			const { container } = render(<Fixture />)
			const panels = container.querySelectorAll('[role="tabpanel"]')

			expect(panels).toHaveLength(3)
			expect(panels[1]).toHaveAttribute('hidden')
			expect(panels[2]).toHaveAttribute('hidden')
			// Their children are not rendered while hidden.
			expect(panels[1]).toBeEmptyDOMElement()
		})

		it('makes the visible panel focusable', () => {
			// APG: the tabpanel takes tabindex="0" so a keyboard user can reach its
			// content after leaving the tablist.
			render(<Fixture />)

			expect(screen.getByRole('tabpanel')).toHaveAttribute('tabindex', '0')
		})

		it('reflects orientation on the root and the tablist', () => {
			const { container } = render(<Fixture orientation="vertical" />)

			expect(container.querySelector('[data-orientation="vertical"]')).not.toBeNull()
			expect(screen.getByRole('tablist')).toHaveAttribute(
				'aria-orientation',
				'vertical'
			)
		})

		it('defaults to horizontal orientation', () => {
			render(<Fixture />)

			expect(screen.getByRole('tablist')).toHaveAttribute(
				'aria-orientation',
				'horizontal'
			)
		})
	})

	describe('roving tabindex', () => {
		it('starts with no tab in the tab order and the tablist as the entry point', () => {
			// Radix's lazy entry point. Pinned because it is surprising, and because B.3
			// may legitimately choose the plain APG form instead — in which case this
			// test is the place that decision gets made rather than drifted into.
			render(<Fixture />)

			for (const tab of screen.getAllByRole('tab')) {
				expect(tab).toHaveAttribute('tabindex', '-1')
			}
			expect(screen.getByRole('tablist')).toHaveAttribute('tabindex', '0')
		})

		it('gives the selected tab the tab stop once focus enters', async () => {
			const user = userEvent.setup()
			render(<Fixture />)

			await tabInto(user)

			expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute(
				'tabindex',
				'0'
			)
			expect(screen.getByRole('tab', { name: 'Bravo' })).toHaveAttribute(
				'tabindex',
				'-1'
			)
		})

		it('moves the tab stop when the selection changes', async () => {
			const user = userEvent.setup()
			render(<Fixture />)

			await user.click(screen.getByRole('tab', { name: 'Bravo' }))

			expect(screen.getByRole('tab', { name: 'Bravo' })).toHaveAttribute(
				'tabindex',
				'0'
			)
			expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute(
				'tabindex',
				'-1'
			)
		})

		it('keeps exactly one tab stop in the list', async () => {
			const user = userEvent.setup()
			render(<Fixture />)
			await tabInto(user)

			const stops = screen
				.getAllByRole('tab')
				.filter((t) => t.getAttribute('tabindex') === '0')

			expect(stops).toHaveLength(1)
		})
	})

	describe('keyboard navigation', () => {
		it('moves along the tabs with the arrow keys when horizontal', async () => {
			const user = userEvent.setup()
			render(<Fixture />)
			await tabInto(user)

			await user.keyboard('{ArrowRight}')
			expect(document.activeElement).toHaveTextContent('Bravo')

			await user.keyboard('{ArrowLeft}')
			expect(document.activeElement).toHaveTextContent('Alpha')
		})

		it('uses the vertical arrows when orientation is vertical', async () => {
			const user = userEvent.setup()
			render(<Fixture orientation="vertical" />)
			await tabInto(user)

			await user.keyboard('{ArrowDown}')
			expect(document.activeElement).toHaveTextContent('Bravo')

			await user.keyboard('{ArrowUp}')
			expect(document.activeElement).toHaveTextContent('Alpha')
		})

		it('jumps to the first and last tab with Home and End', async () => {
			const user = userEvent.setup()
			render(<Fixture />)
			await tabInto(user)

			await user.keyboard('{End}')
			expect(document.activeElement).toHaveTextContent('Charlie')

			await user.keyboard('{Home}')
			expect(document.activeElement).toHaveTextContent('Alpha')
		})

		it('wraps past the end by default', async () => {
			const user = userEvent.setup()
			render(<Fixture />)
			await tabInto(user)

			// Asserting only the final position would pass against an implementation
			// that never moves focus at all — it starts on Alpha and would end there.
			// Checking the intermediate step is what makes this test mean something.
			await user.keyboard('{End}')
			expect(document.activeElement).toHaveTextContent('Charlie')

			await user.keyboard('{ArrowRight}')
			expect(document.activeElement).toHaveTextContent('Alpha')
		})

		it('stops at the end when TabsList sets loop={false}', async () => {
			const user = userEvent.setup()
			render(<Fixture loop={false} />)
			await tabInto(user)

			await user.keyboard('{End}{ArrowRight}')

			expect(document.activeElement).toHaveTextContent('Charlie')
		})
	})

	describe('disabled tabs', () => {
		const WithDisabled = () => (
			<>
				<button type="button">Before</button>
				<Tabs defaultValue="a">
					<TabsList>
						<TabsTrigger value="a">Alpha</TabsTrigger>
						<TabsTrigger value="b" disabled>
							Bravo
						</TabsTrigger>
						<TabsTrigger value="c">Charlie</TabsTrigger>
					</TabsList>
					<TabsContent value="a">Panel A</TabsContent>
					<TabsContent value="b">Panel B</TabsContent>
					<TabsContent value="c">Panel C</TabsContent>
				</Tabs>
			</>
		)

		it('disables the underlying button', () => {
			render(<WithDisabled />)

			expect(screen.getByRole('tab', { name: 'Bravo' })).toBeDisabled()
		})

		it('skips them when arrowing', async () => {
			const user = userEvent.setup()
			render(<WithDisabled />)
			await tabInto(user)

			await user.keyboard('{ArrowRight}')

			expect(document.activeElement).toHaveTextContent('Charlie')
		})

		it('skips them for End', async () => {
			const user = userEvent.setup()
			render(
				<>
					<button type="button">Before</button>
					<Tabs defaultValue="a">
						<TabsList>
							<TabsTrigger value="a">Alpha</TabsTrigger>
							<TabsTrigger value="b">Bravo</TabsTrigger>
							<TabsTrigger value="c" disabled>
								Charlie
							</TabsTrigger>
						</TabsList>
						<TabsContent value="a">Panel A</TabsContent>
						<TabsContent value="b">Panel B</TabsContent>
						<TabsContent value="c">Panel C</TabsContent>
					</Tabs>
				</>
			)
			await tabInto(user)

			await user.keyboard('{End}')

			expect(document.activeElement).toHaveTextContent('Bravo')
		})

		it('does not select them on click', async () => {
			const user = userEvent.setup()
			render(<WithDisabled />)

			await user.click(screen.getByRole('tab', { name: 'Bravo' }))

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A')
		})
	})

	describe('activation mode', () => {
		it('selects on arrow by default (automatic)', async () => {
			const user = userEvent.setup()
			render(<Fixture />)
			await tabInto(user)

			await user.keyboard('{ArrowRight}')

			expect(screen.getByRole('tab', { name: 'Bravo' })).toHaveAttribute(
				'aria-selected',
				'true'
			)
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel B')
		})

		it('moves focus without selecting when manual', async () => {
			const user = userEvent.setup()
			render(<Fixture activationMode="manual" />)
			await tabInto(user)

			await user.keyboard('{ArrowRight}')

			expect(document.activeElement).toHaveTextContent('Bravo')
			expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute(
				'aria-selected',
				'true'
			)
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A')
		})

		it('selects on Enter when manual', async () => {
			const user = userEvent.setup()
			render(<Fixture activationMode="manual" />)
			await tabInto(user)

			await user.keyboard('{ArrowRight}{Enter}')

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel B')
		})

		it('selects on Space when manual', async () => {
			const user = userEvent.setup()
			render(<Fixture activationMode="manual" />)
			await tabInto(user)

			await user.keyboard('{ArrowRight}[Space]')

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel B')
		})
	})

	describe('value state', () => {
		it('selects defaultValue when uncontrolled', () => {
			render(<Fixture defaultValue="b" />)

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel B')
		})

		it('switches panel on click when uncontrolled', async () => {
			const user = userEvent.setup()
			render(<Fixture />)

			await user.click(screen.getByRole('tab', { name: 'Charlie' }))

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel C')
		})

		it('honours a controlled value', () => {
			render(<Fixture value="c" onValueChange={() => {}} />)

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel C')
		})

		it('reports the new value through onValueChange', async () => {
			const user = userEvent.setup()
			const onValueChange = vi.fn()
			render(<Fixture value="a" onValueChange={onValueChange} />)

			await user.click(screen.getByRole('tab', { name: 'Bravo' }))

			expect(onValueChange).toHaveBeenCalledWith('b')
		})

		it('does not drift when a controlled owner ignores onValueChange', async () => {
			// A controlled Tabs whose owner never updates `value` must not switch itself.
			const user = userEvent.setup()
			render(<Fixture value="a" onValueChange={() => {}} />)

			await user.click(screen.getByRole('tab', { name: 'Bravo' }))

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A')
		})

		it('follows a controlled owner that does update state', async () => {
			const user = userEvent.setup()
			const Controlled = () => {
				const [value, setValue] = useState('a')
				return (
					<Tabs value={value} onValueChange={setValue}>
						<TabsList>
							<TabsTrigger value="a">Alpha</TabsTrigger>
							<TabsTrigger value="b">Bravo</TabsTrigger>
						</TabsList>
						<TabsContent value="a">Panel A</TabsContent>
						<TabsContent value="b">Panel B</TabsContent>
					</Tabs>
				)
			}
			render(<Controlled />)

			await user.click(screen.getByRole('tab', { name: 'Bravo' }))

			expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel B')
		})
	})

	describe('content mounting', () => {
		it('renders a force-mounted panel even while unselected', () => {
			render(
				<Tabs defaultValue="a">
					<TabsList>
						<TabsTrigger value="a">Alpha</TabsTrigger>
						<TabsTrigger value="b">Bravo</TabsTrigger>
					</TabsList>
					<TabsContent value="a">Panel A</TabsContent>
					<TabsContent value="b" forceMount>
						Panel B forced
					</TabsContent>
				</Tabs>
			)

			expect(screen.getByText('Panel B forced')).toBeInTheDocument()
		})

		it('leaves a force-mounted panel exposed rather than hidden', () => {
			// Pinned as current behaviour, not endorsed. `forceMount` drops the `hidden`
			// attribute, so an unselected panel stays in the accessibility tree — two
			// tabpanels are reachable at once. `tabs-content.tsx` also passes
			// `forceMount={false}` unconditionally behind a `@ts-ignore`, because Radix
			// types the prop as `true | undefined`. B.3 should decide deliberately what
			// this prop means rather than reproducing the quirk by accident.
			const { container } = render(
				<Tabs defaultValue="a">
					<TabsList>
						<TabsTrigger value="a">Alpha</TabsTrigger>
						<TabsTrigger value="b">Bravo</TabsTrigger>
					</TabsList>
					<TabsContent value="a">Panel A</TabsContent>
					<TabsContent value="b" forceMount>
						Panel B forced
					</TabsContent>
				</Tabs>
			)

			const forced = container.querySelectorAll('[role="tabpanel"]')[1]
			expect(forced).not.toHaveAttribute('hidden')
			expect(screen.getAllByRole('tabpanel')).toHaveLength(2)
		})
	})

	describe('styling hooks', () => {
		// Asserted against the imported CSS-module binding, never a literal — class names
		// are hashed by `generateScopedName` in vite.config.ts.
		it('applies the list and trigger classes', () => {
			render(<Fixture />)

			expect(screen.getByRole('tablist')).toHaveClass(s['tabs--list'])
			expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveClass(
				s['tabs--trigger']
			)
		})

		it('adds the contained modifier only when isContained is set', () => {
			const { unmount } = render(
				<Tabs defaultValue="a">
					<TabsList>
						<TabsTrigger value="a">Alpha</TabsTrigger>
					</TabsList>
					<TabsContent value="a">A</TabsContent>
				</Tabs>
			)
			expect(screen.getByRole('tablist')).not.toHaveClass(
				s['tabs--list--contained']
			)
			unmount()

			render(
				<Tabs defaultValue="a">
					<TabsList isContained>
						<TabsTrigger value="a">Alpha</TabsTrigger>
					</TabsList>
					<TabsContent value="a">A</TabsContent>
				</Tabs>
			)
			expect(screen.getByRole('tablist')).toHaveClass(s['tabs--list--contained'])
		})

		it('maps padding and background onto content modifier classes', () => {
			render(
				<Tabs defaultValue="a">
					<TabsList>
						<TabsTrigger value="a">Alpha</TabsTrigger>
					</TabsList>
					<TabsContent value="a" padding="large" background="primary">
						A
					</TabsContent>
				</Tabs>
			)

			const panel = screen.getByRole('tabpanel')
			expect(panel).toHaveClass(s['tabs--content--padding--large'])
			expect(panel).toHaveClass(s['tabs--content--background--primary'])
		})

		it('passes className through on all four parts', () => {
			const { container } = render(
				<Tabs defaultValue="a" className="root-class">
					<TabsList className="list-class">
						<TabsTrigger value="a" className="trigger-class">
							Alpha
						</TabsTrigger>
					</TabsList>
					<TabsContent value="a" className="content-class">
						A
					</TabsContent>
				</Tabs>
			)

			expect(container.querySelector('.root-class')).not.toBeNull()
			expect(screen.getByRole('tablist')).toHaveClass('list-class')
			expect(screen.getByRole('tab')).toHaveClass('trigger-class')
			expect(screen.getByRole('tabpanel')).toHaveClass('content-class')
		})

		it('keeps the component class alongside a custom one', () => {
			render(
				<Tabs defaultValue="a">
					<TabsList className="list-class">
						<TabsTrigger value="a">Alpha</TabsTrigger>
					</TabsList>
					<TabsContent value="a">A</TabsContent>
				</Tabs>
			)

			const list = screen.getByRole('tablist')
			expect(list).toHaveClass(s['tabs--list'])
			expect(list).toHaveClass('list-class')
		})
	})

	describe('trigger extras', () => {
		it('renders an icon before the label', () => {
			render(
				<Tabs defaultValue="a">
					<TabsList>
						<TabsTrigger value="a" icon={<svg data-testid="icon" />}>
							Alpha
						</TabsTrigger>
					</TabsList>
					<TabsContent value="a">A</TabsContent>
				</Tabs>
			)

			const tab = screen.getByRole('tab', { name: 'Alpha' })
			expect(tab).toContainElement(screen.getByTestId('icon'))
			// The icon is the first child, so the label reads after it.
			expect(tab.firstElementChild).toBe(screen.getByTestId('icon'))
		})

		it('forwards data-testid', () => {
			render(
				<Tabs defaultValue="a">
					<TabsList>
						<TabsTrigger value="a" data-testid="alpha-tab">
							Alpha
						</TabsTrigger>
					</TabsList>
					<TabsContent value="a">A</TabsContent>
				</Tabs>
			)

			expect(screen.getByTestId('alpha-tab')).toHaveAttribute('role', 'tab')
		})
	})

	describe('display names', () => {
		// Storybook's docgen keys its output off these. Unlike dialog and tooltip, tabs
		// already sets all four by hand rather than copying them off the Radix primitive
		// — which is why the 1.1.23 bump that emptied thirteen of those left tabs alone.
		it.each([
			[Tabs, 'Tabs'],
			[TabsList, 'TabsList'],
			[TabsTrigger, 'TabsTrigger'],
			[TabsContent, 'TabsContent'],
		] as const)('is set on %o', (Component, expected) => {
			expect((Component as { displayName?: string }).displayName).toBe(expected)
		})
	})

	describe('the shipping consumer shape', () => {
		it('drives generated triggers and panels the way music-notation does', async () => {
			// `apps/www/src/components/music-notation/music-notation/music-notation.tsx`
			// maps files to triggers and panels with a kebab-cased label as the value,
			// and sets defaultValue from the first file. It is the only consumer.
			const user = userEvent.setup()
			const files = ['lead-sheet', 'full-score', 'parts']
			render(
				<Tabs defaultValue={files[0]}>
					<TabsList>
						{files.map((f) => (
							<TabsTrigger value={f} key={f}>
								{f}
							</TabsTrigger>
						))}
					</TabsList>
					{files.map((f) => (
						<TabsContent value={f} padding="large" background="primary" key={f}>
							{`Score for ${f}`}
						</TabsContent>
					))}
				</Tabs>
			)

			expect(screen.getByRole('tabpanel')).toHaveTextContent(
				'Score for lead-sheet'
			)
			expect(tabNames()).toEqual(files)

			await user.click(screen.getByRole('tab', { name: 'parts' }))
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Score for parts')
		})
	})
})
