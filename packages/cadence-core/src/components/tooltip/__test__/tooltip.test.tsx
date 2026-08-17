import React, { useState } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from '../index'
import s from '../tooltip.module.css'

/**
 * The markup-and-wiring half of `Tooltip`'s contract. Placement lives in
 * `tooltip.browser.test.tsx`, because jsdom has no layout engine and cannot compute a
 * position at all.
 *
 * This file replaced a 732-line suite written against Radix. Most of it did not survive
 * review rather than the migration: `accepts and forwards props to Radix provider`
 * asserted only `not.toThrow()`, which passes against an empty function component, and
 * `renders within a Portal` asserted that a trigger was an `HTMLElement` and that the
 * content's text existed somewhere — both true of an implementation with no portal. Those
 * tests named Radix's mechanism and checked none of it.
 *
 * What is asserted here instead is what a consumer can observe: when the tooltip appears,
 * what describes what, and what closes it.
 */

const openTooltip = (trigger: HTMLElement) =>
	fireEvent.pointerEnter(trigger, { pointerType: 'mouse' })

const Basic = ({
	delayDuration,
	side,
	align,
}: {
	delayDuration?: number
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
}) => (
	<Tooltip delayDuration={delayDuration} side={side} align={align}>
		<TooltipTrigger>Save</TooltipTrigger>
		<TooltipContent>Saves your changes</TooltipContent>
	</Tooltip>
)

beforeEach(() => {
	vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
	vi.useRealTimers()
})

