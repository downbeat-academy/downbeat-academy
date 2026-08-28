import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { CheckboxCardGroup, CheckboxCardItem } from '../index'
import { axeViolations } from '../../../../test-utils'

/**
 * Added with the accessibility fix, mirroring `radio-card-a11y.test.tsx`. `CheckboxCardItem`
 * previously had no axe coverage at all, which is part of how it repeated a defect that had
 * already been found and fixed once in `radio-card`.
 *
 * `axeViolations` disables `color-contrast` and does not allow re-enabling it — jsdom has
 * no layout engine, so that rule can only produce a false pass. Card contrast in the
 * selected, indeterminate and disabled states is checked in the Storybook a11y addon panel.
 */

const FEATURES = [
	{ value: 'analytics', title: 'Analytics' },
	{ value: 'exports', title: 'Exports' },
	{ value: 'webhooks', title: 'Webhooks' },
]

describe('CheckboxCardGroup accessibility', () => {
	it('has no violations in its default state', async () => {
		const { container } = render(
			<CheckboxCardGroup aria-label="Features" name="features">
				{FEATURES.map((f) => (
					<CheckboxCardItem key={f.value} value={f.value} title={f.title} />
				))}
			</CheckboxCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with a selection', async () => {
		const { container } = render(
			<CheckboxCardGroup aria-label="Features" name="features" value={['exports']}>
				{FEATURES.map((f) => (
					<CheckboxCardItem key={f.value} value={f.value} title={f.title} />
				))}
			</CheckboxCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when disabled', async () => {
		const { container } = render(
			<CheckboxCardGroup aria-label="Features" name="features" disabled>
				{FEATURES.map((f) => (
					<CheckboxCardItem key={f.value} value={f.value} title={f.title} />
				))}
			</CheckboxCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when required, invalid and described by an error', async () => {
		const { container } = render(
			<CheckboxCardGroup
				aria-label="Features"
				name="features"
				required
				isInvalid
				aria-describedby="features-error"
			>
				{FEATURES.map((f) => (
					<CheckboxCardItem key={f.value} value={f.value} title={f.title} />
				))}
				<span id="features-error">Choose at least one feature to continue.</span>
			</CheckboxCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations with icons, badges and rich content', async () => {
		const { container } = render(
			<CheckboxCardGroup aria-label="Features" name="features" columns={3}>
				{FEATURES.map((f) => (
					<CheckboxCardItem
						key={f.value}
						value={f.value}
						title={f.title}
						icon={<svg aria-hidden="true" focusable="false" />}
						badge={<span>New</span>}
					>
						<span>Available on every plan.</span>
					</CheckboxCardItem>
				))}
			</CheckboxCardGroup>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when labelled by a heading', async () => {
		const { container } = render(
			<>
				<h2 id="features-heading">Choose your features</h2>
				<CheckboxCardGroup aria-labelledby="features-heading" name="features">
					{FEATURES.map((f) => (
						<CheckboxCardItem key={f.value} value={f.value} title={f.title} />
					))}
				</CheckboxCardGroup>
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations inside a form and fieldset', async () => {
		const { container } = render(
			<form aria-label="Signup">
				<fieldset>
					<legend>Choose your features</legend>
					<CheckboxCardGroup
						aria-label="Features"
						name="features"
						orientation="horizontal"
					>
						{FEATURES.map((f) => (
							<CheckboxCardItem key={f.value} value={f.value} title={f.title} />
						))}
					</CheckboxCardGroup>
				</fieldset>
			</form>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations for a standalone card in the mixed state', async () => {
		const { container } = render(
			<CheckboxCardItem
				value="analytics"
				title="Analytics"
				checked="indeterminate"
				aria-label="Analytics"
			/>
		)
		expect(await axeViolations(container)).toEqual([])
	})
})
