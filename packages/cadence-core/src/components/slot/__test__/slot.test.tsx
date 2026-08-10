import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Slot, Slottable } from '../index'

/**
 * These tests are the specification for the in-house `Slot` added in Radix A.6. The one
 * consumer, `sidebar/sidebar-link.tsx`, previously relied on documented-but-internal
 * behaviour of `@radix-ui/react-slot`; pinning that behaviour here is what makes owning
 * the implementation safe.
 */

describe('Slot rendering', () => {
	it('renders the child element rather than a wrapper of its own', () => {
		const { container } = render(
			<Slot>
				<a href="/home">Home</a>
			</Slot>
		)
		expect(container.firstElementChild?.tagName).toBe('A')
		expect(container.querySelectorAll('*')).toHaveLength(1)
	})

	it('renders nothing when given no element child', () => {
		const { container } = render(<Slot>{null}</Slot>)
		expect(container.firstElementChild).toBeNull()
	})

	it('throws on more than one child, rather than guessing', () => {
		// `Children.only` is the guard. Silently picking the first child would make a
		// misuse look like it worked.
		const render2 = () =>
			render(
				<Slot>
					<a href="/a">A</a>
					<a href="/b">B</a>
				</Slot>
			)
		expect(render2).toThrow()
	})
})

describe('Slot prop merging', () => {
	it('passes its own props down to the child', () => {
		render(
			<Slot data-testid="slotted" aria-current="page">
				<a href="/home">Home</a>
			</Slot>
		)
		expect(screen.getByTestId('slotted')).toHaveAttribute('aria-current', 'page')
		expect(screen.getByTestId('slotted')).toHaveAttribute('href', '/home')
	})

	it('lets the child win for ordinary props', () => {
		render(
			<Slot data-testid="slotted" title="from slot">
				<a href="/home" title="from child">
					Home
				</a>
			</Slot>
		)
		expect(screen.getByTestId('slotted')).toHaveAttribute('title', 'from child')
	})

	it('concatenates className rather than replacing it', () => {
		render(
			<Slot data-testid="slotted" className="from-slot">
				<a href="/home" className="from-child">
					Home
				</a>
			</Slot>
		)
		expect(screen.getByTestId('slotted')).toHaveClass('from-slot', 'from-child')
	})

	it('omits a stray space when only one className is present', () => {
		render(
			<Slot data-testid="slotted" className="from-slot">
				<a href="/home">Home</a>
			</Slot>
		)
		expect(screen.getByTestId('slotted').className).toBe('from-slot')
	})

	it('merges style, with the child winning on conflict', () => {
		render(
			<Slot data-testid="slotted" style={{ color: 'red', margin: '4px' }}>
				<a href="/home" style={{ color: 'blue' }}>
					Home
				</a>
			</Slot>
		)
		const el = screen.getByTestId('slotted')
		expect(el).toHaveStyle({ color: 'rgb(0, 0, 255)', margin: '4px' })
	})
})

describe('Slot event handlers', () => {
	it('composes handlers present on both, child first', () => {
		const calls: string[] = []
		render(
			<Slot data-testid="slotted" onClick={() => calls.push('slot')}>
				<button type="button" onClick={() => calls.push('child')}>
					Go
				</button>
			</Slot>
		)
		screen.getByTestId('slotted').click()
		expect(calls).toEqual(['child', 'slot'])
	})

	it('uses the slot handler when the child has none', async () => {
		const user = userEvent.setup()
		const onClick = vi.fn()
		render(
			<Slot data-testid="slotted" onClick={onClick}>
				<button type="button">Go</button>
			</Slot>
		)
		await user.click(screen.getByTestId('slotted'))
		expect(onClick).toHaveBeenCalledTimes(1)
	})

	it('keeps the child handler when the slot has none', async () => {
		const user = userEvent.setup()
		const onClick = vi.fn()
		render(
			<Slot data-testid="slotted">
				<button type="button" onClick={onClick}>
					Go
				</button>
			</Slot>
		)
		await user.click(screen.getByTestId('slotted'))
		expect(onClick).toHaveBeenCalledTimes(1)
	})
})

