import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, Radio } from '../radio'
import s from '../radio.module.css'
import {
	declaredRule,
	declaredRules,
	declaredSelectors,
} from '../../../../test-utils'

/**
 * Rewritten for Radix A.3. The previous suite asserted the Radix surface — `aria-checked`,
 * `data-disabled`, `onValueChange`, and a `value` *attribute* on a `<button role="radio">`.
 * A native `<input type="radio">` exposes none of that: selection is the `checked` DOM
 * property, and disabled is a real attribute the browser enforces.
 *
 * The substance of this migration is that arrow-key navigation, single-selection and
 * roving tabindex now come from the browser, purely because the inputs share a `name`.
 * That is what the keyboard block below is really testing — behaviour we deleted
 * `@radix-ui/react-roving-focus` to get for free.
 */

const radios = () => screen.getAllByRole('radio') as HTMLInputElement[]

const Group = ({
	onChange,
	...props
}: React.ComponentProps<typeof RadioGroup>) => (
	<RadioGroup aria-label="Plan" onChange={onChange} {...props}>
		<Radio value="free" aria-label="Free" />
		<Radio value="pro" aria-label="Pro" />
		<Radio value="team" aria-label="Team" />
	</RadioGroup>
)

describe('RadioGroup structure', () => {
	it('renders a radiogroup containing native radio inputs', () => {
		render(<Group />)
		expect(screen.getByRole('radiogroup')).toBeInTheDocument()
		expect(radios()).toHaveLength(3)
		radios().forEach((r) => {
			expect(r.tagName).toBe('INPUT')
			expect(r.type).toBe('radio')
		})
	})

	it('gives every radio the same generated name when none is supplied', () => {
		// The shared name is not cosmetic — it is the only thing that makes the browser
		// treat these as one group, and therefore the only reason arrow keys work at all.
		render(<Group />)
		const names = new Set(radios().map((r) => r.name))
		expect(names.size).toBe(1)
		expect([...names][0]).toBeTruthy()
	})

	it('uses an explicit group name when given one', () => {
		render(<Group name="plan" />)
		radios().forEach((r) => expect(r.name).toBe('plan'))
	})

	it('keeps separate groups independent', async () => {
		// Two groups on one page must not steal each other's selection. Without distinct
		// generated names they would collapse into a single group.
		const user = userEvent.setup()
		render(
			<>
				<RadioGroup aria-label="First">
					<Radio value="a" aria-label="First A" />
					<Radio value="b" aria-label="First B" />
				</RadioGroup>
				<RadioGroup aria-label="Second">
					<Radio value="a" aria-label="Second A" />
					<Radio value="b" aria-label="Second B" />
				</RadioGroup>
			</>
		)

		await user.click(screen.getByLabelText('First A'))
		await user.click(screen.getByLabelText('Second B'))

		expect((screen.getByLabelText('First A') as HTMLInputElement).checked).toBe(
			true
		)
		expect((screen.getByLabelText('Second B') as HTMLInputElement).checked).toBe(
			true
		)
	})

	it('sets aria-orientation and the data-orientation styling hook', () => {
		const { rerender } = render(<Group />)
		expect(screen.getByRole('radiogroup')).toHaveAttribute(
			'aria-orientation',
			'vertical'
		)

		rerender(<Group orientation="horizontal" />)
		expect(screen.getByRole('radiogroup')).toHaveAttribute(
			'aria-orientation',
			'horizontal'
		)
		expect(screen.getByRole('radiogroup')).toHaveAttribute(
			'data-orientation',
			'horizontal'
		)
	})

	it('merges a consumer className on the group', () => {
		render(<Group className="custom-class" />)
		expect(screen.getByRole('radiogroup')).toHaveClass(
			'custom-class',
			s.groupRoot
		)
	})
})

