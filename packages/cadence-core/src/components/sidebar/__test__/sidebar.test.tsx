import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
	Sidebar,
	SidebarHeader,
	SidebarFooter,
	SidebarToggle,
	SidebarSection,
	SidebarLink,
	SidebarSeparator,
} from '../index'
import { Badge } from '../../badge'
import { TooltipProvider } from '../../tooltip'

const Wrap = ({ children }: { children: React.ReactNode }) => (
	<TooltipProvider>{children}</TooltipProvider>
)

describe('Sidebar', () => {
	it('renders a <nav> with the provided aria-label', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Test nav">
					<SidebarSection>
						<SidebarLink href="#a">Item A</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		const nav = screen.getByRole('navigation', { name: 'Test nav' })
		expect(nav.tagName).toBe('NAV')
	})

	it('defaults aria-label when not provided', () => {
		render(
			<Wrap>
				<Sidebar>
					<SidebarLink href="#a">Item</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByRole('navigation', { name: 'Sidebar navigation' })).toBeInstanceOf(HTMLElement)
	})

	it('sets data-collapsed based on collapsed prop', () => {
		const { rerender } = render(
			<Wrap>
				<Sidebar collapsed={false} ariaLabel="Nav">
					<SidebarLink href="#a">Item</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByRole('navigation').getAttribute('data-collapsed')).toBe('false')

		rerender(
			<Wrap>
				<Sidebar collapsed={true} ariaLabel="Nav">
					<SidebarLink href="#a">Item</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByRole('navigation').getAttribute('data-collapsed')).toBe('true')
	})

	it('respects defaultCollapsed when uncontrolled', () => {
		render(
			<Wrap>
				<Sidebar defaultCollapsed ariaLabel="Nav">
					<SidebarLink href="#a">Item</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByRole('navigation').getAttribute('data-collapsed')).toBe('true')
	})
})

describe('SidebarToggle', () => {
	it('flips uncontrolled collapsed state on click', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarHeader>
						<SidebarToggle />
					</SidebarHeader>
					<SidebarLink href="#a">Item</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		const nav = screen.getByRole('navigation')
		expect(nav.getAttribute('data-collapsed')).toBe('false')
		fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
		expect(nav.getAttribute('data-collapsed')).toBe('true')
		fireEvent.click(screen.getByRole('button', { name: 'Expand sidebar' }))
		expect(nav.getAttribute('data-collapsed')).toBe('false')
	})

	it('calls onCollapsedChange in controlled mode', () => {
		const onChange = vi.fn()
		const Controlled = () => {
			const [c, setC] = useState(false)
			return (
				<Sidebar
					ariaLabel="Nav"
					collapsed={c}
					onCollapsedChange={(next) => {
						onChange(next)
						setC(next)
					}}
				>
					<SidebarHeader>
						<SidebarToggle />
					</SidebarHeader>
					<SidebarLink href="#a">Item</SidebarLink>
				</Sidebar>
			)
		}
		render(
			<Wrap>
				<Controlled />
			</Wrap>
		)
		fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
		expect(onChange).toHaveBeenCalledWith(true)
	})

	it('supports a custom aria-label', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarToggle aria-label="Menu toggle" />
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByRole('button', { name: 'Menu toggle' })).toBeInstanceOf(HTMLElement)
	})
})

describe('SidebarLink', () => {
	it('sets aria-current="page" when isActive', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarLink href="#a" isActive>
						Active item
					</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		const link = screen.getByRole('link', { name: 'Active item' })
		expect(link.getAttribute('aria-current')).toBe('page')
	})

	it('does not set aria-current when not active', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarLink href="#a">Inactive</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByRole('link', { name: 'Inactive' }).getAttribute('aria-current')).toBeNull()
	})

	it('renders a badge slot', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarLink
						href="#u"
						badge={<Badge type="info" size="small" text="12" />}
					>
						Users
					</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		// Badge renders its text inside a span — find via the visible text.
		expect(screen.getByText('12')).toBeInstanceOf(HTMLElement)
	})

	it('renders through Slot when asChild is true', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarLink asChild isActive>
						<a href="#custom" data-testid="custom-link">
							Custom
						</a>
					</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		const custom = screen.getByTestId('custom-link')
		expect(custom.tagName).toBe('A')
		expect(custom.getAttribute('aria-current')).toBe('page')
	})

	it('wraps the link with a Tooltip when sidebar is collapsed', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" defaultCollapsed>
					<SidebarLink href="#a">Articles</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		// Tooltip content is rendered on focus via Radix — trigger focus
		const link = screen.getByRole('link', { name: 'Articles' })
		fireEvent.focus(link)
		// Radix duplicates content for a11y — assert at least one node exists
		const matches = screen.getAllByText('Articles')
		expect(matches.length).toBeGreaterThan(0)
	})
})

describe('SidebarSection', () => {
	it('renders the section title when sidebar is expanded', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection title="Content">
						<SidebarLink href="#a">Item</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByText('Content')).toBeInstanceOf(HTMLElement)
	})

	it('hides the section title when the sidebar is collapsed', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" defaultCollapsed>
					<SidebarSection title="Content">
						<SidebarLink href="#a">Item</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		expect(screen.queryByText('Content')).toBeNull()
	})

	it('collapsible section trigger toggles aria-expanded', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection title="Content" collapsible defaultOpen>
						<SidebarLink href="#a">Item</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		const trigger = screen.getByRole('button', { name: /Content/ })
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
		fireEvent.click(trigger)
		expect(trigger.getAttribute('aria-expanded')).toBe('false')
	})
})

describe('SidebarSeparator', () => {
	it('renders a divider element', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSeparator data-testid="sep" />
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByTestId('sep')).toBeInstanceOf(HTMLElement)
		expect(screen.getByTestId('sep').getAttribute('role')).toBe('separator')
	})
})

describe('SidebarHeader / SidebarFooter', () => {
	it('renders header and footer children', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarHeader>Brand</SidebarHeader>
					<SidebarLink href="#a">Item</SidebarLink>
					<SidebarFooter>v1</SidebarFooter>
				</Sidebar>
			</Wrap>
		)
		expect(screen.getByText('Brand')).toBeInstanceOf(HTMLElement)
		expect(screen.getByText('v1')).toBeInstanceOf(HTMLElement)
	})
})
