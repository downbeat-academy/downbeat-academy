import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../checkbox'
import s from '../checkbox.module.css'
import {
	declaredRule,
	declaredRules,
	declaredSelectors,
} from '../../../../test-utils'

/**
 * Rewritten for Radix A.2. The previous suite asserted the Radix surface — `onCheckedChange`,
 * `checked="indeterminate"`, `aria-checked`, `data-disabled` — none of which a native
 * `<input type="checkbox">` emits, because the browser tracks all of it as element state
 * rather than as attributes. Two of those tests were also vacuous: they queried for the
 * indicator and asserted `toBeDefined()`, which passes on `null`.
 *
 * The contract now is the native one:
 *
 *   checked        → the `checked` DOM property, not an attribute
 *   indeterminate  → the `indeterminate` DOM property, set imperatively via ref
 *   disabled       → the `disabled` attribute, and the browser suppresses the click
 *   form entry     → real participation via FormData, with no hidden bubble input
 */

/** The rendered `<input>`, which is the element carrying `role="checkbox"`. */
const checkbox = () => screen.getByRole('checkbox') as HTMLInputElement

describe('Checkbox role and labelling', () => {
	it('renders a real input with role checkbox', () => {
		render(<Checkbox aria-label="Subscribe" />)
		const el = checkbox()
		expect(el.tagName).toBe('INPUT')
		expect(el.type).toBe('checkbox')
		expect(el).toHaveAccessibleName('Subscribe')
	})

	it('associates with a native label element', () => {
		// The whole point of migrating: a native input is labellable, so a plain <label>
		// works without any aria wiring. The Radix button could not do this.
		render(
			<>
				<label htmlFor="terms">Accept terms</label>
				<Checkbox id="terms" />
			</>
		)
		expect(screen.getByLabelText('Accept terms')).toBe(checkbox())
	})

	it('supports aria-describedby and aria-labelledby passthrough', () => {
		render(
			<Checkbox
				aria-label="Accessible checkbox"
				aria-describedby="helper-text"
				aria-labelledby="label-text"
			/>
		)
		expect(checkbox()).toHaveAttribute('aria-describedby', 'helper-text')
		expect(checkbox()).toHaveAttribute('aria-labelledby', 'label-text')
	})
})

describe('Checkbox checked state', () => {
	it('is unchecked by default', () => {
		render(<Checkbox aria-label="Subscribe" />)
		expect(checkbox().checked).toBe(false)
	})

	it('honours defaultChecked and toggles uncontrolled', async () => {
		const user = userEvent.setup()
		render(<Checkbox aria-label="Subscribe" defaultChecked />)
		expect(checkbox().checked).toBe(true)

		await user.click(checkbox())
		expect(checkbox().checked).toBe(false)
	})

	it('reports each toggle through onChange', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(<Checkbox aria-label="Subscribe" onChange={onChange} />)

		await user.click(checkbox())
		expect(onChange).toHaveBeenCalledTimes(1)
		expect(onChange.mock.calls[0][0].target.checked).toBe(true)

		await user.click(checkbox())
		expect(onChange).toHaveBeenCalledTimes(2)
		expect(onChange.mock.calls[1][0].target.checked).toBe(false)
	})

	it('stays pinned to a controlled checked prop', async () => {
		// A controlled input must not drift: clicking it without the owner updating state
		// leaves it where the prop says it is.
		const user = userEvent.setup()
		const { rerender } = render(
			<Checkbox aria-label="Subscribe" checked={false} onChange={() => {}} />
		)
		expect(checkbox().checked).toBe(false)

		await user.click(checkbox())
		expect(checkbox().checked).toBe(false)

		rerender(
			<Checkbox aria-label="Subscribe" checked={true} onChange={() => {}} />
		)
		expect(checkbox().checked).toBe(true)
	})

	it('drives a controlled checkbox from parent state', async () => {
		const user = userEvent.setup()
		const Controlled = () => {
			const [on, setOn] = useState(false)
			return (
				<Checkbox
					aria-label="Subscribe"
					checked={on}
					onChange={(e) => setOn(e.target.checked)}
				/>
			)
		}
		render(<Controlled />)

		await user.click(checkbox())
		expect(checkbox().checked).toBe(true)
	})
})

