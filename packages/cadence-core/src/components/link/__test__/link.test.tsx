import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Link } from '../link'

describe('Link component', () => {
	it('renders with children text', () => {
		render(<Link href="/test">Test Link</Link>)
		const link = screen.getByRole('link', { name: 'Test Link' })
		expect(link).toBeInstanceOf(HTMLAnchorElement)
	})

	it('renders as an anchor element by default', () => {
		render(<Link href="/test">Click me</Link>)
		const link = screen.getByRole('link')
		expect(link.tagName).toBe('A')
	})

	it('passes through href attribute', () => {
		render(<Link href="/test">Link</Link>)
		const link = screen.getByRole('link')
		expect(link.getAttribute('href')).toBe('/test')
	})

	it('applies the primary type class by default', () => {
		render(<Link href="/test">Primary</Link>)
		const link = screen.getByRole('link')
		expect(link.className).toContain('primary')
	})

	it('applies the correct type class for brand', () => {
		render(
			<Link href="/test" type="brand">
				Brand Link
			</Link>
		)
		const link = screen.getByRole('link')
		expect(link.className).toContain('brand')
	})

	it('applies underline class by default', () => {
		render(<Link href="/test">Underlined</Link>)
		const link = screen.getByRole('link')
		expect(link.className).toContain('underline')
	})

	it('does not apply underline class when isUnderline is false', () => {
		render(
			<Link href="/test" isUnderline={false}>
				No Underline
			</Link>
		)
		const link = screen.getByRole('link')
		expect(link.className).not.toContain('underline')
	})

	it('renders with a custom element via the as prop', () => {
		const CustomComponent = React.forwardRef<HTMLSpanElement, any>(
			({ children, ...props }, ref) => (
				<span ref={ref} {...props}>
					{children}
				</span>
			)
		)
		CustomComponent.displayName = 'CustomComponent'
		render(
			<Link as={CustomComponent} href="/test">
				Custom
			</Link>
		)
		expect(screen.getByText('Custom')).toBeInstanceOf(HTMLSpanElement)
	})

	it('applies custom className', () => {
		render(
			<Link href="/test" className="custom-class">
				Link
			</Link>
		)
		const link = screen.getByRole('link')
		expect(link.className).toContain('custom-class')
	})

	it('sets data-cy attribute', () => {
		render(
			<Link href="/test" dataCy="test-link">
				Link
			</Link>
		)
		const link = screen.getByRole('link')
		expect(link.getAttribute('data-cy')).toBe('test-link')
	})
})
