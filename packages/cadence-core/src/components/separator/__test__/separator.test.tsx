import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Separator } from '../index'
import type { SeparatorColor } from '../types'
import s from '../separator.module.css'
import { declaredRules } from '../../../test-utils'

/**
 * Written against the *current* `@radix-ui/react-separator` behavior, verified by
 * inspecting the rendered markup rather than by reading Radix's source. These are the
 * regression contract for Radix 0.3 → A.1: the hand-rolled `<div>` that replaces
 * `SeparatorPrimitive.Root` has to satisfy every assertion here unchanged.
 *
 * What Radix emits today, for the record:
 *
 *   <Separator />                              → role="none"      data-orientation="horizontal"
 *   <Separator decorative={false} />           → role="separator" data-orientation="horizontal"
 *   <Separator decorative={false} vertical />  → role="separator" data-orientation="vertical"
 *                                                aria-orientation="vertical"
 *
 * The two subtleties worth preserving deliberately: `aria-orientation` is emitted only for
 * the *vertical, non-decorative* case — `horizontal` is the ARIA default for `separator`
 * and is left implicit — and `data-orientation` is present regardless of `decorative`,
 * because it is what the stylesheet keys off.
 */

const COLORS: SeparatorColor[] = [
	'primary',
	'faint',
	'brand',
	'interactive',
	'success',
	'warning',
	'critical',
	'high-contrast',
]

/** The rendered element is the only child of the render container. */
const subject = (container: HTMLElement) =>
	container.firstElementChild as HTMLElement

describe('Separator role semantics', () => {
	it('is hidden from the accessibility tree by default', () => {
		// `decorative` defaults to true, so the default separator is presentational. Both
		// consumers in apps/www rely on this default.
		const { container } = render(<Separator />)
		expect(screen.queryByRole('separator')).toBeNull()
		expect(subject(container)).toHaveAttribute('role', 'none')
	})

	it('exposes role="separator" when decorative is false', () => {
		render(<Separator decorative={false} />)
		expect(screen.getByRole('separator')).toBeInTheDocument()
	})

	it('is still presentational when decorative and vertical', () => {
		const { container } = render(<Separator orientation="vertical" />)
		expect(screen.queryByRole('separator')).toBeNull()
		expect(subject(container)).toHaveAttribute('role', 'none')
	})
})

describe('Separator orientation', () => {
	it('omits aria-orientation when horizontal, since that is the ARIA default', () => {
		render(<Separator decorative={false} />)
		expect(screen.getByRole('separator')).not.toHaveAttribute(
			'aria-orientation'
		)
	})

	it('sets aria-orientation when vertical', () => {
		render(<Separator decorative={false} orientation="vertical" />)
		expect(screen.getByRole('separator')).toHaveAttribute(
			'aria-orientation',
			'vertical'
		)
	})

	it('omits aria-orientation on a decorative vertical separator', () => {
		// role="none" carries no orientation, so the attribute would be meaningless.
		const { container } = render(<Separator orientation="vertical" />)
		expect(subject(container)).not.toHaveAttribute('aria-orientation')
	})

	it.each(['horizontal', 'vertical'] as const)(
		'reflects %s in data-orientation regardless of decorative',
		(orientation) => {
			// data-orientation is the styling hook (see the stylesheet assertion below), so
			// it must be emitted even when the separator is presentational.
			const decorative = render(<Separator orientation={orientation} />)
			expect(subject(decorative.container)).toHaveAttribute(
				'data-orientation',
				orientation
			)

			const semantic = render(
				<Separator orientation={orientation} decorative={false} />
			)
			expect(subject(semantic.container)).toHaveAttribute(
				'data-orientation',
				orientation
			)
		}
	)
})

describe('Separator styling hooks', () => {
	it('always applies the root class', () => {
		const { container } = render(<Separator />)
		expect(subject(container)).toHaveClass(s.root)
	})

	it.each(COLORS)('applies the %s color class', (color) => {
		// Asserted against the imported binding, never a literal — class names are hashed.
		const { container } = render(<Separator color={color} />)
		expect(subject(container)).toHaveClass(s[`color--${color}`])
	})

	it('defaults to the primary color', () => {
		const { container } = render(<Separator />)
		expect(subject(container)).toHaveClass(s['color--primary'])
	})

	it('sizes itself from data-orientation, not from an orientation class', () => {
		// `separator.tsx` builds a class name `orientation--${orientation}`, but the
		// stylesheet declares no such rule — the module exports only `root` and the eight
		// `color--*` keys, so the lookup is `undefined` and `classnames` drops it. The
		// orientation styling actually comes from `[data-orientation]` attribute selectors.
		// Pinned here so the A.1 rewrite cannot quietly drop the attribute the CSS needs.
		expect(s).not.toHaveProperty('orientation--horizontal')
		expect(s).not.toHaveProperty('orientation--vertical')

		const rules = declaredRules(s.root).join('\n')
		expect(rules).toMatch(/width:\s*100%/)
		expect(rules).toMatch(/min-height:\s*100%/)
	})

	it('merges a consumer className with its own', () => {
		const { container } = render(<Separator className="custom" />)
		expect(subject(container)).toHaveClass(
			'custom',
			s.root,
			s['color--primary']
		)
	})
})

describe('Separator element contract', () => {
	it('renders a div', () => {
		const { container } = render(<Separator />)
		expect(subject(container).tagName).toBe('DIV')
	})

	it('forwards a ref to the underlying element', () => {
		const ref = React.createRef<HTMLDivElement>()
		const { container } = render(<Separator ref={ref} />)
		expect(ref.current).toBeInstanceOf(HTMLDivElement)
		expect(ref.current).toBe(subject(container))
	})

	it('passes arbitrary props through to the element', () => {
		render(<Separator id="rule" data-testid="sep" />)
		expect(screen.getByTestId('sep')).toHaveAttribute('id', 'rule')
	})
})

describe('Separator keyboard behavior', () => {
	// A separator is non-interactive. "Keyboard operation" here means proving it stays out
	// of the tab order in both roles — a hand-rolled replacement that adds a tabIndex, or
	// swaps in a focusable element, would be a regression.
	it.each([true, false])(
		'is not focusable and is skipped by Tab (decorative=%s)',
		async (decorative) => {
			const user = userEvent.setup()
			render(
				<>
					<button type="button">before</button>
					<Separator decorative={decorative} data-testid="sep" />
					<button type="button">after</button>
				</>
			)
			expect(screen.getByTestId('sep')).not.toHaveAttribute('tabindex')

			await user.tab()
			expect(screen.getByRole('button', { name: 'before' })).toHaveFocus()
			await user.tab()
			expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
		}
	)
})