describe('Checkbox indeterminate state', () => {
	it('sets the DOM property, which has no HTML attribute', () => {
		render(<Checkbox aria-label="Select all" indeterminate />)
		expect(checkbox().indeterminate).toBe(true)
		// The distinction that makes the imperative ref necessary in the first place.
		expect(checkbox()).not.toHaveAttribute('indeterminate')
	})

	it('is false by default', () => {
		render(<Checkbox aria-label="Select all" />)
		expect(checkbox().indeterminate).toBe(false)
	})

	it('is independent of checked', () => {
		render(<Checkbox aria-label="Select all" checked readOnly indeterminate />)
		expect(checkbox().checked).toBe(true)
		expect(checkbox().indeterminate).toBe(true)
	})

	it('clears when the prop goes false', () => {
		const { rerender } = render(
			<Checkbox aria-label="Select all" indeterminate />
		)
		expect(checkbox().indeterminate).toBe(true)

		rerender(<Checkbox aria-label="Select all" indeterminate={false} />)
		expect(checkbox().indeterminate).toBe(false)
	})

	it('renders the Minus mark instead of the Check mark', () => {
		const { container, rerender } = render(
			<Checkbox aria-label="Select all" indeterminate />
		)
		const indicator = container.querySelector(`.${s.indicator}`)
		expect(indicator).not.toBeNull()
		const indeterminateMark = indicator!.innerHTML

		rerender(<Checkbox aria-label="Select all" indeterminate={false} />)
		const checkedMark = container.querySelector(`.${s.indicator}`)!.innerHTML

		// Asserting they differ, rather than on icon internals, keeps this from breaking
		// every time cadence-icons changes its SVG output.
		expect(indeterminateMark).not.toBe(checkedMark)
	})
})

describe('Checkbox disabled state', () => {
	it('sets the disabled attribute and blocks interaction', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(
			<Checkbox aria-label="Subscribe" disabled onChange={onChange} />
		)
		expect(checkbox()).toBeDisabled()

		await user.click(checkbox())
		expect(onChange).not.toHaveBeenCalled()
		expect(checkbox().checked).toBe(false)
	})

	it('is skipped by Tab', async () => {
		const user = userEvent.setup()
		render(
			<>
				<button type="button">before</button>
				<Checkbox aria-label="Subscribe" disabled />
				<button type="button">after</button>
			</>
		)
		await user.tab()
		expect(screen.getByRole('button', { name: 'before' })).toHaveFocus()
		await user.tab()
		expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
	})
})

describe('Checkbox keyboard operation', () => {
	it('is reachable by Tab and toggles on Space', async () => {
		const user = userEvent.setup()
		render(<Checkbox aria-label="Subscribe" />)

		await user.tab()
		expect(checkbox()).toHaveFocus()

		await user.keyboard(' ')
		expect(checkbox().checked).toBe(true)

		await user.keyboard(' ')
		expect(checkbox().checked).toBe(false)
	})

	it('does not toggle on Enter, matching native behaviour', async () => {
		// Enter submits the form; it does not tick the box. Radix's button-based control
		// got this wrong for free, because buttons activate on Enter.
		const user = userEvent.setup()
		render(<Checkbox aria-label="Subscribe" />)

		await user.tab()
		await user.keyboard('{Enter}')
		expect(checkbox().checked).toBe(false)
	})
})

