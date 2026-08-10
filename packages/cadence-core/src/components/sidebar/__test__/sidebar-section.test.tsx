import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar, SidebarSection, SidebarLink } from '../index'
import { TooltipProvider } from '../../tooltip'
import { axeViolations } from '../../../test-utils'

/**
 * New in Radix A.7. `SidebarSection`'s collapsible mode had **no test coverage at all**
 * while it was built on `@radix-ui/react-collapsible` — the existing sidebar suites never
 * passed the `collapsible` prop. These tests specify the disclosure behaviour the
 * in-house implementation now owns.
 */

const Wrap = ({ children }: { children: React.ReactNode }) => (
	<TooltipProvider>{children}</TooltipProvider>
)

const renderSection = (props: Record<string, unknown> = {}) =>
	render(
		<Wrap>
			<Sidebar ariaLabel="Nav">
				<SidebarSection title="Library" collapsible {...props}>
					<SidebarLink href="#a">Item A</SidebarLink>
					<SidebarLink href="#b">Item B</SidebarLink>
				</SidebarSection>
			</Sidebar>
		</Wrap>
	)

const trigger = () => screen.getByRole('button', { name: /library/i })

describe('SidebarSection disclosure semantics', () => {
	it('exposes a button that reports its expanded state', () => {
		renderSection()
		expect(trigger()).toHaveAttribute('aria-expanded', 'true')
	})

	it('points aria-controls at the region it owns', () => {
		const { container } = renderSection()
		const id = trigger().getAttribute('aria-controls')
		expect(id).toBeTruthy()
		// A dangling aria-controls is worse than none — the region must exist even when
		// the section is closed, which is why it stays mounted and uses `hidden`.
		expect(container.querySelector(`#${CSS.escape(id!)}`)).toBeInTheDocument()
	})

	it('keeps the region resolvable while collapsed', async () => {
		const user = userEvent.setup()
		const { container } = renderSection()
		await user.click(trigger())

		const id = trigger().getAttribute('aria-controls')
		expect(container.querySelector(`#${CSS.escape(id!)}`)).toBeInTheDocument()
	})

	it('gives two sections on one page distinct region ids', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection title="First" collapsible>
						<SidebarLink href="#a">A</SidebarLink>
					</SidebarSection>
					<SidebarSection title="Second" collapsible>
						<SidebarLink href="#b">B</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		const ids = screen
			.getAllByRole('button')
			.map((b) => b.getAttribute('aria-controls'))
			.filter(Boolean)
		expect(new Set(ids).size).toBe(ids.length)
	})
})

describe('SidebarSection uncontrolled mode', () => {
	it('is open by default', () => {
		renderSection()
		expect(screen.getByRole('link', { name: 'Item A' })).toBeVisible()
	})

	it('honours defaultOpen={false}', () => {
		const { container } = renderSection({ defaultOpen: false })
		expect(trigger()).toHaveAttribute('aria-expanded', 'false')

		// `hidden` takes the region out of the accessibility tree entirely, so the links
		// are not merely invisible — they are unreachable, which is the point.
		expect(screen.queryByRole('link', { name: 'Item A' })).toBeNull()
		const id = trigger().getAttribute('aria-controls')
		expect(container.querySelector(`#${CSS.escape(id!)}`)).toHaveAttribute('hidden')
	})

	it('toggles on click', async () => {
		const user = userEvent.setup()
		const { container } = renderSection()
		const region = () =>
			container.querySelector(
				`#${CSS.escape(trigger().getAttribute('aria-controls')!)}`
			)

		await user.click(trigger())
		expect(trigger()).toHaveAttribute('aria-expanded', 'false')
		expect(screen.queryByRole('link', { name: 'Item A' })).toBeNull()
		expect(region()).toHaveAttribute('hidden')

		await user.click(trigger())
		expect(trigger()).toHaveAttribute('aria-expanded', 'true')
		expect(screen.getByRole('link', { name: 'Item A' })).toBeVisible()
		expect(region()).not.toHaveAttribute('hidden')
	})

	it('reports each change through onOpenChange', async () => {
		const user = userEvent.setup()
		const onOpenChange = vi.fn()
		renderSection({ onOpenChange })

		await user.click(trigger())
		expect(onOpenChange).toHaveBeenCalledWith(false)

		await user.click(trigger())
		expect(onOpenChange).toHaveBeenCalledWith(true)
	})
})

describe('SidebarSection controlled mode', () => {
	it('reflects the open prop', () => {
		const { rerender } = renderSection({ open: false })
		expect(trigger()).toHaveAttribute('aria-expanded', 'false')

		rerender(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection title="Library" collapsible open={true}>
						<SidebarLink href="#a">Item A</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		expect(trigger()).toHaveAttribute('aria-expanded', 'true')
	})

	it('does not move on its own when the owner ignores the change', async () => {
		const user = userEvent.setup()
		const onOpenChange = vi.fn()
		renderSection({ open: true, onOpenChange })

		await user.click(trigger())
		expect(onOpenChange).toHaveBeenCalledWith(false)
		// Still open: the prop is the source of truth.
		expect(trigger()).toHaveAttribute('aria-expanded', 'true')
	})

	it('follows parent state when wired up', async () => {
		const user = userEvent.setup()
		const Controlled = () => {
			const [open, setOpen] = useState(true)
			return (
				<Wrap>
					<Sidebar ariaLabel="Nav">
						<SidebarSection
							title="Library"
							collapsible
							open={open}
							onOpenChange={setOpen}
						>
							<SidebarLink href="#a">Item A</SidebarLink>
						</SidebarSection>
					</Sidebar>
				</Wrap>
			)
		}
		render(<Controlled />)

		await user.click(trigger())
		expect(trigger()).toHaveAttribute('aria-expanded', 'false')
	})
})

describe('SidebarSection keyboard operation', () => {
	it('is reachable by Tab and toggles on Enter and Space', async () => {
		const user = userEvent.setup()
		renderSection()

		await user.tab()
		expect(trigger()).toHaveFocus()

		await user.keyboard('{Enter}')
		expect(trigger()).toHaveAttribute('aria-expanded', 'false')

		await user.keyboard(' ')
		expect(trigger()).toHaveAttribute('aria-expanded', 'true')
	})
})

describe('SidebarSection non-collapsible and collapsed-rail behaviour', () => {
	it('renders no button when collapsible is not set', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection title="Library">
						<SidebarLink href="#a">Item A</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		expect(screen.queryByRole('button', { name: /library/i })).toBeNull()
		expect(screen.getByRole('link', { name: 'Item A' })).toBeVisible()
	})

	it('forces sections open when the whole rail is collapsed', () => {
		// Unchanged from the Radix implementation: with the rail collapsed the title is
		// hidden and links are icons only, so there is nothing meaningful to toggle.
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" defaultCollapsed>
					<SidebarSection title="Library" collapsible defaultOpen={false}>
						<SidebarLink href="#a">Item A</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		expect(screen.queryByRole('button', { name: /library/i })).toBeNull()
		expect(screen.getByRole('link', { name: 'Item A' })).toBeVisible()
	})

	it('keeps list semantics in both modes', () => {
		const { container } = renderSection()
		const list = container.querySelector('ul')
		expect(list).toBeInTheDocument()
		expect(list?.querySelectorAll('li').length).toBe(2)
	})
})

describe('SidebarSection accessibility', () => {
	it('has no axe violations when open', async () => {
		const { container } = renderSection()
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations when closed', async () => {
		const { container } = renderSection({ defaultOpen: false })
		expect(await axeViolations(container)).toEqual([])
	})
})
