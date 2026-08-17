import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from 'vitest/browser'
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
	HoverCardMain,
} from '../index'

/**
 * Placement, which jsdom cannot compute.
 *
 * As with `Tooltip`, these assert geometry rather than mechanism, so one set of
 * expectations covers both placement paths — CSS anchor positioning on Chromium and
 * Firefox, the JS fallback on WebKit, which has none below Safari 26.
 */

/** See the note on the same constant in `tooltip.browser.test.tsx`. */
const CLOSE_ENOUGH = 6

afterEach(() => {
	const active = document.activeElement
	if (active instanceof HTMLElement) active.blur()
})

const near = (actual: number, expected: number, label: string) => {
	expect(
		Math.abs(actual - expected),
		`${label}: expected ~${expected}, got ${actual}`
	).toBeLessThanOrEqual(CLOSE_ENOUGH)
}

const settled = async (el: Element) => {
	await Promise.all(el.getAnimations().map((a) => a.finished))
}

const Fixture = ({
	side,
	align,
	sideOffset,
}: {
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
}) => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh',
		}}
	>
		<HoverCard openDelay={0} closeDelay={150} side={side} align={align}>
			<HoverCardTrigger style={{ width: 140, height: 32 }}>
				Glossary term
			</HoverCardTrigger>
			<HoverCardContent sideOffset={sideOffset}>
				<HoverCardMain>
					<a href="#more">Learn more</a>
				</HoverCardMain>
			</HoverCardContent>
		</HoverCard>
	</div>
)

const open = async () => {
	const trigger = screen.getByText('Glossary term')
	await userEvent.hover(trigger)
	const card = await screen.findByRole('dialog')
	await settled(card)
	return {
		trigger: trigger.getBoundingClientRect(),
		card: card.getBoundingClientRect(),
		cardEl: card,
		triggerEl: trigger,
	}
}

describe('HoverCard placement', () => {
	it('sits above the trigger, centred, by default', async () => {
		render(<Fixture />)
		const { trigger, card } = await open()
		near(card.bottom, trigger.top - 4, 'gap above trigger')
		near(
			card.left + card.width / 2,
			trigger.left + trigger.width / 2,
			'horizontal centre'
		)
	})

	it('honours sideOffset', async () => {
		render(<Fixture sideOffset={24} />)
		const { trigger, card } = await open()
		near(card.bottom, trigger.top - 24, 'gap above trigger')
	})

	it('places below', async () => {
		render(<Fixture side="bottom" />)
		const { trigger, card } = await open()
		near(card.top, trigger.bottom + 4, 'gap below trigger')
	})

	it('places to the right', async () => {
		render(<Fixture side="right" />)
		const { trigger, card } = await open()
		near(card.left, trigger.right + 4, 'gap right of trigger')
	})

	it('aligns to the start edge', async () => {
		render(<Fixture side="bottom" align="start" />)
		const { trigger, card } = await open()
		near(card.left, trigger.left, 'start-aligned left edge')
	})

	it('is on screen with real dimensions', async () => {
		render(<Fixture />)
		const { card } = await open()
		expect(card.width).toBeGreaterThan(0)
		expect(card.height).toBeGreaterThan(0)
		expect(card.top).toBeGreaterThanOrEqual(0)
		expect(card.left).toBeGreaterThanOrEqual(0)
	})
})

describe('HoverCard interactivity', () => {
	it('can be entered with the pointer without closing', async () => {
		render(<Fixture />)
		const { cardEl } = await open()

		// The behaviour that separates a hover card from a tooltip. The pointer leaves the
		// trigger to cross the `sideOffset` gap, so the close is scheduled and must be
		// cancelled on arrival — otherwise this link could never be clicked.
		const link = screen.getByRole('link', { name: 'Learn more' })
		await userEvent.hover(link)

		await new Promise((r) => setTimeout(r, 300))
		expect(cardEl).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument()
	})

	it('closes once the pointer leaves both trigger and card', async () => {
		render(
			<>
				<button type="button" style={{ position: 'fixed', top: 0, left: 0 }}>
					Away
				</button>
				<Fixture />
			</>
		)
		const { cardEl } = await open()
		const id = cardEl.id

		await userEvent.hover(screen.getByRole('button', { name: 'Away' }))
		await waitFor(() => expect(document.getElementById(id)).toBeNull())
	})

	it('is promoted into the top layer', async () => {
		render(<Fixture />)
		const { cardEl } = await open()
		if (typeof (cardEl as HTMLElement).showPopover !== 'function') return
		expect(cardEl.matches(':popover-open')).toBe(true)
	})
})
