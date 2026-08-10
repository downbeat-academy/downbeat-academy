import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { RadioCardGroup, RadioCardItem } from '../index'
import { axeViolations } from '../../../../test-utils'

/**
 * Added with the A.4 accessibility fix. `RadioCardItem` previously had no axe coverage at
 * all, which is part of how a shipped defect this size went unnoticed.
 *
 * `axeViolations` disables `color-contrast` and does not allow re-enabling it — jsdom has
 * no layout engine, so that rule can only produce a false pass. Card contrast in the
 * selected and disabled states is checked in the Storybook a11y addon panel.
 */

const PLANS = [
	{ value: 'free', title: 'Free' },
	{ value: 'pro', title: 'Pro' },
	{ value: 'team', title: 'Team' },
]

describe('RadioCardGroup accessibility', () => {
	it('has no violations in its default state', async () => {
		const { container } = render(
			<RadioCardGroup aria-label="Plan" name="plan">
				{PLANS.map((p) => (
					<RadioCardItem key={p.value} value={p.value} title={p.title} />
				))}
			</RadioCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with a selection', async () => {
		const { container } = render(
			<RadioCardGroup aria-label="Plan" name="plan" value="pro">
				{PLANS.map((p) => (
					<RadioCardItem key={p.value} value={p.value} title={p.title} />
				))}
			</RadioCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when disabled', async () => {
		const { container } = render(
			<RadioCardGroup aria-label="Plan" name="plan" disabled>
				{PLANS.map((p) => (
					<RadioCardItem key={p.value} value={p.value} title={p.title} />
				))}
			</RadioCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when required, invalid and described by an error', async () => {
		const { container } = render(
			<RadioCardGroup
				aria-label="Plan"
				name="plan"
				required
				isInvalid
				aria-describedby="plan-error"
			>
				{PLANS.map((p) => (
					<RadioCardItem key={p.value} value={p.value} title={p.title} />
				))}
				<span id="plan-error">Choose a plan to continue.</span>
			</RadioCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with icons, badges and rich content', async () => {
		const { container } = render(
			<RadioCardGroup aria-label="Plan" name="plan" columns={3}>
				{PLANS.map((p) => (
					<RadioCardItem
						key={p.value}
						value={p.value}
						title={p.title}
						icon={<svg aria-hidden="true" focusable="false" />}
						badge={<span>Popular</span>}
					>
						<span>Everything in the tier below, plus more.</span>
					</RadioCardItem>
				))}
			</RadioCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when labelled by a heading', async () => {
		const { container } = render(
			<>
				<h2 id="plan-heading">Choose a plan</h2>
				<RadioCardGroup aria-labelledby="plan-heading" name="plan">
					{PLANS.map((p) => (
						<RadioCardItem key={p.value} value={p.value} title={p.title} />
					))}
				</RadioCardGroup>
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations inside a form and fieldset', async () => {
		const { container } = render(
			<form aria-label="Signup">
				<fieldset>
					<legend>Choose a plan</legend>
					<RadioCardGroup aria-label="Plan" name="plan" orientation="horizontal">
						{PLANS.map((p) => (
							<RadioCardItem key={p.value} value={p.value} title={p.title} />
						))}
					</RadioCardGroup>
				</fieldset>
			</form>
		)
		expect(await axeViolations(container)).toEqual([])
	})
})