describe('RadioGroup selection', () => {
	it('reflects a controlled value', () => {
		const { rerender } = render(<Group value="free" onChange={() => {}} />)
		expect(radios().map((r) => r.checked)).toEqual([true, false, false])

		rerender(<Group value="team" onChange={() => {}} />)
		expect(radios().map((r) => r.checked)).toEqual([false, false, true])
	})

	it('reports the newly selected value through onChange', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(<Group onChange={onChange} />)

		await user.click(screen.getByLabelText('Pro'))
		expect(onChange).toHaveBeenCalledWith('pro')
	})

	it('does not fire onChange for the radio being deselected', async () => {
		// Selecting one radio unchecks its siblings, but only the newly checked input
		// fires a change event — the group callback must report exactly one value.
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(<Group defaultValue="free" onChange={onChange} />)

		await user.click(screen.getByLabelText('Team'))
		expect(onChange).toHaveBeenCalledTimes(1)
		expect(onChange).toHaveBeenCalledWith('team')
	})

	it('honours defaultValue and lets the browser own selection', async () => {
		const user = userEvent.setup()
		render(<Group defaultValue="pro" />)
		expect(radios().map((r) => r.checked)).toEqual([false, true, false])

		await user.click(screen.getByLabelText('Team'))
		expect(radios().map((r) => r.checked)).toEqual([false, false, true])
	})

	it('drives a controlled group from parent state', async () => {
		const user = userEvent.setup()
		const Controlled = () => {
			const [plan, setPlan] = useState('free')
			return <Group value={plan} onChange={setPlan} />
		}
		render(<Controlled />)

		await user.click(screen.getByLabelText('Team'))
		expect(radios().map((r) => r.checked)).toEqual([false, false, true])
	})

	it('stays pinned when controlled and the owner ignores the change', async () => {
		const user = userEvent.setup()
		render(<Group value="free" onChange={() => {}} />)

		await user.click(screen.getByLabelText('Team'))
		expect(radios().map((r) => r.checked)).toEqual([true, false, false])
	})

	it('still fires a radio-level onChange alongside the group callback', async () => {
		const user = userEvent.setup()
		const onGroupChange = vi.fn()
		const onRadioChange = vi.fn()
		render(
			<RadioGroup aria-label="Plan" onChange={onGroupChange}>
				<Radio value="free" aria-label="Free" onChange={onRadioChange} />
				<Radio value="pro" aria-label="Pro" />
			</RadioGroup>
		)

		await user.click(screen.getByLabelText('Free'))
		expect(onRadioChange).toHaveBeenCalledTimes(1)
		expect(onGroupChange).toHaveBeenCalledWith('free')
	})
})

describe('RadioGroup keyboard operation', () => {
	// The heart of A.3. None of this is implemented in the component — it is the browser
	// acting on inputs that share a `name`, which is exactly what
	// `@radix-ui/react-roving-focus` was doing by hand.

	it('is a single tab stop, entering at the selected radio', async () => {
		const user = userEvent.setup()
		render(
			<>
				<button type="button">before</button>
				<Group defaultValue="pro" />
				<button type="button">after</button>
			</>
		)

		await user.tab()
		expect(screen.getByRole('button', { name: 'before' })).toHaveFocus()

		await user.tab()
		expect(screen.getByLabelText('Pro')).toHaveFocus()

		// One more Tab leaves the whole group, rather than stepping through each radio.
		await user.tab()
		expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
	})

	it('enters at the first radio when nothing is selected', async () => {
		const user = userEvent.setup()
		render(<Group />)

		await user.tab()
		expect(screen.getByLabelText('Free')).toHaveFocus()
	})

	it('moves and selects with ArrowDown and ArrowRight', async () => {
		const user = userEvent.setup()
		render(<Group defaultValue="free" />)

		await user.tab()
		await user.keyboard('{ArrowDown}')
		expect(screen.getByLabelText('Pro')).toHaveFocus()
		expect((screen.getByLabelText('Pro') as HTMLInputElement).checked).toBe(true)

		await user.keyboard('{ArrowRight}')
		expect((screen.getByLabelText('Team') as HTMLInputElement).checked).toBe(
			true
		)
	})

	it('moves and selects with ArrowUp and ArrowLeft', async () => {
		const user = userEvent.setup()
		render(<Group defaultValue="team" />)

		await user.tab()
		await user.keyboard('{ArrowUp}')
		expect((screen.getByLabelText('Pro') as HTMLInputElement).checked).toBe(true)

		await user.keyboard('{ArrowLeft}')
		expect((screen.getByLabelText('Free') as HTMLInputElement).checked).toBe(
			true
		)
	})

	it('wraps around at both ends', async () => {
		// Radix modelled wrapping as an opt-in `loop` prop. Native radios always wrap, so
		// the prop has no meaning any more and was removed.
		const user = userEvent.setup()
		render(<Group defaultValue="team" />)

		await user.tab()
		await user.keyboard('{ArrowDown}')
		expect((screen.getByLabelText('Free') as HTMLInputElement).checked).toBe(
			true
		)

		await user.keyboard('{ArrowUp}')
		expect((screen.getByLabelText('Team') as HTMLInputElement).checked).toBe(
			true
		)
	})

	it('reports each arrow-key selection through onChange', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(<Group defaultValue="free" onChange={onChange} />)

		await user.tab()
		await user.keyboard('{ArrowDown}')
		expect(onChange).toHaveBeenCalledWith('pro')
	})

	it('selects with Space', async () => {
		const user = userEvent.setup()
		render(<Group />)

		await user.tab()
		await user.keyboard(' ')
		expect((screen.getByLabelText('Free') as HTMLInputElement).checked).toBe(
			true
		)
	})
})

