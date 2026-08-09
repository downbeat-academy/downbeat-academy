import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Switch } from '../switch'
import { axeViolations } from '../../../../test-utils'

/**
 * Added with the A.5 native-input migration — `Switch` had no axe coverage before.
 * `axeViolations` disables `color-contrast` and does not allow re-enabling it: jsdom has
 * no layout engine, so that rule can only produce a false pass. The thumb and check-mark
 * contrast against the track fill is checked in the Storybook a11y addon panel.
 */

describe('Switch accessibility', () => {
	it('has no violations when labelled by a native label', async () => {
		const { container } = render(
			<>
				<label htmlFor="notifications">Notifications</label>
				<Switch id="notifications" name="notifications" />
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when labelled by aria-label', async () => {
		const { container } = render(<Switch aria-label="Notifications" />)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when on', async () => {
		const { container } = render(
			<>
				<label htmlFor="notifications">Notifications</label>
				<Switch id="notifications" defaultChecked />
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when disabled', async () => {
		const { container } = render(
			<>
				<label htmlFor="locked">Locked setting</label>
				<Switch id="locked" disabled />
			</>
		)
		expect(await axeViolations(container)).toEqual([])
	})

	it('has no violations when invalid and described by an error', async () => {
		const { container } = render(
			<>
				<label htmlFor="terms">Accept terms</label>
				<Switch
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

	it('has no violations for a settings list of switches', async () => {
		// The shape the form stories use: several labelled switches inside a form.
		const settings = ['Notifications', 'Marketing email', 'Public profile']
		const { container } = render(
			<form aria-label="Settings">
				<fieldset>
					<legend>Preferences</legend>
					{settings.map((label, i) => (
						<React.Fragment key={label}>
							<label htmlFor={`setting-${i}`}>{label}</label>
							<Switch id={`setting-${i}`} name={`setting-${i}`} />
						</React.Fragment>
					))}
				</fieldset>
			</form>
		)
		expect(await axeViolations(container)).toEqual([])
	})
})
