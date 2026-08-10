import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Checkbox } from '../checkbox'
import { axeViolations } from '../../../../test-utils'

/**
 * Added with the A.2 native-input migration — `Checkbox` had no axe coverage before.
 * `axeViolations` disables `color-contrast` and does not allow re-enabling it: jsdom has
 * no layout engine, so that rule can only produce a false pass. The checked-state contrast
 * between the mark and the interactive fill is checked in the Storybook a11y addon panel.
 */

describe('Checkbox accessibility', () => {
	it('has no violations when labelled by a native label', async () => {
		const { container } = render(
			<>
				<label htmlFor="terms">Accept terms</label>
				<Checkbox id="terms" name="terms" />
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when labelled by aria-label', async () => {
		const { container } = render(<Checkbox aria-label="Subscribe" />)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when checked', async () => {
		const { container } = render(
			<>
				<label htmlFor="terms">Accept terms</label>
				<Checkbox id="terms" defaultChecked />
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when indeterminate', async () => {
		const { container } = render(
			<>
				<label htmlFor="all">Select all</label>
				<Checkbox id="all" indeterminate />
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when disabled', async () => {
		const { container } = render(
			<>
				<label htmlFor="locked">Locked option</label>
				<Checkbox id="locked" disabled />
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when invalid and described by an error', async () => {
		const { container } = render(
			<>
				<label htmlFor="terms">Accept terms</label>
				<Checkbox
					id="terms"
					isInvalid
					required
					aria-describedby="terms-error"
				/>
				<span id="terms-error">You must accept the terms.</span>
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations for a group of checkboxes in a fieldset', async () => {
		// The shape a real form uses: native checkboxes sharing a name inside a grouped
		// fieldset, which is what replaces Radix's ad-hoc group wiring.
		const { container } = render(
			<form aria-label="Preferences">
				<fieldset>
					<legend>Email preferences</legend>
					{['Product news', 'Weekly digest', 'Event invites'].map((label, i) => (
						<React.Fragment key={label}>
							<label htmlFor={`pref-${i}`}>{label}</label>
							<Checkbox id={`pref-${i}`} name="prefs" value={label} />
						</React.Fragment>
					))}
				</fieldset>
			</form>
		)
		expect(await axeViolations(container)).toEqual([])
	})
})
