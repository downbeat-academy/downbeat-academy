import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axeViolations } from '../../../test-utils'
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
	HoverCardTitle,
	HoverCardMain,
	HoverCardFooter,
} from '../index'

/** `HoverCard` had no a11y spec before this migration. */
describe('HoverCard accessibility', () => {
	const Full = ({ open }: { open?: boolean }) => (
		<HoverCard defaultOpen={open}>
			<HoverCardTrigger hasIcon>Glossary term</HoverCardTrigger>
			<HoverCardContent>
				<HoverCardTitle>Term</HoverCardTitle>
				<HoverCardMain>A definition of the term.</HoverCardMain>
				<HoverCardFooter>
					<a href="#more">Learn more</a>
				</HoverCardFooter>
			</HoverCardContent>
		</HoverCard>
	)

	it('has no violations while closed', async () => {
		const { container } = render(<Full />)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations while open', async () => {
		const { container } = render(<Full open />)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with an asChild trigger', async () => {
		const { container } = render(
			<HoverCard defaultOpen>
				<HoverCardTrigger asChild>
					<a href="#term">Glossary term</a>
				</HoverCardTrigger>
				<HoverCardContent>
					<HoverCardMain>A definition.</HoverCardMain>
				</HoverCardContent>
			</HoverCard>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('gives the dialog an accessible name from its trigger', async () => {
		render(<Full open />)
		const card = screen.getByRole('dialog')
		const trigger = screen.getByText('Glossary term')

		// A `role="dialog"` with no accessible name is an axe violation in its own right,
		// and leaves a screen reader announcing "dialog" and nothing else.
		expect(card).toHaveAttribute('aria-labelledby', trigger.id)
		expect(document.getElementById(trigger.id)).toBe(trigger)
	})

	it('keeps the icon out of the trigger name when it carries one', async () => {
		render(<Full />)
		// The icon is supplementary; the trigger's name is still its text.
		expect(screen.getByText('Glossary term')).toBeInTheDocument()
		expect(
			screen.getByLabelText('More information available')
		).toBeInTheDocument()
	})
})