describe('Slot ref composition', () => {
	it('forwards its ref to the child element', () => {
		const ref = React.createRef<HTMLAnchorElement>()
		render(
			<Slot ref={ref as React.Ref<unknown>}>
				<a href="/home">Home</a>
			</Slot>
		)
		expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
	})

	it('satisfies both refs when the slot and the child each carry one', () => {
		// The case that makes composition necessary rather than a simple override.
		const slotRef = React.createRef<HTMLAnchorElement>()
		const childRef = React.createRef<HTMLAnchorElement>()
		render(
			<Slot ref={slotRef as React.Ref<unknown>}>
				<a href="/home" ref={childRef}>
					Home
				</a>
			</Slot>
		)
		expect(slotRef.current).toBeInstanceOf(HTMLAnchorElement)
		expect(childRef.current).toBe(slotRef.current)
	})

	it('supports callback refs on both sides', () => {
		const seen: string[] = []
		render(
			<Slot ref={((node: unknown) => node && seen.push('slot')) as React.Ref<unknown>}>
				<a href="/home" ref={(node) => { if (node) seen.push('child') }}>
					Home
				</a>
			</Slot>
		)
		expect(seen).toContain('slot')
		expect(seen).toContain('child')
	})

	it('keeps the child ref working when the slot has none', () => {
		const childRef = React.createRef<HTMLAnchorElement>()
		render(
			<Slot>
				<a href="/home" ref={childRef}>
					Home
				</a>
			</Slot>
		)
		expect(childRef.current).toBeInstanceOf(HTMLAnchorElement)
	})
})

describe('Slottable', () => {
	it('promotes the marked child and renders siblings around its own children', () => {
		// The exact shape sidebar-link relies on: icons and badges wrap the consumer's
		// original label text inside the consumer's own element.
		const { container } = render(
			<Slot className="link">
				<span data-testid="leading">icon</span>
				<Slottable>
					<a href="/home">Home</a>
				</Slottable>
				<span data-testid="badge">3</span>
			</Slot>
		)

		const anchor = container.querySelector('a') as HTMLElement
		expect(anchor).toHaveClass('link')
		expect(anchor.textContent).toBe('iconHome3')
		// Everything lives inside the promoted element, not beside it.
		expect(anchor.contains(screen.getByTestId('leading'))).toBe(true)
		expect(anchor.contains(screen.getByTestId('badge'))).toBe(true)
		expect(container.children).toHaveLength(1)
	})

	it('preserves the promoted element and merges slot props onto it', () => {
		const onClick = vi.fn()
		render(
			<Slot data-testid="slotted" className="from-slot" onClick={onClick}>
				<Slottable>
					<a href="/home" className="from-child">
						Home
					</a>
				</Slottable>
			</Slot>
		)
		const el = screen.getByTestId('slotted')
		expect(el.tagName).toBe('A')
		expect(el).toHaveAttribute('href', '/home')
		expect(el).toHaveClass('from-slot', 'from-child')
		el.click()
		expect(onClick).toHaveBeenCalled()
	})

	it('composes refs through a Slottable', () => {
		const ref = React.createRef<HTMLAnchorElement>()
		render(
			<Slot ref={ref as React.Ref<unknown>}>
				<span>icon</span>
				<Slottable>
					<a href="/home">Home</a>
				</Slottable>
			</Slot>
		)
		expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
	})

	it('renders nothing when the Slottable holds no element', () => {
		const { container } = render(
			<Slot>
				<Slottable>{null}</Slottable>
			</Slot>
		)
		expect(container.firstElementChild).toBeNull()
	})

	it('throws when the Slottable wraps more than one element', () => {
		const render2 = () =>
			render(
				<Slot>
					<Slottable>
						<a href="/a">A</a>
						<a href="/b">B</a>
					</Slottable>
				</Slot>
			)
		expect(render2).toThrow()
	})
})
