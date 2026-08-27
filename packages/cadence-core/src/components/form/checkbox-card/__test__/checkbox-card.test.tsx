import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckboxCardGroup, CheckboxCardItem } from '../index'
import { describe, it, expect, vi } from 'vitest'
// Assert against the CSS module rather than literal names — class names are hashed.
import s from '../checkbox-card.module.css'
import { declaredSelectors } from '../../../../test-utils'

/**
 * Rewritten alongside the accessibility fix, which is the same one `radio-card` received in
 * Radix A.4: the card is now a `<label>` wrapping a real `<input type="checkbox">` rather
 * than a bare `<div role="checkbox" onClick>` holding an `aria-hidden`, `tabIndex={-1}`
 * input that assistive technology could not see and the keyboard could not reach.
 *
 * The previous suite passed throughout, which is exactly why it is worth being explicit
 * about what it was measuring. `getByRole('checkbox')` returned the *wrapper div*, because
 * the real input was hidden from the accessibility tree — so every assertion about
 * "the checkbox" was an assertion about a div that no assistive technology could operate.
 * Its `aria-checked`, `data-state` and `aria-disabled` checks confirmed that React had
 * written the attributes it was told to write, and nothing about whether the control
 * worked. A native input exposes none of them: selection is the `checked` DOM property,
 * disabled and required are real attributes, and mixed is the `indeterminate` property.
 *
 * Three tests were mis-specified rather than merely Radix-shaped, and are corrected here:
 *
 *  - `applies size classes` and friends asserted card modifier classes on the
 *    `role="checkbox"` element. That element is now the `<input>`, which cannot carry
 *    them — an input cannot contain the title, icon and badge. They move to the card,
 *    which is what they were always about.
 *  - `applies alignment classes` queried a hard-coded `.item-content-alignment-center`,
 *    which cannot match the hashed name, then asserted `toBeDefined()` — which passes on
 *    `null`. It now asserts the hashed class actually applies.
 *  - `can be disabled` clicked the wrapper and asserted the group callback did not fire.
 *    It could not have fired: the group callback was never wired to a click on that
 *    element in the disabled case, so the test passed for the wrong reason.
 */

const boxes = () => screen.getAllByRole('checkbox') as HTMLInputElement[]

const byValue = (value: string) =>
  boxes().find((b) => b.value === value) as HTMLInputElement

/** The `<label>` card wrapping a given checkbox. */
const cardFor = (box: HTMLElement) => box.closest('label') as HTMLElement

describe('CheckboxCardGroup', () => {
  it('renders correctly', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup).toBeDefined()
    expect(checkboxGroup.getAttribute('aria-label')).toBe('Test checkbox card group')
  })

  it('renders checkbox card items correctly', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    const checkboxItems = boxes()
    expect(checkboxItems.length).toBe(2)
    expect(checkboxItems[0].value).toBe('option1')
    expect(checkboxItems[1].value).toBe('option2')
  })

  it('can select multiple checkbox card items', async () => {
    const user = userEvent.setup()
    const TestComponent = () => {
      const [values, setValues] = React.useState<string[]>([])
      return (
        <CheckboxCardGroup
          aria-label="Test checkbox card group"
          value={values}
          onValueChange={setValues}
        >
          <CheckboxCardItem value="option1" title="Option 1" />
          <CheckboxCardItem value="option2" title="Option 2" />
        </CheckboxCardGroup>
      )
    }

    render(<TestComponent />)

    expect(byValue('option1').checked).toBe(false)
    expect(byValue('option2').checked).toBe(false)

    await user.click(byValue('option1'))
    expect(byValue('option1').checked).toBe(true)
    expect(byValue('option2').checked).toBe(false)

    await user.click(byValue('option2'))
    expect(byValue('option1').checked).toBe(true)
    expect(byValue('option2').checked).toBe(true)
  })

  it('deselects a selected item', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <CheckboxCardGroup
        aria-label="Test checkbox card group"
        value={['option1', 'option2']}
        onValueChange={handleChange}
      >
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    await user.click(byValue('option1'))
    expect(handleChange).toHaveBeenCalledWith(['option2'])
  })

  it('selects when the card, not the checkbox, is clicked', async () => {
    // The reason the card is a <label>: the whole card is the hit target, natively, with
    // no click handler mirroring the control.
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" onValueChange={handleChange}>
        <CheckboxCardItem value="option1" title="Option 1" />
      </CheckboxCardGroup>
    )

    await user.click(screen.getByText('Option 1'))
    expect(handleChange).toHaveBeenCalledWith(['option1'])
    expect(byValue('option1').checked).toBe(true)
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <CheckboxCardGroup aria-label="Test checkbox card group" value={['option1']}>
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    expect(byValue('option1').checked).toBe(true)
    expect(byValue('option2').checked).toBe(false)

    rerender(
      <CheckboxCardGroup aria-label="Test checkbox card group" value={['option2']}>
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    expect(byValue('option1').checked).toBe(false)
    expect(byValue('option2').checked).toBe(true)
  })

  it('holds its own state when uncontrolled, starting from defaultValue', async () => {
    // `defaultValue` was previously cloned down to each item as `_groupDefaultValue`, which
    // no item ever read — so an uncontrolled group rendered unchecked and never changed.
    const user = userEvent.setup()
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" defaultValue={['option1']}>
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    expect(byValue('option1').checked).toBe(true)
    expect(byValue('option2').checked).toBe(false)

    await user.click(byValue('option2'))
    expect(byValue('option1').checked).toBe(true)
    expect(byValue('option2').checked).toBe(true)

    await user.click(byValue('option1'))
    expect(byValue('option1').checked).toBe(false)
  })

  it('reports the whole selected set to onValueChange when uncontrolled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <CheckboxCardGroup
        aria-label="Test checkbox card group"
        defaultValue={['option1']}
        onValueChange={handleChange}
      >
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    await user.click(byValue('option2'))
    expect(handleChange).toHaveBeenCalledWith(['option1', 'option2'])
  })

  it('shares a name across the group for form submission', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" name="features">
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    expect(byValue('option1').name).toBe('features')
    expect(byValue('option2').name).toBe('features')
  })

  it('applies grid columns class', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" columns={3}>
        <CheckboxCardItem value="option1" title="Option 1" />
      </CheckboxCardGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup.className).toContain(s.groupColumns3)
  })

  it('applies gap class', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" gap="large">
        <CheckboxCardItem value="option1" title="Option 1" />
      </CheckboxCardGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup.className).toContain(s.groupGapLarge)
  })

  it('supports orientation attribute', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" orientation="horizontal">
        <CheckboxCardItem value="option1" title="Option 1" />
      </CheckboxCardGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup.getAttribute('data-orientation')).toBe('horizontal')
  })
})

