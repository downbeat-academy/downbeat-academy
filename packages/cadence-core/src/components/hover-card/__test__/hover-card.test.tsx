import React, { useState } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
	HoverCardTitle,
	HoverCardMain,
	HoverCardFooter,
} from '../index'
import s from '../hover-card.module.css'

/**
 * The markup-and-wiring half of `HoverCard`'s contract. Placement lives in
 * `hover-card.browser.test.tsx`.
 *
 * The previous 576-line suite is not carried over wholesale, for the same reason the
 * tooltip's was not: seven of its assertions were `not.toThrow()`, which passes against an
 * empty component, and `renders within a Portal` checked no portal. The parts that did
 * assert something — the `Title`/`Main`/`Footer` subcomponents, `hasIcon`, `asChild` —
 * are kept and extended.
 *
 * What is genuinely different from `Tooltip`, and is what this file exists to pin: the
 * card is **interactive**. Every pointer-out path must schedule rather than close, or the
 * links inside it are unreachable.
 */

const hover = (el: HTMLElement) =>
	fireEvent.pointerEnter(el, { pointerType: 'mouse' })
const unhover = (el: HTMLElement) =>
	fireEvent.pointerLeave(el, { pointerType: 'mouse' })

const Basic = ({
	openDelay,
	closeDelay,
}: {
	openDelay?: number
	closeDelay?: number
}) => (
	<HoverCard openDelay={openDelay} closeDelay={closeDelay}>
		<HoverCardTrigger>Glossary term</HoverCardTrigger>
		<HoverCardContent>
			<HoverCardTitle>Term</HoverCardTitle>
			<HoverCardMain>A definition.</HoverCardMain>
			<HoverCardFooter>
				<a href="#more">Learn more</a>
			</HoverCardFooter>
		</HoverCardContent>
	</HoverCard>
)

beforeEach(() => {
	vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
	vi.useRealTimers()
})

