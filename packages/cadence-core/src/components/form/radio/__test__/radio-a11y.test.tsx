import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { RadioGroup, Radio } from '../radio'
import { axeViolations } from '../../../../test-utils'

/**
 * Added with the A.3 native-input migration — `Radio` had no axe coverage before.
 * `axeViolations` disables `color-contrast` and does not allow re-enabling it: jsdom has
 * no layout engine, so that rule can only produce a false pass. The contrast of the dot
 * against the interactive fill is checked in the Storybook a11y addon panel.
 */

const PLANS = [
	{ value: 'free', label: 'Free' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'team', label: 'Team' },
]

describe('RadioGroup accessibility', () => {
	it('has no violations with native labels', async () => {
		const { container } = render(
			<RadioGroup aria-label="Plan" name="plan">
				{PLANS.map(({ value, label }) => (
					<React.Fragment key={value}>
						<label htmlFor={`plan-${value}`}>{label}</label>
						<Radio value={value} id={`plan-${value}`} />
					</React.Fragment>
				))}
			</RadioGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when labelled by a heading via aria-labelledby', async () => {
		const { container } = render(
			<>
				<h2 id="plan-heading">Choose a plan</h2>
				<RadioGroup aria-labelledby="plan-heading" name="plan">
					{PLANS.map(({ value, label }) => (
						<React.Fragment key={value}>
							<label htmlFor={`lbl-${value}`}>{label}</label>
							<Radio value={value} id={`lbl-${value}`} />
						</React.Fragment>
					))}
				</RadioGroup>
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with a selection', async () => {
		const { container } = render(
			<RadioGroup aria-label="Plan" name="plan" defaultValue="pro">
				{PLANS.map(({ value, label }) => (
					<React.Fragment key={value}>
						<label htmlFor={`sel-${value}`}>{label}</label>
						<Radio value={value} id={`sel-${value}`} />
					</React.Fragment>
				))}
			</RadioGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when disabled', async () => {
		const { container } = render(
			<RadioGroup aria-label="Plan" name="plan" disabled>
				<label htmlFor="dis-free">Free</label>
				<Radio value="free" id="dis-free" />
			</RadioGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when required, invalid and described by an error', async () => {
		const { container } = render(
			<RadioGroup
				aria-label="Plan"
				name="plan"
				required
				aria-describedby="plan-error"
			>
				{PLANS.map(({ value, label }) => (
					<React.Fragment key={value}>
						<label htmlFor={`err-${value}`}>{label}</label>
						<Radio value={value} id={`err-${value}`} isInvalid />
					</React.Fragment>
				))}
				<span id="plan-error">Choose a plan to continue.</span>
			</RadioGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations for a horizontal group inside a fieldset', async () => {
		const { container } = render(
			<form aria-label="Signup">
				<fieldset>
					<legend>Choose a plan</legend>
					<RadioGroup aria-label="Plan" name="plan" orientation="horizontal">
						{PLANS.map(({ value, label }) => (
							<React.Fragment key={value}>
								<label htmlFor={`fs-${value}`}>{label}</label>
								<Radio value={value} id={`fs-${value}`} />
							</React.Fragment>
						))}
					</RadioGroup>
				</fieldset>
			</form>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with two independent groups on one page', async () => {
		const { container } = render(
			<>
				<RadioGroup aria-label="Plan">
					<label htmlFor="g1-a">Free</label>
					<Radio value="free" id="g1-a" />
				</RadioGroup>
				<RadioGroup aria-label="Billing period">
					<label htmlFor="g2-a">Monthly</label>
					<Radio value="monthly" id="g2-a" />
				</RadioGroup>
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})
})