describe('Checkbox form participation', () => {
	it('submits its value with no hidden bubble input', () => {
		// The hack this migration deletes: Radix rendered a second, hidden <input> purely
		// so the control would appear in FormData. There is now exactly one input.
		const { container } = render(
			<form aria-label="Preferences">
				<Checkbox aria-label="Subscribe" name="subscribe" value="yes" defaultChecked />
			</form>
		)
		expect(container.querySelectorAll('input')).toHaveLength(1)

		const data = new FormData(screen.getByRole('form') as HTMLFormElement)
		expect(data.get('subscribe')).toBe('yes')
	})

	it('is omitted from FormData when unchecked', () => {
		render(
			<form aria-label="Preferences">
				<Checkbox aria-label="Subscribe" name="subscribe" value="yes" />
			</form>
		)
		const data = new FormData(screen.getByRole('form') as HTMLFormElement)
		expect(data.get('subscribe')).toBeNull()
	})

	it('carries required as a real constraint, not just an aria attribute', () => {
		render(<Checkbox aria-label="Subscribe" name="subscribe" required />)
		expect(checkbox()).toBeRequired()
		expect(checkbox().validity.valueMissing).toBe(true)
	})

	it('passes id, name and value straight through', () => {
		render(
			<Checkbox
				aria-label="Subscribe"
				id="test-checkbox"
				name="test-name"
				value="test-value"
			/>
		)
		expect(checkbox()).toHaveAttribute('id', 'test-checkbox')
		expect(checkbox()).toHaveAttribute('name', 'test-name')
		expect(checkbox()).toHaveAttribute('value', 'test-value')
	})
})

describe('Checkbox styling hooks', () => {
	it('applies the root class to the input', () => {
		render(<Checkbox aria-label="Subscribe" />)
		expect(checkbox()).toHaveClass(s.root)
	})

	it('applies the invalid class only when isInvalid is set', () => {
		const { rerender } = render(<Checkbox aria-label="Subscribe" />)
		expect(checkbox()).not.toHaveClass(s.isInvalid)

		rerender(<Checkbox aria-label="Subscribe" isInvalid />)
		expect(checkbox()).toHaveClass(s.isInvalid)
	})

	it('merges a consumer className with its own', () => {
		render(<Checkbox aria-label="Subscribe" className="custom-checkbox-class" />)
		expect(checkbox()).toHaveClass('custom-checkbox-class', s.root)
	})

	it('styles state from native pseudo-classes, not from data-state', () => {
		// jsdom cannot resolve var() and has no layout, so neither computed styles nor
		// rendering can verify this — assert the declared selectors instead. This pins the
		// A.2 swap: Radix drove styling off [data-state='checked'] / [data-disabled], the
		// native input drives it off :checked, :indeterminate and :disabled.
		const selectors = declaredSelectors(s.root).join('\n')
		expect(selectors).toMatch(/:checked/)
		expect(selectors).toMatch(/:indeterminate/)
		expect(selectors).toMatch(/:disabled/)
		expect(selectors).not.toMatch(/data-state/)
		expect(selectors).not.toMatch(/data-disabled/)

		// `appearance: none` is what makes the native control styleable at all.
		expect(declaredRule(s.root)).toMatch(/appearance:\s*none/)
	})

	it('keeps the mark out of the accessibility tree and out of the hit target', () => {
		const { container } = render(<Checkbox aria-label="Subscribe" defaultChecked />)
		const indicator = container.querySelector(`.${s.indicator}`)
		expect(indicator).toHaveAttribute('aria-hidden', 'true')
		expect(declaredRules(s.indicator).join('\n')).toMatch(
			/pointer-events:\s*none/
		)
	})
})

describe('Checkbox element contract', () => {
	it('forwards a ref to the input itself', () => {
		const ref = React.createRef<HTMLInputElement>()
		render(<Checkbox aria-label="Subscribe" ref={ref} />)
		expect(ref.current).toBeInstanceOf(HTMLInputElement)
		expect(ref.current).toBe(checkbox())
	})

	it('exposes the indeterminate property through the forwarded ref', () => {
		// The ref has to reach the real input, not the wrapper — otherwise a consumer
		// could not read or set indeterminate themselves.
		const ref = React.createRef<HTMLInputElement>()
		render(<Checkbox aria-label="Select all" ref={ref} indeterminate />)
		expect(ref.current!.indeterminate).toBe(true)
	})

	it('passes arbitrary props through to the input', () => {
		render(<Checkbox aria-label="Subscribe" data-testid="cb" />)
		expect(screen.getByTestId('cb')).toBe(checkbox())
	})
})
