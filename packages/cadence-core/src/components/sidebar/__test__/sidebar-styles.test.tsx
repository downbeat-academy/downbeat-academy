import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
	Sidebar,
	SidebarHeader,
	SidebarToggle,
	SidebarSection,
	SidebarLink,
} from '../index'
import { Badge } from '../../badge'
import { TooltipProvider } from '../../tooltip'
import s from '../sidebar.module.css'

/**
 * These assert the CSS-driven behavior of the collapsed rail, which the DOM-level
 * tests in sidebar.test.tsx cannot see. They rely on `test.css: true` in vite.config.ts
 * so the CSS module is compiled and injected into jsdom.
 *
 * Caveat 1: jsdom resolves the cascade but performs no layout, so these verify *declared*
 * computed values (`display`, `flex-shrink`) — not painted geometry.
 * Visual regressions still need Storybook/Chromatic.
 *
 * Caveat 2: jsdom does not resolve `var()`. A declaration written as
 * `border: 1px solid var(--cds-color-border-faint)` computes to `borderTopStyle: 'none'`,
 * and `borderRadius` reads back as the literal string `"var(--cds-radii-medium)"` —
 * the same rule written with a literal color computes correctly. So any assertion on a
 * token-driven property must inspect the *declared rule*, not `getComputedStyle`.
 * `declaredRootRule()` below exists for exactly that case.
 */

/**
 * Finds the `.root` rule text for the sidebar CSS module in the stylesheets vite injected.
 * Class names are hashed (`cds-sidebar-root--xxxxx`), so match on the imported binding.
 */
const declaredRootRule = (): string => {
	const rootClass = s.root.split(' ')[0]
	for (const sheet of Array.from(document.styleSheets)) {
		let rules: CSSRule[]
		try {
			rules = Array.from(sheet.cssRules)
		} catch {
			continue // cross-origin sheet; not ours
		}
		for (const rule of rules) {
			if (
				rule instanceof CSSStyleRule &&
				rule.selectorText === `.${rootClass}`
			) {
				return rule.style.cssText
			}
		}
	}
	throw new Error(`No declared rule found for .${rootClass}`)
}

const Wrap = ({ children }: { children: React.ReactNode }) => (
	<TooltipProvider>{children}</TooltipProvider>
)

const findLabel = (link: HTMLElement, text: string) =>
	Array.from(link.querySelectorAll('span')).find((el) => el.textContent === text)

describe('Sidebar collapsed rail styling', () => {
	it('hides the label of an asChild link when collapsed', () => {
		// The original bug: Radix promoted the consumer's <Link> and emitted the label as
		// bare text, so the hide rule had nothing to match and the text stayed visible.
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" defaultCollapsed>
					<SidebarSection>
						<SidebarLink asChild>
							<a href="#a" data-testid="link">
								Overview
							</a>
						</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		const label = findLabel(screen.getByTestId('link'), 'Overview')
		expect(label).toBeDefined()
		expect(getComputedStyle(label!).display).toBe('none')
	})

	it('hides the label of a plain href link when collapsed', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" defaultCollapsed>
					<SidebarSection>
						<SidebarLink href="#a" data-testid="link">
							Overview
						</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		const label = findLabel(screen.getByTestId('link'), 'Overview')
		expect(getComputedStyle(label!).display).toBe('none')
	})

	it('shows the label when expanded', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav">
					<SidebarSection>
						<SidebarLink asChild>
							<a href="#a" data-testid="link">
								Overview
							</a>
						</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		const label = findLabel(screen.getByTestId('link'), 'Overview')
		expect(getComputedStyle(label!).display).not.toBe('none')
	})

	it('hides the badge when collapsed', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" defaultCollapsed>
					<SidebarSection>
						<SidebarLink
							href="#u"
							data-testid="link"
							badge={<Badge type="info" size="small" text="12" />}
						>
							Users
						</SidebarLink>
					</SidebarSection>
				</Sidebar>
			</Wrap>
		)
		// The wrapper span carries the hide rule; the Badge itself keeps its own display.
		const badgeWrapper = screen
			.getByTestId('link')
			.querySelector(`.${s.linkBadge}`)
		expect(badgeWrapper).not.toBeNull()
		expect(getComputedStyle(badgeWrapper!).display).toBe('none')
	})

	it('keeps the toggle from shrinking in the collapsed rail', () => {
		// The toggle declares width: 32px but is a flex child; without flex-shrink: 0 it
		// squashed to the ~16px left over after the header's own padding.
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" defaultCollapsed>
					<SidebarHeader>
						<SidebarToggle />
					</SidebarHeader>
				</Sidebar>
			</Wrap>
		)
		const toggle = screen.getByRole('button')
		const styles = getComputedStyle(toggle)
		expect(styles.flexShrink).toBe('0')
		expect(styles.width).toBe('32px')
	})
})

describe('Sidebar panel styling', () => {
	it('draws a border on all four sides with a token radius', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" data-testid="nav" />
			</Wrap>
		)
		// Asserted against the declared rule, not getComputedStyle — see Caveat 2 above.
		const declared = declaredRootRule()

		// A `border` shorthand applies to all four sides; the per-side longhands would
		// only appear if something overrode them, which is what this guards against.
		expect(declared).toMatch(/border:\s*1px\s+solid\s+var\(--cds-color-border-faint\)/)
		expect(declared).toMatch(/border-radius:\s*var\(--cds-radii-[a-z]+\)/)
	})

	it('fills the height of its container', () => {
		render(
			<Wrap>
				<Sidebar ariaLabel="Nav" data-testid="nav" />
			</Wrap>
		)
		expect(getComputedStyle(screen.getByTestId('nav')).height).toBe('100%')
	})
})
