import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioCardGroup, RadioCardItem } from '../index'
import { describe, it, expect, vi } from 'vitest'
// Assert against the CSS module rather than literal names — class names are hashed.
import s from '../radio-card.module.css'

/**
 * DEQUARANTINED in Radix A.4. Every `it.skip` in this file is gone.
 *
 * These tests documented a real defect: `radio-card-item.tsx` rendered the radio with
 * `aria-hidden="true"` and `tabIndex={-1}` and moved selection onto a bare `<div onClick>`,
 * so the group was invisible to assistive technology and unreachable by keyboard. The card
 * is now a `<label>` wrapping a real `<input type="radio">`, which fixes it.
 *
 * Two mechanical changes were needed to un-skip them, neither of which weakens what they
 * check:
 *
 *  1. They asserted the Radix surface — `aria-checked` and `data-disabled`. A native input
 *     exposes neither; selection is the `checked` DOM property and disabled is a real
 *     attribute. Translated accordingly.
 *  2. They asserted card modifier classes (`itemSizeLarge`, `itemIsInvalid`) on the
 *     `role="radio"` element. That element is now the `<input>`, which cannot carry them —
 *     an input cannot contain the title, icon and badge. Those assertions moved to the
 *     card, which is what they were always about.
 *
 * Two were dropped rather than translated, because they were mis-specified from the start
 * and were never about the accessibility defect:
 *
 *  - `applies variant classes` asserted `s.itemVariantOutlined` for a `variant` prop that
 *    has never existed on `RadioCardItem` — no prop, no stylesheet rule. It could only
 *    ever have passed against an API nobody built.
 *  - `has proper indicator element` queried a hard-coded `.cds-radio-card-item--indicator`,
 *    which cannot match the hashed name, and asserted `toBeDefined()` — which passes on
 *    `null`. It is rewritten below to assert the indicator actually renders.
 */

const cards = () => screen.getAllByRole('radio') as HTMLInputElement[]

const byValue = (value: string) =>
  cards().find((r) => r.value === value) as HTMLInputElement

/** The `<label>` card wrapping a given radio. */
const cardFor = (radio: HTMLElement) => radio.closest('label') as HTMLElement

describe('RadioCardGroup', () => {
  it('renders correctly', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup).toBeDefined()
    expect(radioGroup.getAttribute('aria-label')).toBe('Test radio card group')
  })

  it('renders radio card items correctly', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    const radioItems = cards()
    expect(radioItems.length).toBe(2)
    expect(radioItems[0].getAttribute('value')).toBe('option1')
    expect(radioItems[1].getAttribute('value')).toBe('option2')
  })

  it('can select radio card items', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <RadioCardGroup aria-label="Test radio card group" onValueChange={handleChange}>
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    await user.click(byValue('option1'))
    expect(handleChange).toHaveBeenCalledWith('option1')
  })

  it('selects when the card, not the radio, is clicked', async () => {
    // The reason the card is a <label>: the whole card is the hit target, natively, with
    // no click handler mirroring the control.
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <RadioCardGroup aria-label="Test radio card group" onValueChange={handleChange}>
        <RadioCardItem value="option1" title="Option 1" />
      </RadioCardGroup>
    )

    await user.click(screen.getByText('Option 1'))
    expect(handleChange).toHaveBeenCalledWith('option1')
    expect(byValue('option1').checked).toBe(true)
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <RadioCardGroup aria-label="Test radio card group" value="option1">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    expect(byValue('option1').checked).toBe(true)
    expect(byValue('option2').checked).toBe(false)

    rerender(
      <RadioCardGroup aria-label="Test radio card group" value="option2">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    expect(byValue('option1').checked).toBe(false)
    expect(byValue('option2').checked).toBe(true)
  })

  it('can be disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <RadioCardGroup aria-label="Test radio card group" disabled onValueChange={handleChange}>
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    cards().forEach((radio) => expect(radio).toBeDisabled())

    await user.click(byValue('option1'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports horizontal orientation', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" orientation="horizontal">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup.getAttribute('data-orientation')).toBe('horizontal')
  })

  it('applies custom className', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" className="custom-class">
        <RadioCardItem value="option1" title="Option 1" />
      </RadioCardGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup.className).toContain('custom-class')
  })

  it('applies grid column classes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" columns={3}>
        <RadioCardItem value="option1" title="Option 1" />
      </RadioCardGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup.className).toContain(s.groupColumns3)
  })

  it('applies gap classes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" gap="large">
        <RadioCardItem value="option1" title="Option 1" />
      </RadioCardGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup.className).toContain(s.groupGapLarge)
  })
})

