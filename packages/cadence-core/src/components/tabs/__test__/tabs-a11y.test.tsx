import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../index'
import { axeViolations } from '../../../test-utils'

/**
 * Axe coverage for the current Radix implementation, so the B.3 rewrite onto the APG
 * roving-tabindex pattern has a baseline to hold.
 *
 * Tabs renders in place rather than through a portal, so `container` is the right root
 * here — unlike `dialog`, whose content portals to `document.body` and whose a11y suite
 * would report a false zero against `container`.
 *
 * `axeViolations` disables `color-contrast` permanently — jsdom has no layout engine, so
 * that rule can only produce a false pass. The trigger's active/inactive contrast is
 * checked in the Storybook a11y addon panel instead.
 *
 * Worth stating plainly: **these tests alone would not catch a bad migration.** On the
 * `dialog` slice, every axe test passed against a deliberately broken rewrite while 11
 * behaviour tests failed. The roving tabindex, arrow-key handling and activation modes
 * that make tabs usable live in `tabs.test.tsx`; axe cannot see any of them.
 */

const Basic = ({ children }: { children?: React.ReactNode }) => (
	<Tabs defaultValue="a">
		<TabsList>
			<TabsTrigger value="a">Alpha</TabsTrigger>
			<TabsTrigger value="b">Bravo</TabsTrigger>
		</TabsList>
		<TabsContent value="a">{children ?? 'Panel A'}</TabsContent>
		<TabsContent value="b">Panel B</TabsContent>
	</Tabs>
)

describe('Tabs accessibility', () => {
	it('has no axe violations in the default horizontal form', async () => {
		const { container } = render(<Basic />)

		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations when vertical', async () => {
		const { container } = render(
			<Tabs defaultValue="a" orientation="vertical">
				<TabsList>
					<TabsTrigger value="a">Alpha</TabsTrigger>
					<TabsTrigger value="b">Bravo</TabsTrigger>
				</TabsList>
				<TabsContent value="a">Panel A</TabsContent>
				<TabsContent value="b">Panel B</TabsContent>
			</Tabs>
		)

		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations with a disabled tab', async () => {
		const { container } = render(
			<Tabs defaultValue="a">
				<TabsList>
					<TabsTrigger value="a">Alpha</TabsTrigger>
					<TabsTrigger value="b" disabled>
						Bravo
					</TabsTrigger>
				</TabsList>
				<TabsContent value="a">Panel A</TabsContent>
				<TabsContent value="b">Panel B</TabsContent>
			</Tabs>
		)

		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations with icons in the triggers', async () => {
		// An icon-bearing trigger still has a text label, so the tab must take its
		// accessible name from the text and not be left nameless by the svg.
		const { container } = render(
			<Tabs defaultValue="a">
				<TabsList isContained>
					<TabsTrigger value="a" icon={<svg aria-hidden="true" />}>
						Alpha
					</TabsTrigger>
					<TabsTrigger value="b" icon={<svg aria-hidden="true" />}>
						Bravo
					</TabsTrigger>
				</TabsList>
				<TabsContent value="a" padding="large" background="primary">
					Panel A
				</TabsContent>
				<TabsContent value="b">Panel B</TabsContent>
			</Tabs>
		)

		expect(screen.getByRole('tab', { name: 'Alpha' })).toBeInTheDocument()
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations with interactive content inside a panel', async () => {
		const { container } = render(
			<Basic>
				<label htmlFor="note">Note</label>
				<input id="note" name="note" type="text" />
				<button type="button">Save</button>
			</Basic>
		)

		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations after switching tabs', async () => {
		const user = userEvent.setup()
		const { container } = render(<Basic />)

		await user.click(screen.getByRole('tab', { name: 'Bravo' }))

		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations with a force-mounted panel', async () => {
		// Two tabpanels are in the tree at once here — see the note in tabs.test.tsx.
		// Axe tolerates it; recorded so B.3 knows this shape was covered.
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

		expect(await axeViolations(container)).toEqual([])
	})
})
