import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../switch'
import s from '../switch.module.css'
import {
	declaredRule,
	declaredSelectors,
} from '../../../../test-utils'

/**
 * Rewritten for Radix A.5. The previous suite asserted `aria-checked` and
 * `onCheckedChange` — the Radix surface. A native switch is an `<input type="checkbox">`
 * carrying `role="switch"`, so selection is the `checked` DOM property and change is a DOM
 * event. Radix used a `<button role="switch">` and bubbled a hidden input in for form
 * submission; that workaround is gone, and the form-participation tests below are what
 * replaced it.
 */

const toggle = () => screen.getByRole('switch') as HTMLInputElement

describe('Switch role and labelling', () => {
	it('renders a checkbox input exposed as a switch', () => {
		render(<Switch aria-label="Notifications" />)
		const el = toggle()
		expect(el.tagName).toBe('INPUT')
		expect(el.type).toBe('checkbox')
		expect(el).toHaveAttribute('role', 'switch')
		expect(el).toHaveAccessibleName('Notifications')
	})

	it('is not exposed as a checkbox', () => {
		// The role override is the whole point — assistive technology should announce an
		// on/off switch, not a checkbox.
		render(<Switch aria-label="Notifications" />)
		expect(screen.queryByRole('checkbox')).toBeNull()
	})

	it('associates with a native label element', () => {
		render(
			<>
				<label htmlFor="notifications">Notifications</label>
				<Switch id="notifications" />
			</>
		)
		expect(screen.getByLabelText('Notifications')).toBe(toggle())
	})

	it('supports aria-describedby and aria-labelledby passthrough', () => {
		render(
			<Switch
				aria-label="Notifications"
				aria-describedby="helper-text"
				aria-labelledby="label-text"
			/>
		)
		expect(toggle()).toHaveAttribute('aria-describedby', 'helper-text')
		expect(toggle()).toHaveAttribute('aria-labelledby', 'label-text')
	})
})

describe('Switch checked state', () => {
	it('is off by default', () => {
		render(<Switch aria-label="Notifications" />)
		expect(toggle().checked).toBe(false)
	})

	it('honours defaultChecked and toggles uncontrolled', async () => {
		const user = userEvent.setup()
		render(<Switch aria-label="Notifications" defaultChecked />)
		expect(toggle().checked).toBe(true)

		await user.click(toggle())
		expect(toggle().checked).toBe(false)
	})

	it('reports each toggle through onChange', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(<Switch aria-label="Notifications" onChange={onChange} />)

		await user.click(toggle())
		expect(onChange).toHaveBeenCalledTimes(1)
		expect(onChange.mock.calls[0][0].target.checked).toBe(true)

		await user.click(toggle())
		expect(onChange.mock.calls[1][0].target.checked).toBe(false)
	})

	it('stays pinned to a controlled checked prop', async () => {
		const user = userEvent.setup()
		const { rerender } = render(
			<Switch aria-label="Notifications" checked={false} onChange={() => {}} />
		)
		expect(toggle().checked).toBe(false)

		await user.click(toggle())
		expect(toggle().checked).toBe(false)

		rerender(
			<Switch aria-label="Notifications" checked={true} onChange={() => {}} />
		)
		expect(toggle().checked).toBe(true)
	})

	it('drives a controlled switch from parent state', async () => {
		const user = userEvent.setup()
		const Controlled = () => {
			const [on, setOn] = useState(false)
			return (
				<Switch
					aria-label="Notifications"
					checked={on}
					onChange={(e) => setOn(e.target.checked)}
				/>
			)
		}
		render(<Controlled />)

		await user.click(toggle())
		expect(toggle().checked).toBe(true)
	})
})

describe('Switch disabled state', () => {
	it('sets the disabled attribute and blocks interaction', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(
			<Switch aria-label="Notifications" disabled onChange={onChange} />
		)
		expect(toggle()).toBeDisabled()

		await user.click(toggle())
		expect(onChange).not.toHaveBeenCalled()
		expect(toggle().checked).toBe(false)
	})

	it('is skipped by Tab', async () => {
		const user = userEvent.setup()
		render(
			<>
				<button type="button">before</button>
				<Switch aria-label="Notifications" disabled />
				<button type="button">after</button>
			</>
		)
		await user.tab()
		expect(screen.getByRole('button', { name: 'before' })).toHaveFocus()
		await user.tab()
		expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
	})
})