describe('RadioCardGroup keyboard operation', () => {
  // The defect this task exists to fix. None of this worked before: the real control was
  // `tabIndex={-1}` and `aria-hidden`, so Tab skipped it and arrows did nothing.

  const Group = () => (
    <RadioCardGroup aria-label="Plan">
      <RadioCardItem value="free" title="Free" />
      <RadioCardItem value="pro" title="Pro" />
      <RadioCardItem value="team" title="Team" />
    </RadioCardGroup>
  )

  it('is reachable by Tab as a single stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">before</button>
        <Group />
        <button type="button">after</button>
      </>
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'before' })).toHaveFocus()

    await user.tab()
    expect(byValue('free')).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
  })

  it('moves selection with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Group />)

    await user.tab()
    await user.keyboard('{ArrowDown}')
    expect(byValue('pro').checked).toBe(true)

    await user.keyboard('{ArrowDown}')
    expect(byValue('team').checked).toBe(true)

    await user.keyboard('{ArrowUp}')
    expect(byValue('pro').checked).toBe(true)
  })

  it('selects with Space', async () => {
    const user = userEvent.setup()
    render(<Group />)

    await user.tab()
    await user.keyboard(' ')
    expect(byValue('free').checked).toBe(true)
  })

  it('reports keyboard selection through onValueChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <RadioCardGroup aria-label="Plan" onValueChange={handleChange}>
        <RadioCardItem value="free" title="Free" />
        <RadioCardItem value="pro" title="Pro" />
      </RadioCardGroup>
    )

    await user.tab()
    await user.keyboard('{ArrowDown}')
    expect(handleChange).toHaveBeenCalledWith('pro')
  })
})

