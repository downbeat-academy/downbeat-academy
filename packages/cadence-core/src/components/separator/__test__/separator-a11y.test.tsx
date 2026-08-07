import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Separator } from '../index'
import { axeViolations } from '../../../test-utils'

/**
 * Axe coverage for the current Radix implementation, so the A.1 rewrite has a baseline to
 * hold. `axeViolations` disables `color-contrast` and does not allow re-enabling it —
 * jsdom has no layout engine, so that rule can only produce a false pass. The separator's
 * contrast against its background is checked in the Storybook a11y addon panel instead.
 */

/**
 * Separators are only meaningful between things, and axe's rules for `separator` depend on
 * the surrounding structure — asserting on one rendered alone would exercise almost
 * nothing.
 */
const Between = ({ children }: { children: React.ReactNode }) => (
	<section aria-label="Account settings">
		<p>Profile</p>
		{children}
		<p>Billing</p>
	</section>
)

describe('Separator accessibility', () => {
	it('has no axe violations when decorative', async () => {
		const { container } = render(
			<Between>
				<Separator />
			</Between>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations when exposed as a separator', async () => {
		const { container } = render(
			<Between>
				<Separator decorative={false} />
			</Between>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations when vertical and exposed', async () => {
		const { container } = render(
			<Between>
				<Separator decorative={false} orientation="vertical" />
			</Between>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations repeated between content blocks', async () => {
		// The shape both apps/www consumers use — `account/page.tsx` and
		// `changelog-drawer.tsx` both stack separators between blocks inside a Flex.
		const entries = ['1.2.0', '1.1.0', '1.0.0']
		const { container } = render(
			<section aria-label="Changelog">
				{entries.map((version, i) => (
					<React.Fragment key={version}>
						<p>{version}</p>
						{i < entries.length - 1 && <Separator />}
					</React.Fragment>
				))}
			</section>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no axe violations separating items in a list', async () => {
		// A separator inside a `<ul>` has to sit *within* an `<li>`. Putting the role on
		// the `<li>` strips its listitem role and axe's `list` rule flags the whole list —
		// which is why `sidebar-separator.tsx` wraps rather than replaces. Guarded here so
		// the A.1 rewrite keeps working in that position.
		const { container } = render(
			<ul aria-label="Account actions">
				<li>
					<a href="#profile">Profile</a>
				</li>
				<li>
					<Separator decorative={false} />
				</li>
				<li>
					<a href="#signout">Sign out</a>
				</li>
			</ul>
		)
		expect(await axeViolations(container)).toEqual([])
	})
})
