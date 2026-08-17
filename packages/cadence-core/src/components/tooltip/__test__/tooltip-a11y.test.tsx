import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { axeViolations } from '../../../test-utils'
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from '../index'

/**
 * `Tooltip` had no a11y spec before this migration — one of the gaps the 0.3 backfill
 * flagged but did not close for this component.
 */
describe('Tooltip accessibility', () => {
	it('has no violations while closed', async () => {
		const { container } = render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>Save</TooltipTrigger>
					<TooltipContent>Saves your changes</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations while open', async () => {
		const { container } = render(
			<TooltipProvider>
				<Tooltip defaultOpen>
					<TooltipTrigger>Save</TooltipTrigger>
					<TooltipContent>Saves your changes</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with an asChild trigger', async () => {
		const { container } = render(
			<TooltipProvider>
				<Tooltip defaultOpen>
					<TooltipTrigger asChild>
						<a href="#docs">Docs</a>
					</TooltipTrigger>
					<TooltipContent>Read the documentation</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('exposes the tooltip as the trigger description, not as its name', async () => {
		render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>Save</TooltipTrigger>
					<TooltipContent>Saves your changes</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
		const trigger = screen.getByRole('button', { name: 'Save' })
		fireEvent.focus(trigger)

		// The accessible name stays the trigger's own text; the tooltip is supplementary.
		// A tooltip that replaced the name would leave a screen reader announcing the
		// description twice and the label never.
		expect(screen.getByRole('button', { name: 'Save' })).toBe(trigger)
		expect(trigger.getAttribute('aria-describedby')).toBe(
			screen.getByRole('tooltip').id
		)
	})
})