describe('Radio disabled state', () => {
	it('disables every radio from the group', async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()
		render(<Group disabled onChange={onChange} />)

		radios().forEach((r) => expect(r).toBeDisabled())

		await user.click(screen.getByLabelText('Pro'))
		expect(onChange).not.toHaveBeenCalled()
	})

	it('disables a single radio without affecting its siblings', async () => {
		const user = userEvent.setup()
		render(
			<RadioGroup aria-label="Plan">
				<Radio value="free" aria-label="Free" />
				<Radio value="pro" aria-label="Pro" disabled />
			</RadioGroup>
		)
		expect(screen.getByLabelText('Free')).toBeEnabled()
		expect(screen.getByLabelText('Pro')).toBeDisabled()

		await user.click(screen.getByLabelText('Free'))
		expect((screen.getByLabelText('Free') as HTMLInputElement).checked).toBe(
			true
		)
	})

	it('skips a fully disabled group in the tab order', async () => {
		const user = userEvent.setup()
		render(
			<>
				<button type="button">before</button>
				<Group disabled />
				<button type="button">after</button>
			</>
		)
		await user.tab()
		expect(screen.getByRole('button', { name: 'before' })).toHaveFocus()
		await user.tab()
		expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
	})
})

describe('Radio form participation', () => {
	it('submits the selected value with no hidden input', () => {
		const { container } = render(
			<form aria-label="Signup">
				<RadioGroup aria-label="Plan" name="plan" defaultValue="pro">
					<Radio value="free" aria-label="Free" />
					<Radio value="pro" aria-label="Pro" />
				</RadioGroup>
			</form>
		)
		// Radix bubbled a hidden input in for form participation. There are now exactly
		// as many inputs as there are radios.
		expect(container.querySelectorAll('input')).toHaveLength(2)

		const data = new FormData(screen.getByRole('form') as HTMLFormElement)
		expect(data.get('plan')).toBe('pro')
	})

	it('submits nothing when the group has no selection', () => {
		render(
			<form aria-label="Signup">
				<RadioGroup aria-label="Plan" name="plan">
					<Radio value="free" aria-label="Free" />
				</RadioGroup>
			</form>
		)
		const data = new FormData(screen.getByRole('form') as HTMLFormElement)
		expect(data.get('plan')).toBeNull()
	})

	it('propagates required from the group as a real constraint', () => {
		render(<Group required />)
		radios().forEach((r) => {
			expect(r).toBeRequired()
			expect(r.validity.valueMissing).toBe(true)
		})
	})

	it('associates with a native label element', () => {
		render(
			<RadioGroup aria-label="Plan">
				<label htmlFor="plan-free">Free</label>
				<Radio value="free" id="plan-free" />
			</RadioGroup>
		)
		expect(screen.getByLabelText('Free')).toBe(screen.getByRole('radio'))
	})
})