describe('Tooltip composition and roles', () => {
	it('renders the trigger as a button and no tooltip until opened', () => {
		render(<Basic />)
		expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('opens on focus with no delay', () => {
		render(<Basic delayDuration={700} />)
		fireEvent.focus(screen.getByRole('button', { name: 'Save' }))
		// Focus is deliberately not delayed — the delay exists to stop flicker as a
		// pointer sweeps a toolbar, which does not happen to focus.
		expect(screen.getByRole('tooltip')).toHaveTextContent('Saves your changes')
	})

	it('closes on blur', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		fireEvent.focus(trigger)
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
		fireEvent.blur(trigger)
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('describes the trigger only while open', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Save' })

		// A dangling `aria-describedby` — pointing at an id that is not in the document —
		// makes some screen readers announce nothing rather than skipping it.
		expect(trigger).not.toHaveAttribute('aria-describedby')

		fireEvent.focus(trigger)
		const describedBy = trigger.getAttribute('aria-describedby')
		expect(describedBy).toBeTruthy()
		expect(screen.getByRole('tooltip')).toHaveAttribute('id', describedBy)

		fireEvent.blur(trigger)
		expect(trigger).not.toHaveAttribute('aria-describedby')
	})

	it('reflects open state on the trigger for styling', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		expect(trigger).toHaveAttribute('data-state', 'closed')
		fireEvent.focus(trigger)
		expect(trigger).toHaveAttribute('data-state', 'open')
	})

	it('unmounts the tooltip when closed rather than hiding it', () => {
		render(<Basic />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		fireEvent.focus(trigger)
		const id = screen.getByRole('tooltip').id
		fireEvent.blur(trigger)
		expect(document.getElementById(id)).toBeNull()
	})
})

describe('Tooltip hover delay', () => {
	it('does not open before the delay elapses', () => {
		render(<Basic delayDuration={700} />)
		openTooltip(screen.getByRole('button', { name: 'Save' }))

		act(() => {
			vi.advanceTimersByTime(699)
		})
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		act(() => {
			vi.advanceTimersByTime(1)
		})
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('cancels the pending open if the pointer leaves first', () => {
		render(<Basic delayDuration={700} />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		openTooltip(trigger)
		fireEvent.pointerLeave(trigger, { pointerType: 'mouse' })

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('opens immediately when the delay is zero', () => {
		render(<Basic delayDuration={0} />)
		openTooltip(screen.getByRole('button', { name: 'Save' }))
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('ignores a touch pointer, which has no hover to speak of', () => {
		render(<Basic delayDuration={0} />)
		fireEvent.pointerEnter(screen.getByRole('button', { name: 'Save' }), {
			pointerType: 'touch',
		})
		// A tap fires pointerenter right before click; opening here would leave a tooltip
		// the user cannot dismiss.
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('closes on click, so the tooltip does not outlive the action', () => {
		render(<Basic delayDuration={0} />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		openTooltip(trigger)
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
		fireEvent.click(trigger)
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('closes on Escape', () => {
		render(<Basic delayDuration={0} />)
		fireEvent.focus(screen.getByRole('button', { name: 'Save' }))
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
		fireEvent.keyDown(document, { key: 'Escape' })
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('stays dismissed after Escape while the pointer rests on the trigger', () => {
		render(<Basic delayDuration={0} />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		openTooltip(trigger)
		fireEvent.keyDown(document, { key: 'Escape' })
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		// The real failure this pins: closing removes the tooltip from the top layer, the
		// browser re-hit-tests, and the trigger under the resting cursor receives a fresh
		// `pointerenter`. Without the dismissal latch that reopens it in the same frame and
		// Escape does nothing at all for a mouse user.
		openTooltip(trigger)
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('opens again once the pointer has left and returned', () => {
		render(<Basic delayDuration={0} />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		openTooltip(trigger)
		fireEvent.keyDown(document, { key: 'Escape' })

		fireEvent.pointerLeave(trigger, { pointerType: 'mouse' })
		act(() => {
			vi.advanceTimersByTime(200)
		})
		openTooltip(trigger)
		// Dismissal is not permanent — it lasts until hover is re-established, per APG.
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})
})

describe('TooltipProvider', () => {
	it('supplies the delay to tooltips beneath it', () => {
		render(
			<TooltipProvider delayDuration={500}>
				<Basic />
			</TooltipProvider>
		)
		openTooltip(screen.getByRole('button', { name: 'Save' }))

		act(() => {
			vi.advanceTimersByTime(499)
		})
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		act(() => {
			vi.advanceTimersByTime(1)
		})
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('lets an individual tooltip override the provider delay', () => {
		render(
			<TooltipProvider delayDuration={500}>
				<Basic delayDuration={0} />
			</TooltipProvider>
		)
		openTooltip(screen.getByRole('button', { name: 'Save' }))
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('opens the next tooltip instantly inside the skip window', () => {
		render(
			<TooltipProvider delayDuration={700} skipDelayDuration={300}>
				<Tooltip>
					<TooltipTrigger>First</TooltipTrigger>
					<TooltipContent>First tip</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>Second</TooltipTrigger>
					<TooltipContent>Second tip</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)

		const first = screen.getByRole('button', { name: 'First' })
		openTooltip(first)
		act(() => {
			vi.advanceTimersByTime(700)
		})
		expect(screen.getByText('First tip')).toBeInTheDocument()

		fireEvent.pointerLeave(first, { pointerType: 'mouse' })
		// Moving straight to a neighbour is one gesture, so the delay is not re-paid.
		openTooltip(screen.getByRole('button', { name: 'Second' }))
		expect(screen.getByText('Second tip')).toBeInTheDocument()
	})

	it('re-pays the delay once the skip window has expired', () => {
		render(
			<TooltipProvider delayDuration={700} skipDelayDuration={300}>
				<Tooltip>
					<TooltipTrigger>First</TooltipTrigger>
					<TooltipContent>First tip</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>Second</TooltipTrigger>
					<TooltipContent>Second tip</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)

		const first = screen.getByRole('button', { name: 'First' })
		openTooltip(first)
		act(() => {
			vi.advanceTimersByTime(700)
		})
		fireEvent.pointerLeave(first, { pointerType: 'mouse' })

		act(() => {
			vi.advanceTimersByTime(301)
		})
		openTooltip(screen.getByRole('button', { name: 'Second' }))
		expect(screen.queryByText('Second tip')).not.toBeInTheDocument()
	})

	it('works without a provider, using the default delay', () => {
		// Radix threw without a provider. A tooltip that silently refuses to open is a
		// worse failure than one that opens after the default delay.
		render(<Basic />)
		openTooltip(screen.getByRole('button', { name: 'Save' }))
		act(() => {
			vi.advanceTimersByTime(700)
		})
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})
})

describe('Tooltip controlled state', () => {
	it('renders open when controlled open', () => {
		render(
			<Tooltip open>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent>Saves your changes</TooltipContent>
			</Tooltip>
		)
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('does not drift when the owner ignores onOpenChange', () => {
		const onOpenChange = vi.fn()
		render(
			<Tooltip open={false} onOpenChange={onOpenChange} delayDuration={0}>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent>Saves your changes</TooltipContent>
			</Tooltip>
		)
		openTooltip(screen.getByRole('button', { name: 'Save' }))

		expect(onOpenChange).toHaveBeenCalledWith(true)
		// The owner rendered `open={false}` and ignored the request, so the tooltip stays
		// shut. Internal state is never written in controlled mode.
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('follows the owner when it does honour onOpenChange', () => {
		const Controlled = () => {
			const [open, setOpen] = useState(false)
			return (
				<Tooltip open={open} onOpenChange={setOpen} delayDuration={0}>
					<TooltipTrigger>Save</TooltipTrigger>
					<TooltipContent>Saves your changes</TooltipContent>
				</Tooltip>
			)
		}
		render(<Controlled />)
		openTooltip(screen.getByRole('button', { name: 'Save' }))
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('respects defaultOpen when uncontrolled', () => {
		render(
			<Tooltip defaultOpen>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent>Saves your changes</TooltipContent>
			</Tooltip>
		)
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})
})

describe('TooltipTrigger', () => {
	it('renders the consumer element with asChild, adding no button', () => {
		render(
			<Tooltip open>
				<TooltipTrigger asChild>
					<a href="#somewhere">Docs</a>
				</TooltipTrigger>
				<TooltipContent>Read the docs</TooltipContent>
			</Tooltip>
		)
		const link = screen.getByRole('link', { name: 'Docs' })
		expect(link.tagName).toBe('A')
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
		// The wiring has to land on the consumer's element, not a wrapper.
		expect(link).toHaveAttribute('aria-describedby')
	})

	it('keeps the consumer handler when asChild composes one', () => {
		const onFocus = vi.fn()
		render(
			<Tooltip>
				<TooltipTrigger asChild>
					<a href="#x" onFocus={onFocus}>
						Docs
					</a>
				</TooltipTrigger>
				<TooltipContent>Read the docs</TooltipContent>
			</Tooltip>
		)
		fireEvent.focus(screen.getByRole('link', { name: 'Docs' }))
		expect(onFocus).toHaveBeenCalled()
		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('is type=button so it never submits a form', () => {
		render(<Basic />)
		expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
			'type',
			'button'
		)
	})

	it('merges className and forwards a ref', () => {
		const ref = React.createRef<HTMLButtonElement>()
		render(
			<Tooltip>
				<TooltipTrigger ref={ref} className="custom">
					Save
				</TooltipTrigger>
				<TooltipContent>Tip</TooltipContent>
			</Tooltip>
		)
		const trigger = screen.getByRole('button', { name: 'Save' })
		expect(trigger).toHaveClass('custom')
		expect(trigger).toHaveClass(s.trigger)
		expect(ref.current).toBe(trigger)
	})

	it('forwards arbitrary HTML attributes', () => {
		render(
			<Tooltip>
				<TooltipTrigger data-testid="tt" aria-label="Save changes">
					Save
				</TooltipTrigger>
				<TooltipContent>Tip</TooltipContent>
			</Tooltip>
		)
		const trigger = screen.getByTestId('tt')
		expect(trigger).toHaveAttribute('aria-label', 'Save changes')
	})
})

describe('TooltipContent', () => {
	it('carries the side and align it will be positioned by', () => {
		render(<Basic side="right" align="start" delayDuration={0} />)
		fireEvent.focus(screen.getByRole('button', { name: 'Save' }))
		const tip = screen.getByRole('tooltip')
		// The stylesheet keys placement off these, so they are part of the contract even
		// though jsdom cannot act on them.
		expect(tip).toHaveAttribute('data-side', 'right')
		expect(tip).toHaveAttribute('data-align', 'start')
	})

	it('lets the content override the side set on the root', () => {
		render(
			<Tooltip side="top" defaultOpen>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent side="bottom">Tip</TooltipContent>
			</Tooltip>
		)
		expect(screen.getByRole('tooltip')).toHaveAttribute('data-side', 'bottom')
	})

	it('publishes the anchor name and offset as custom properties', () => {
		render(
			<Tooltip defaultOpen>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent sideOffset={12}>Tip</TooltipContent>
			</Tooltip>
		)
		const tip = screen.getByRole('tooltip')
		const trigger = screen.getByRole('button', { name: 'Save' })

		// Trigger and content must agree on the anchor, or CSS anchor positioning silently
		// falls back to the initial containing block and the tooltip lands in a corner.
		const anchor = tip.style.getPropertyValue('--cds-tooltip-anchor')
		expect(anchor).toMatch(/^--cds-tooltip-/)
		expect(trigger.style.getPropertyValue('--cds-tooltip-anchor')).toBe(anchor)
		expect(tip.style.getPropertyValue('--cds-tooltip-offset')).toBe('12px')
	})

	it('gives each tooltip on the page a distinct anchor name', () => {
		render(
			<TooltipProvider>
				<Tooltip defaultOpen>
					<TooltipTrigger>First</TooltipTrigger>
					<TooltipContent>First tip</TooltipContent>
				</Tooltip>
				<Tooltip defaultOpen>
					<TooltipTrigger>Second</TooltipTrigger>
					<TooltipContent>Second tip</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
		const [a, b] = screen.getAllByRole('tooltip')
		expect(a.style.getPropertyValue('--cds-tooltip-anchor')).not.toBe(
			b.style.getPropertyValue('--cds-tooltip-anchor')
		)
	})

	it('produces an anchor name that is a valid dashed-ident', () => {
		render(
			<Tooltip defaultOpen>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent>Tip</TooltipContent>
			</Tooltip>
		)
		const anchor = screen
			.getByRole('tooltip')
			.style.getPropertyValue('--cds-tooltip-anchor')
		// `useId()` returns `:r1:` — colons are not valid in a custom-ident, and would make
		// the whole `anchor-name` declaration invalid.
		expect(anchor).toMatch(/^--[a-zA-Z0-9_-]+$/)
	})

	it('merges className and forwards a ref', () => {
		const ref = React.createRef<HTMLDivElement>()
		render(
			<Tooltip defaultOpen>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent ref={ref} className="custom">
					Tip
				</TooltipContent>
			</Tooltip>
		)
		const tip = screen.getByRole('tooltip')
		expect(tip).toHaveClass('custom')
		expect(tip).toHaveClass(s.content)
		expect(ref.current).toBe(tip)
	})

	it('renders rich children', () => {
		render(
			<Tooltip defaultOpen>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent>
					<strong>Bold</strong> and <em>italic</em>
				</TooltipContent>
			</Tooltip>
		)
		const tip = screen.getByRole('tooltip')
		expect(tip.querySelector('strong')).toHaveTextContent('Bold')
		expect(tip.querySelector('em')).toHaveTextContent('italic')
	})

	it('never renders the popover attribute from JSX', () => {
		render(
			<Tooltip defaultOpen>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent>Tip</TooltipContent>
			</Tooltip>
		)
		// jsdom parses `popover` without implementing the API, so a rendered attribute
		// would leave the element `display: none` for the whole jsdom suite. The attribute
		// is set from the effect that calls `showPopover()`, and jsdom has neither.
		expect(screen.getByRole('tooltip')).not.toHaveAttribute('popover')
	})
})

describe('Tooltip hoverable content', () => {
	it('stays open while the pointer is over the tooltip', () => {
		render(<Basic delayDuration={0} />)
		const trigger = screen.getByRole('button', { name: 'Save' })
		openTooltip(trigger)
		const tip = screen.getByRole('tooltip')

		// Leaving the trigger only schedules the close. Without that grace the content
		// would unmount before the pointer could cross the `sideOffset` gap onto it, and
		// hoverable content would be unreachable in practice.
		fireEvent.pointerLeave(trigger, { pointerType: 'mouse' })
		fireEvent.pointerEnter(tip, { pointerType: 'mouse' })

		act(() => {
			vi.advanceTimersByTime(500)
		})
		expect(screen.getByRole('tooltip')).toBeInTheDocument()

		fireEvent.pointerLeave(tip, { pointerType: 'mouse' })
		act(() => {
			vi.advanceTimersByTime(200)
		})
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('closes on pointer-out when hoverable content is disabled', () => {
		render(
			<Tooltip delayDuration={0} disableHoverableContent>
				<TooltipTrigger>Save</TooltipTrigger>
				<TooltipContent>Tip</TooltipContent>
			</Tooltip>
		)
		const trigger = screen.getByRole('button', { name: 'Save' })
		openTooltip(trigger)
		fireEvent.pointerEnter(screen.getByRole('tooltip'), {
			pointerType: 'mouse',
		})
		fireEvent.pointerLeave(trigger, { pointerType: 'mouse' })
		act(() => {
			vi.advanceTimersByTime(200)
		})
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})
})

describe('Display names', () => {
	it('are set by hand, not inherited from a primitive', () => {
		expect(Tooltip.displayName).toBe('Tooltip')
		expect(TooltipProvider.displayName).toBe('TooltipProvider')
		expect(TooltipTrigger.displayName).toBe('TooltipTrigger')
		expect(TooltipContent.displayName).toBe('TooltipContent')
	})
})

describe('Usage errors', () => {
	it('names the offending component when used outside a Tooltip', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
		expect(() => render(<TooltipTrigger>Orphan</TooltipTrigger>)).toThrow(
			/`TooltipTrigger` must be rendered inside a `<Tooltip>`/
		)
		spy.mockRestore()
	})
})