describe('Switch keyboard operation', () => {
	it('is reachable by Tab and toggles on Space', async () => {
		const user = userEvent.setup()
		render(<Switch aria-label="Notifications" />)

		await user.tab()
		expect(toggle()).toHaveFocus()

		await user.keyboard(' ')
		expect(toggle().checked).toBe(true)

		await user.keyboard(' ')
		expect(toggle().checked).toBe(false)
	})

	it('does not toggle on Enter, matching native checkbox behaviour', async () => {
		// Radix's button-based switch activated on Enter for free. A checkbox does not —
		// Enter submits the form. This is a deliberate behaviour change toward the platform.
		const user = userEvent.setup()
		render(<Switch aria-label="Notifications" />)

		await user.tab()
		await user.keyboard('{Enter}')
		expect(toggle().checked).toBe(false)
	})
})

describe('Switch form participation', () => {
	it('submits its value with no hidden bubble input', () => {
		const { container } = render(
			<form aria-label="Settings">
				<Switch
					aria-label="Notifications"
					name="notifications"
					value="on"
					defaultChecked
				/>
			</form>
		)
		// Radix rendered a second, hidden input purely so the control reached FormData.
		expect(container.querySelectorAll('input')).toHaveLength(1)

		const data = new FormData(screen.getByRole('form') as HTMLFormElement)
		expect(data.get('notifications')).toBe('on')
	})

	it('is omitted from FormData when off', () => {
		render(
			<form aria-label="Settings">
				<Switch aria-label="Notifications" name="notifications" value="on" />
			</form>
		)
		const data = new FormData(screen.getByRole('form') as HTMLFormElement)
		expect(data.get('notifications')).toBeNull()
	})

	it('carries required as a real constraint', () => {
		render(<Switch aria-label="Terms" name="terms" required />)
		expect(toggle()).toBeRequired()
		expect(toggle().validity.valueMissing).toBe(true)
	})

	it('passes id, name and value straight through', () => {
		render(
			<Switch
				aria-label="Notifications"
				id="test-switch"
				name="test-name"
				value="test-value"
			/>
		)
		expect(toggle()).toHaveAttribute('id', 'test-switch')
		expect(toggle()).toHaveAttribute('name', 'test-name')
		expect(toggle()).toHaveAttribute('value', 'test-value')
	})
})

describe('Switch styling hooks', () => {
	it('applies the root class to the input', () => {
		render(<Switch aria-label="Notifications" />)
		expect(toggle()).toHaveClass(s.root)
	})

	it('applies the invalid class only when isInvalid is set', () => {
		const { rerender } = render(<Switch aria-label="Notifications" />)
		expect(toggle()).not.toHaveClass(s.isInvalid)

		rerender(<Switch aria-label="Notifications" isInvalid />)
		expect(toggle()).toHaveClass(s.isInvalid)
	})

	it('merges a consumer className with its own', () => {
		render(<Switch aria-label="Notifications" className="custom-switch" />)
		expect(toggle()).toHaveClass('custom-switch', s.root)
	})

	it('styles state from native pseudo-classes, not from data-state', () => {
		const selectors = declaredSelectors(s.root).join('\n')
		expect(selectors).toMatch(/:checked/)
		expect(selectors).toMatch(/:disabled/)
		expect(selectors).not.toMatch(/data-state/)
		expect(selectors).not.toMatch(/data-disabled/)

		expect(declaredRule(s.root)).toMatch(/appearance:\s*none/)
	})

	it('moves the thumb from the checked state rather than a JS-applied class', () => {
		// The thumb used to get a `thumbChecked` class computed in the component, which
		// meant an uncontrolled switch never animated — React did not know it had changed.
		// It is now a sibling selector, so uncontrolled switches work.
		const thumbSelectors = declaredSelectors(s.thumb).join('\n')
		expect(thumbSelectors).toMatch(/:checked\s*~/)
		expect(s).not.toHaveProperty('thumbChecked')
		expect(s).not.toHaveProperty('checkIconVisible')
	})

	it('keeps the thumb and mark out of the accessibility tree and hit target', () => {
		const { container } = render(
			<Switch aria-label="Notifications" defaultChecked />
		)
		const thumb = container.querySelector(`.${s.thumb}`)
		const icon = container.querySelector(`.${s.checkIcon}`)

		expect(thumb).toHaveAttribute('aria-hidden', 'true')
		expect(icon).toHaveAttribute('aria-hidden', 'true')
		expect(declaredRule(s.thumb)).toMatch(/pointer-events:\s*none/)
		expect(declaredRule(s.checkIcon)).toMatch(/pointer-events:\s*none/)
	})
})

describe('Switch element contract', () => {
	it('forwards a ref to the input itself', () => {
		const ref = React.createRef<HTMLInputElement>()
		render(<Switch aria-label="Notifications" ref={ref} />)
		expect(ref.current).toBeInstanceOf(HTMLInputElement)
		expect(ref.current).toBe(toggle())
	})

	it('passes arbitrary props through to the input', () => {
		render(<Switch aria-label="Notifications" data-testid="sw" />)
		expect(screen.getByTestId('sw')).toBe(toggle())
	})
})