describe('Radio styling hooks', () => {
	it('applies the root class to the input', () => {
		render(<Group />)
		radios().forEach((r) => expect(r).toHaveClass(s.root))
	})

	it('applies the invalid class only when isInvalid is set', () => {
		render(
			<RadioGroup aria-label="Plan">
				<Radio value="free" aria-label="Free" isInvalid />
				<Radio value="pro" aria-label="Pro" />
			</RadioGroup>
		)
		expect(screen.getByLabelText('Free')).toHaveClass(s.isInvalid)
		expect(screen.getByLabelText('Pro')).not.toHaveClass(s.isInvalid)
	})

	it('merges a consumer className on the radio', () => {
		render(
			<RadioGroup aria-label="Plan">
				<Radio value="free" aria-label="Free" className="custom-item-class" />
			</RadioGroup>
		)
		expect(screen.getByRole('radio')).toHaveClass('custom-item-class', s.root)
	})

	it('styles state from native pseudo-classes, not from data-state', () => {
		const selectors = declaredSelectors(s.root).join('\n')
		expect(selectors).toMatch(/:checked/)
		expect(selectors).toMatch(/:disabled/)
		expect(selectors).not.toMatch(/data-state/)
		expect(selectors).not.toMatch(/data-disabled/)

		expect(declaredRule(s.root)).toMatch(/appearance:\s*none/)
	})

	it('keeps the dot out of the accessibility tree and out of the hit target', () => {
		const { container } = render(
			<RadioGroup aria-label="Plan" defaultValue="free">
				<Radio value="free" aria-label="Free" />
			</RadioGroup>
		)
		const indicator = container.querySelector(`.${s.indicator}`)
		expect(indicator).toHaveAttribute('aria-hidden', 'true')
		expect(declaredRule(s.indicator)).toMatch(/pointer-events:\s*none/)
	})

	it('draws the dot as a circle, not an ellipse', () => {
		// The dot is `.indicator::after`, which `declaredRule` deliberately does not match —
		// it takes the bare class only. `declaredSelectors` and `declaredRules` walk the
		// stylesheets in the same order, so the selector index picks out the right body.
		const selectors = declaredSelectors(s.indicator)
		const dot = declaredRules(s.indicator)[
			selectors.findIndex((selector) => selector.endsWith('::after'))
		]
		expect(dot).toBeDefined()

		const width = dot.match(/width:\s*(\d+px)/)?.[1]
		const height = dot.match(/height:\s*(\d+px)/)?.[1]

		// It shipped as 8x6 through the A.3 migration, which reproduced the pre-existing
		// dimensions exactly so the migration produced no visual diff. `border-radius: 50%`
		// on an unequal box is an ellipse.
		expect(width).toBe('8px')
		expect(height).toBe(width)
	})
})

describe('Radio element contract', () => {
	it('forwards a ref to the input itself', () => {
		const ref = React.createRef<HTMLInputElement>()
		render(
			<RadioGroup aria-label="Plan">
				<Radio value="free" aria-label="Free" ref={ref} />
			</RadioGroup>
		)
		expect(ref.current).toBeInstanceOf(HTMLInputElement)
		expect(ref.current).toBe(screen.getByRole('radio'))
	})

	it('carries its value as a real input value', () => {
		render(<Group />)
		expect(radios().map((r) => r.value)).toEqual(['free', 'pro', 'team'])
	})

	it('passes aria attributes through to the input', () => {
		render(
			<RadioGroup aria-label="Plan">
				<Radio
					value="free"
					aria-label="Free"
					aria-describedby="helper-text"
					aria-labelledby="label-text"
				/>
			</RadioGroup>
		)
		expect(screen.getByRole('radio')).toHaveAttribute(
			'aria-describedby',
			'helper-text'
		)
		expect(screen.getByRole('radio')).toHaveAttribute(
			'aria-labelledby',
			'label-text'
		)
	})

	it('works standalone, outside any group', () => {
		// A bare radio is valid HTML, so the context lookup must not throw.
		render(<Radio value="solo" aria-label="Solo" name="solo-group" />)
		expect(screen.getByRole('radio')).toBeInTheDocument()
	})

	it('lets an explicit checked prop override the group value', () => {
		// radio-card-item drives its inner Radio directly rather than through the group.
		render(
			<RadioGroup aria-label="Plan" value="free">
				<Radio value="pro" aria-label="Pro" checked readOnly />
			</RadioGroup>
		)
		expect((screen.getByLabelText('Pro') as HTMLInputElement).checked).toBe(true)
	})
})