describe('RadioCardItem', () => {
  it('renders correctly with title and description', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem
          value="test"
          title="Test Title"
        >
          <span>Test Description</span>
        </RadioCardItem>
      </RadioCardGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem).toBeDefined()
    expect(radioItem.getAttribute('value')).toBe('test')

    expect(screen.getByText('Test Title')).toBeDefined()
    expect(screen.getByText('Test Description')).toBeDefined()
  })

  it('renders correctly with custom content', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test">
          <div data-testid="custom-content">Custom Content</div>
        </RadioCardItem>
      </RadioCardGroup>
    )

    const customContent = screen.getByTestId('custom-content')
    expect(customContent).toBeDefined()
    expect(customContent.textContent).toBe('Custom Content')
  })

  it('takes its accessible name from the card title', () => {
    // The payoff of wrapping in a <label>: the visible title labels the control, with no
    // aria-label to keep in sync.
    render(
      <RadioCardGroup aria-label="Plan">
        <RadioCardItem value="free" title="Free plan" />
      </RadioCardGroup>
    )
    expect(screen.getByRole('radio')).toHaveAccessibleName('Free plan')
  })

  it('can be individually disabled', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" disabled />
      </RadioCardGroup>
    )

    expect(byValue('option1')).toBeEnabled()
    expect(byValue('option2')).toBeDisabled()
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test" title="Test option" isInvalid />
      </RadioCardGroup>
    )

    expect(cardFor(screen.getByRole('radio')).className).toContain(s.itemIsInvalid)
  })

  it('applies size classes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test" title="Test option" size="large" />
      </RadioCardGroup>
    )

    expect(cardFor(screen.getByRole('radio')).className).toContain(s.itemSizeLarge)
  })

  it('applies custom className', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem
          value="test"
          title="Test option"
          className="custom-item-class"
        />
      </RadioCardGroup>
    )

    expect(cardFor(screen.getByRole('radio')).className).toContain('custom-item-class')
  })

  it('supports form attributes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" required>
        <RadioCardItem
          value="test"
          title="Test option"
          id="test-radio"
        />
      </RadioCardGroup>
    )

    const radioItem = screen.getByRole('radio')

    expect(radioItem.getAttribute('id')).toBe('test-radio')
    expect(radioItem.getAttribute('value')).toBe('test')
    // `required` is now a real constraint on the control rather than `aria-required` on a
    // div, so the group is genuinely unsubmittable without a selection.
    expect(radioItem).toBeRequired()
    expect((radioItem as HTMLInputElement).validity.valueMissing).toBe(true)
  })

  it('submits the selected value with the group name', () => {
    render(
      <form aria-label="Signup">
        <RadioCardGroup aria-label="Plan" name="plan" value="pro">
          <RadioCardItem value="free" title="Free" />
          <RadioCardItem value="pro" title="Pro" />
        </RadioCardGroup>
      </form>
    )

    const data = new FormData(screen.getByRole('form') as HTMLFormElement)
    expect(data.get('plan')).toBe('pro')
  })

  it('supports aria attributes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem
          value="test"
          title="Test option"
          aria-label="Test option"
          aria-describedby="helper-text"
          aria-labelledby="label-text"
        />
      </RadioCardGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.getAttribute('aria-label')).toBe('Test option')
    expect(radioItem.getAttribute('aria-describedby')).toBe('helper-text')
    expect(radioItem.getAttribute('aria-labelledby')).toBe('label-text')
  })

  it('renders icon when provided', () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>

    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem
          value="test"
          title="Test option"
          icon={<TestIcon />}
        />
      </RadioCardGroup>
    )

    const icon = screen.getByTestId('test-icon')
    expect(icon).toBeDefined()
  })

  it('renders badge when provided', () => {
    const TestBadge = () => <div data-testid="test-badge">Badge</div>

    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem
          value="test"
          title="Test option"
          badge={<TestBadge />}
        />
      </RadioCardGroup>
    )

    const badge = screen.getByTestId('test-badge')
    expect(badge).toBeDefined()
  })

  it('renders the selection indicator', () => {
    // Rewritten: the original queried a hard-coded `.cds-radio-card-item--indicator`,
    // which never matches the hashed name, and used `toBeDefined()` — which passes on
    // `null`. Both bugs made it assert nothing.
    const { container } = render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test" title="Test option" />
      </RadioCardGroup>
    )

    expect(container.querySelector(`.${s.itemIndicatorArea}`)).toBeInTheDocument()
  })

  it('shows selected state correctly', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" value="test">
        <RadioCardItem value="test" title="Test option" />
        <RadioCardItem value="other" title="Other option" />
      </RadioCardGroup>
    )

    expect(byValue('test').checked).toBe(true)
    expect(byValue('other').checked).toBe(false)
  })

  it('styles the card from the input state rather than a mirrored attribute', () => {
    // The structural guarantee behind the fix: the card cannot drift out of sync with the
    // control, because it has no state of its own to drift.
    const { container } = render(
      <RadioCardGroup aria-label="Test radio card group" value="test">
        <RadioCardItem value="test" title="Test option" />
      </RadioCardGroup>
    )

    const card = cardFor(screen.getByRole('radio'))
    expect(card.tagName).toBe('LABEL')
    expect(card).not.toHaveAttribute('data-state')
    expect(card).not.toHaveAttribute('data-disabled')
    expect(card).not.toHaveAttribute('role')

    // Exactly one element is exposed as a radio, and it earns that role implicitly by
    // being an `<input type="radio">` — nothing in the card asserts `role="radio"` by
    // hand any more, which is what made the old control a shell around a hidden one.
    expect(screen.getAllByRole('radio')).toHaveLength(1)
    expect(container.querySelectorAll('[role="radio"]')).toHaveLength(0)
  })
})