describe('HoverCard composition and roles', () => {
	it('renders nothing until opened', () => {
		render(<Basic />)
		expect(screen.getByText('Glossary term')).toBeInTheDocument()
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('is a dialog, not a tooltip', () => {
		render(<Basic openDelay={0} />)
		hover(screen.getByText('Glossary term'))
		// A tooltip is a plain description whose contents are unreachable. This holds
		// links and is meant to be entered, so `role="tooltip"` would misdescribe it.
		expect(screen.getByRole('dialog')).toBeInTheDocument()
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('is named by its trigger', () => {
		render(<Basic openDelay={0} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		const card = screen.getByRole('dialog')
		expect(card).toHaveAttribute('aria-labelledby', trigger.id)
		expect(trigger.id).toBeTruthy()
	})

	it('describes the trigger only while open', () => {
		render(<Basic openDelay={0} />)
		const trigger = screen.getByText('Glossary term')
		expect(trigger).not.toHaveAttribute('aria-describedby')

		hover(trigger)
		expect(trigger.getAttribute('aria-describedby')).toBe(
			screen.getByRole('dialog').id
		)
	})

	it('reflects open state on the trigger for styling', () => {
		render(<Basic openDelay={0} />)
		const trigger = screen.getByText('Glossary term')
		expect(trigger).toHaveAttribute('data-state', 'closed')
		hover(trigger)
		expect(trigger).toHaveAttribute('data-state', 'open')
	})

	it('publishes a distinct anchor name shared by trigger and card', () => {
		render(<Basic openDelay={0} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		const card = screen.getByRole('dialog')

		const anchor = card.style.getPropertyValue('--cds-hover-card-anchor')
		expect(anchor).toMatch(/^--cds-hover-card-[a-zA-Z0-9_-]+$/)
		expect(trigger.style.getPropertyValue('--cds-hover-card-anchor')).toBe(
			anchor
		)
	})

	it('never renders the popover attribute from JSX', () => {
		render(<Basic openDelay={0} />)
		hover(screen.getByText('Glossary term'))
		// jsdom parses `popover` without implementing the API, which would leave the card
		// `display: none` for the whole jsdom project.
		expect(screen.getByRole('dialog')).not.toHaveAttribute('popover')
	})
})

describe('HoverCard timing', () => {
	it('waits openDelay before opening on hover', () => {
		render(<Basic openDelay={300} />)
		hover(screen.getByText('Glossary term'))

		act(() => {
			vi.advanceTimersByTime(299)
		})
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

		act(() => {
			vi.advanceTimersByTime(1)
		})
		expect(screen.getByRole('dialog')).toBeInTheDocument()
	})

	it('cancels a pending open when the pointer leaves first', () => {
		render(<Basic openDelay={300} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		unhover(trigger)

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		// Sweeping across a trigger must never produce a card a moment later.
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('waits closeDelay before closing', () => {
		render(<Basic openDelay={0} closeDelay={150} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		unhover(trigger)

		act(() => {
			vi.advanceTimersByTime(149)
		})
		expect(screen.getByRole('dialog')).toBeInTheDocument()

		act(() => {
			vi.advanceTimersByTime(1)
		})
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('stays open when the pointer moves onto the card', () => {
		render(<Basic openDelay={0} closeDelay={150} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		const card = screen.getByRole('dialog')

		// This is the whole difference from a tooltip. The pointer has to cross the
		// `sideOffset` gap, so it leaves the trigger before it arrives on the card; closing
		// on that `pointerleave` would make the card's links unreachable.
		unhover(trigger)
		hover(card)

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(screen.getByRole('dialog')).toBeInTheDocument()
	})

	it('closes once the pointer leaves the card too', () => {
		render(<Basic openDelay={0} closeDelay={150} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		const card = screen.getByRole('dialog')
		unhover(trigger)
		hover(card)
		unhover(card)

		act(() => {
			vi.advanceTimersByTime(200)
		})
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('ignores touch pointers', () => {
		render(<Basic openDelay={0} />)
		fireEvent.pointerEnter(screen.getByText('Glossary term'), {
			pointerType: 'touch',
		})
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('closes on Escape', () => {
		render(<Basic openDelay={0} />)
		hover(screen.getByText('Glossary term'))
		expect(screen.getByRole('dialog')).toBeInTheDocument()
		fireEvent.keyDown(document, { key: 'Escape' })
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('stays dismissed after Escape while the pointer rests on the trigger', () => {
		render(<Basic openDelay={0} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		fireEvent.keyDown(document, { key: 'Escape' })

		// Same failure mode as `Tooltip`: leaving the top layer makes the browser
		// re-hit-test, and the trigger under the resting cursor gets a fresh
		// `pointerenter` that would reopen the card immediately.
		hover(trigger)
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('opens again once the pointer has left and returned', () => {
		render(<Basic openDelay={0} closeDelay={150} />)
		const trigger = screen.getByText('Glossary term')
		hover(trigger)
		fireEvent.keyDown(document, { key: 'Escape' })

		unhover(trigger)
		act(() => {
			vi.advanceTimersByTime(200)
		})
		hover(trigger)
		expect(screen.getByRole('dialog')).toBeInTheDocument()
	})
})

describe('HoverCard keyboard access', () => {
	it('opens on focus and keeps the card open while focus is inside it', () => {
		render(<Basic openDelay={0} closeDelay={150} />)
		const trigger = screen.getByText('Glossary term')
		fireEvent.focus(trigger)
		const card = screen.getByRole('dialog')

		// Focus leaving the trigger for the card must not close it, or the card's links
		// could never be reached by keyboard at all.
		fireEvent.blur(trigger)
		fireEvent.focus(card)

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(screen.getByRole('dialog')).toBeInTheDocument()
	})

	it('does not close when focus moves between elements inside the card', () => {
		render(
			<HoverCard openDelay={0} closeDelay={150}>
				<HoverCardTrigger>Term</HoverCardTrigger>
				<HoverCardContent>
					<a href="#one">One</a>
					<a href="#two">Two</a>
				</HoverCardContent>
			</HoverCard>
		)
		fireEvent.focus(screen.getByText('Term'))
		const card = screen.getByRole('dialog')
		const [one, two] = screen.getAllByRole('link')

		fireEvent.blur(card, { relatedTarget: two })
		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(screen.getByRole('dialog')).toBeInTheDocument()
		expect(one).toBeInTheDocument()
	})

	it('closes when focus leaves the card entirely', () => {
		render(
			<>
				<Basic openDelay={0} closeDelay={150} />
				<button type="button">Elsewhere</button>
			</>
		)
		fireEvent.focus(screen.getByText('Glossary term'))
		const card = screen.getByRole('dialog')
		fireEvent.blur(card, {
			relatedTarget: screen.getByRole('button', { name: 'Elsewhere' }),
		})

		act(() => {
			vi.advanceTimersByTime(200)
		})
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})
})

describe('HoverCardTrigger', () => {
	it('renders the consumer element with asChild, adding no wrapper', () => {
		render(
			<HoverCard defaultOpen>
				<HoverCardTrigger asChild>
					<a href="#term">Glossary term</a>
				</HoverCardTrigger>
				<HoverCardContent>Definition</HoverCardContent>
			</HoverCard>
		)
		const link = screen.getByRole('link', { name: 'Glossary term' })
		expect(link.tagName).toBe('A')
		// `asChild` is a documented part of this component's public API — the only place in
		// the package where that is true. `handbook-reference.tsx` in `www` depends on it.
		expect(link).toHaveAttribute('aria-describedby')
		expect(link).toHaveAttribute('data-state', 'open')
	})

	it('shows the icon when hasIcon is set', () => {
		render(
			<HoverCard>
				<HoverCardTrigger hasIcon>Term</HoverCardTrigger>
				<HoverCardContent>Definition</HoverCardContent>
			</HoverCard>
		)
		expect(
			screen.getByLabelText('More information available')
		).toBeInTheDocument()
	})

	it('omits the icon by default', () => {
		render(<Basic />)
		expect(
			screen.queryByLabelText('More information available')
		).not.toBeInTheDocument()
	})

	it('takes a custom icon label', () => {
		render(
			<HoverCard>
				<HoverCardTrigger hasIcon iconAriaLabel="What is this?">
					Term
				</HoverCardTrigger>
				<HoverCardContent>Definition</HoverCardContent>
			</HoverCard>
		)
		expect(screen.getByLabelText('What is this?')).toBeInTheDocument()
	})

	it('never renders the icon under asChild, which owns its own content', () => {
		render(
			<HoverCard>
				<HoverCardTrigger asChild hasIcon>
					<a href="#term">Term</a>
				</HoverCardTrigger>
				<HoverCardContent>Definition</HoverCardContent>
			</HoverCard>
		)
		expect(
			screen.queryByLabelText('More information available')
		).not.toBeInTheDocument()
	})

	it('merges className and forwards a ref', () => {
		const ref = React.createRef<HTMLAnchorElement>()
		render(
			<HoverCard>
				<HoverCardTrigger ref={ref} className="custom">
					Term
				</HoverCardTrigger>
				<HoverCardContent>Definition</HoverCardContent>
			</HoverCard>
		)
		const trigger = screen.getByText('Term')
		expect(trigger).toHaveClass('custom')
		expect(trigger).toHaveClass(s.trigger)
		expect(ref.current).toBe(trigger)
	})
})

describe('HoverCardContent', () => {
	it('carries the side and align it will be positioned by', () => {
		render(
			<HoverCard side="right" align="start" defaultOpen>
				<HoverCardTrigger>Term</HoverCardTrigger>
				<HoverCardContent>Definition</HoverCardContent>
			</HoverCard>
		)
		const card = screen.getByRole('dialog')
		expect(card).toHaveAttribute('data-side', 'right')
		expect(card).toHaveAttribute('data-align', 'start')
	})

	it('lets the content override the side set on the root', () => {
		render(
			<HoverCard side="top" defaultOpen>
				<HoverCardTrigger>Term</HoverCardTrigger>
				<HoverCardContent side="bottom">Definition</HoverCardContent>
			</HoverCard>
		)
		expect(screen.getByRole('dialog')).toHaveAttribute('data-side', 'bottom')
	})

	it('publishes the offset as a custom property', () => {
		render(
			<HoverCard defaultOpen>
				<HoverCardTrigger>Term</HoverCardTrigger>
				<HoverCardContent sideOffset={16}>Definition</HoverCardContent>
			</HoverCard>
		)
		expect(
			screen
				.getByRole('dialog')
				.style.getPropertyValue('--cds-hover-card-offset')
		).toBe('16px')
	})

	it('merges className and forwards a ref', () => {
		const ref = React.createRef<HTMLDivElement>()
		render(
			<HoverCard defaultOpen>
				<HoverCardTrigger>Term</HoverCardTrigger>
				<HoverCardContent ref={ref} className="custom">
					Definition
				</HoverCardContent>
			</HoverCard>
		)
		const card = screen.getByRole('dialog')
		expect(card).toHaveClass('custom')
		expect(card).toHaveClass(s.content)
		expect(ref.current).toBe(card)
	})
})

describe('HoverCard controlled state', () => {
	it('does not drift when the owner ignores onOpenChange', () => {
		const onOpenChange = vi.fn()
		render(
			<HoverCard open={false} onOpenChange={onOpenChange} openDelay={0}>
				<HoverCardTrigger>Term</HoverCardTrigger>
				<HoverCardContent>Definition</HoverCardContent>
			</HoverCard>
		)
		hover(screen.getByText('Term'))

		expect(onOpenChange).toHaveBeenCalledWith(true)
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('follows an owner that honours onOpenChange', () => {
		const Controlled = () => {
			const [open, setOpen] = useState(false)
			return (
				<HoverCard open={open} onOpenChange={setOpen} openDelay={0}>
					<HoverCardTrigger>Term</HoverCardTrigger>
					<HoverCardContent>Definition</HoverCardContent>
				</HoverCard>
			)
		}
		render(<Controlled />)
		hover(screen.getByText('Term'))
		expect(screen.getByRole('dialog')).toBeInTheDocument()
	})
})

describe('HoverCard subcomponents', () => {
	it('render as divs carrying their own class', () => {
		render(
			<HoverCard defaultOpen>
				<HoverCardTrigger>Term</HoverCardTrigger>
				<HoverCardContent>
					<HoverCardTitle className="t">Title</HoverCardTitle>
					<HoverCardMain className="m">Main</HoverCardMain>
					<HoverCardFooter className="f">Footer</HoverCardFooter>
				</HoverCardContent>
			</HoverCard>
		)
		const title = screen.getByText('Title')
		const main = screen.getByText('Main')
		const footer = screen.getByText('Footer')

		expect(title.tagName).toBe('DIV')
		expect(main.tagName).toBe('DIV')
		expect(footer.tagName).toBe('DIV')
		expect(title).toHaveClass('t', s.title)
		expect(main).toHaveClass('m', s.main)
		expect(footer).toHaveClass('f', s.footer)
	})
})

describe('Display names', () => {
	it('are set by hand, not inherited from a primitive', () => {
		expect(HoverCard.displayName).toBe('HoverCard')
		expect(HoverCardTrigger.displayName).toBe('HoverCardTrigger')
		expect(HoverCardContent.displayName).toBe('HoverCardContent')
	})
})

describe('Usage errors', () => {
	it('names the offending component when used outside a HoverCard', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
		expect(() => render(<HoverCardTrigger>Orphan</HoverCardTrigger>)).toThrow(
			/`HoverCardTrigger` must be rendered inside a `<HoverCard>`/
		)
		spy.mockRestore()
	})
})