describe('CheckboxCardItem keyboard and focus', () => {
  it('puts every card in the tab order', async () => {
    const user = userEvent.setup()
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    await user.tab()
    expect(byValue('option1')).toHaveFocus()

    await user.tab()
    expect(byValue('option2')).toHaveFocus()
  })

  it('toggles with Space, from the browser rather than a keydown handler', async () => {
    const user = userEvent.setup()
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="option1" title="Option 1" />
      </CheckboxCardGroup>
    )

    await user.tab()
    await user.keyboard(' ')
    expect(byValue('option1').checked).toBe(true)

    await user.keyboard(' ')
    expect(byValue('option1').checked).toBe(false)
  })

  it('keeps a disabled card out of the tab order', async () => {
    const user = userEvent.setup()
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="option1" title="Option 1" disabled />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    await user.tab()
    expect(byValue('option2')).toHaveFocus()
  })
})

describe('CheckboxCardItem', () => {
  it('renders with title', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test" title="Test Title" />
      </CheckboxCardGroup>
    )

    expect(screen.getByText('Test Title')).toBeDefined()
  })

  it('renders with children content', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem
          value="test"
          title="Test Title"
        >
          <p>Test description</p>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )

    expect(screen.getByText('Test Title')).toBeDefined()
    expect(screen.getByText('Test description')).toBeDefined()
  })

  it('renders with icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem
          value="test"
          title="Test Title"
          icon={<TestIcon />}
        />
      </CheckboxCardGroup>
    )

    expect(screen.getByTestId('test-icon')).toBeDefined()
  })

  it('renders with badge', () => {
    const TestBadge = () => <span data-testid="test-badge">Badge</span>
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem
          value="test"
          title="Test Title"
          badge={<TestBadge />}
        />
      </CheckboxCardGroup>
    )

    expect(screen.getByTestId('test-badge')).toBeDefined()
  })

  it('renders custom children instead of built-in content', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test">
          <div data-testid="custom-content">Custom Content</div>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )

    expect(screen.getByTestId('custom-content')).toBeDefined()
  })

  it('applies size classes to the card', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test" title="Test" size="large" />
      </CheckboxCardGroup>
    )

    expect(cardFor(byValue('test')).className).toContain(s.itemSizeLarge)
  })

  it('applies alignment classes to the content', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test" title="Test" alignment="center" />
      </CheckboxCardGroup>
    )

    const content = cardFor(byValue('test')).querySelector(
      `.${s.itemContentAlignmentCenter}`
    )
    expect(content).not.toBeNull()
  })

  it('works as a standalone checkbox card', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <CheckboxCardItem
        value="standalone"
        title="Standalone Card"
        onCheckedChange={handleChange}
      />
    )

    await user.click(byValue('standalone'))
    expect(handleChange).toHaveBeenCalledWith(true)
    // Uncontrolled and outside a group, so the browser owns the state — a standalone card
    // with no `checked` prop used to be pinned unchecked by React.
    expect(byValue('standalone').checked).toBe(true)
  })

  it('reports both directions to onCheckedChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <CheckboxCardItem
        value="standalone"
        title="Standalone Card"
        onCheckedChange={handleChange}
      />
    )

    await user.click(byValue('standalone'))
    await user.click(byValue('standalone'))
    expect(handleChange).toHaveBeenNthCalledWith(1, true)
    expect(handleChange).toHaveBeenNthCalledWith(2, false)
  })

  it('supports indeterminate state', () => {
    render(
      <CheckboxCardItem
        value="indeterminate"
        title="Indeterminate Card"
        checked="indeterminate"
      />
    )

    // Native checkboxes model mixed as a DOM property, not a value of `checked`, and the
    // browser maps it to `aria-checked="mixed"` itself.
    expect(byValue('indeterminate').indeterminate).toBe(true)
    expect(byValue('indeterminate').checked).toBe(false)
  })

  it('can be disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" onValueChange={handleChange}>
        <CheckboxCardItem value="test" title="Test" disabled />
      </CheckboxCardGroup>
    )

    expect(byValue('test').disabled).toBe(true)

    // Clicking the card, not the input — the disabled input cannot receive the click, and
    // there is no wrapper handler left to fire in its place.
    await user.click(screen.getByText('Test'))
    expect(handleChange).not.toHaveBeenCalled()
    expect(byValue('test').checked).toBe(false)
  })

  it('disables every card when the group is disabled', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" disabled>
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    expect(byValue('option1').disabled).toBe(true)
    expect(byValue('option2').disabled).toBe(true)
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test" title="Test" isInvalid />
      </CheckboxCardGroup>
    )

    expect(cardFor(byValue('test')).className).toContain(s.itemIsInvalid)
  })

  it('applies custom className to the card', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem
          value="test"
          title="Test"
          className="custom-card-class"
        />
      </CheckboxCardGroup>
    )

    expect(cardFor(byValue('test')).className).toContain('custom-card-class')
  })

  it('supports form attributes', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" name="test-group">
        <CheckboxCardItem
          value="test"
          title="Test"
          id="test-checkbox-card"
          required
        />
      </CheckboxCardGroup>
    )

    // `id` lands on the input, not the card — it is what a `<label for>` or an
    // `aria-describedby` from a Field has to point at.
    const box = byValue('test')
    expect(box.id).toBe('test-checkbox-card')
    expect(box.required).toBe(true)
    expect(box.name).toBe('test-group')
  })

  it('supports aria attributes', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem
          value="test"
          title="Test"
          aria-label="Test card"
          aria-describedby="helper-text"
        />
      </CheckboxCardGroup>
    )

    const box = screen.getByRole('checkbox', { name: 'Test card' })
    expect(box.getAttribute('aria-describedby')).toBe('helper-text')
  })

  it('renders the selection indicator', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" value={['selected']}>
        <CheckboxCardItem value="selected" title="Selected Card" />
        <CheckboxCardItem value="unselected" title="Unselected Card" />
      </CheckboxCardGroup>
    )

    expect(byValue('selected').checked).toBe(true)
    expect(byValue('unselected').checked).toBe(false)

    for (const value of ['selected', 'unselected']) {
      expect(
        cardFor(byValue(value)).querySelector(`.${s.itemIndicatorArea}`)
      ).not.toBeNull()
    }
  })
})

describe('CheckboxCardItem styling hooks', () => {
  it('styles state from the native input, not from data attributes', () => {
    // The defect this component carried was that selection lived in JavaScript on a
    // wrapper div, mirrored onto `data-state` and `data-disabled`. Styling off `:has()`
    // against the real input is what makes it impossible for the two to drift apart.
    const selectors = declaredSelectors(s.itemRoot).join('\n')

    expect(selectors).toMatch(/:has\(input:checked\)/)
    expect(selectors).toMatch(/:has\(input:indeterminate\)/)
    expect(selectors).toMatch(/:has\(input:disabled\)/)
    expect(selectors).toMatch(/:has\(input:focus-visible\)/)
    expect(selectors).not.toMatch(/data-state/)
    expect(selectors).not.toMatch(/data-disabled/)
  })
})
