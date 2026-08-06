import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, renderHook } from '@testing-library/react'
import {
	Sidebar,
	SidebarHeader,
	SidebarToggle,
	SidebarSection,
	SidebarLink,
	SidebarSeparator,
	useSidebar,
} from '../index'
import { TooltipProvider } from '../../tooltip'
import { axeViolations } from '../../../test-utils'

const Wrap = ({ children }: { children: React.ReactNode }) => (
	<TooltipProvider>{children}</TooltipProvider>
)

const Example = ({ collapsed = false }: { collapsed?: boolean }) => (
	<Wrap>
		<Sidebar ariaLabel="Admin navigation" defaultCollapsed={collapsed}>
			<SidebarHeader>
				<SidebarToggle />
			</SidebarHeader>
			<SidebarSection title="Content">
				<SidebarLink href="#overview" isActive>
					Overview
				</SidebarLink>
				<SidebarSeparator />
				<SidebarLink asChild>
					<a href="#users">Users</a>
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	</Wrap>
)

describe('Sidebar accessibility', () => {
	it('has no axe violations when expanded', async () => {
		const { container } = render(<Example />)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations when collapsed', async () => {
		const { container } = render(<Example collapsed />)
		expect(await axeViolations(container)).toEqual([])
	})
})

describe('Sidebar list semantics', () => {
	it('wraps links in <li> inside a section', () => {
		const { container } = render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection>
						<SidebarLink href="#a">Item</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		const li = container.querySelector('li')
		expect(li).not.toBeNull()
		expect(li!.parentElement!.tagName).toBe('UL')
	})

	it('omits the <li> when a link is used outside a section', () => {
		// An <li> directly under <nav> is invalid HTML and loses list semantics.
		const { container } = render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarLink href="#a">Item</SidebarLink>
				</Sidebar>
			</Wrap>
		)
		expect(container.querySelector('li')).toBeNull()
		expect(container.querySelector('nav > a')).not.toBeNull()
	})

	it('renders the separator as an <li> inside a section and a <div> outside one', () => {
		const { container: inSection } = render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection>
						<SidebarSeparator data-testid="sep" />
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		expect(inSection.querySelector('ul > li > div[role="separator"]')).not.toBeNull()

		const { container: standalone } = render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSeparator />
				</Sidebar>
			</Wrap>
		)
		expect(standalone.querySelector('nav > div[role="separator"]')).not.toBeNull()
	})
})

describe('useSidebar', () => {
	it('throws a helpful error when used outside a <Sidebar>', () => {
		expect(() => renderHook(() => useSidebar())).toThrowError(
			/must be used within a <Sidebar>/
		)
	})
})
