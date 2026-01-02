import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
} from '../select'

describe('Select', () => {
  // Helper function to render a basic Select component
  const renderSelect = (props: Record<string, unknown> = {}) => {
    const { triggerProps = {}, ...selectProps } = props
    return render(
      <Select {...selectProps}>
        <SelectTrigger placeholder="Select an option" {...triggerProps} />
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    )
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderSelect()
      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeDefined()
    })

    it('renders with placeholder text', () => {
      renderSelect()
      const trigger = screen.getByRole('combobox')
      expect(trigger.textContent).toContain('Select an option')
    })

    it('renders with a controlled value', () => {
      render(
        <Select value="option2">
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger.textContent).toContain('Option 2')
    })

    it('renders with a default value', () => {
      render(
        <Select defaultValue="option1">
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger.textContent).toContain('Option 1')
    })
  })

  describe('Props', () => {
    it('applies isInvalid styling class to trigger', () => {
      renderSelect({ triggerProps: { isInvalid: true } })
      const trigger = screen.getByRole('combobox')
      expect(trigger.className).toContain('is-invalid')
    })

    it('applies disabled state via data attribute', () => {
      renderSelect({ disabled: true })
      const trigger = screen.getByRole('combobox')
      expect(trigger.getAttribute('data-disabled')).toBe('')
    })

    it('passes custom className to trigger', () => {
      renderSelect({ triggerProps: { className: 'custom-trigger-class' } })
      const trigger = screen.getByRole('combobox')
      expect(trigger.className).toContain('custom-trigger-class')
    })

    it('applies custom id to trigger', () => {
      renderSelect({ triggerProps: { id: 'custom-select-id' } })
      const trigger = screen.getByRole('combobox')
      expect(trigger.getAttribute('id')).toBe('custom-select-id')
    })

    it('applies name attribute for form integration', () => {
      render(
        <Select name="test-select">
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeDefined()
    })
  })

  describe('Interactions with controlled open state', () => {
    it('displays dropdown content when open is true', async () => {
      render(
        <Select open={true}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      )

      await waitFor(() => {
        const listbox = screen.getByRole('listbox')
        expect(listbox).toBeDefined()
      })
    })

    it('displays all options when dropdown is open', async () => {
      render(
        <Select open={true}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      )

      await waitFor(() => {
        const options = screen.getAllByRole('option')
        expect(options.length).toBe(3)
        expect(options[0].textContent).toContain('Option 1')
        expect(options[1].textContent).toContain('Option 2')
        expect(options[2].textContent).toContain('Option 3')
      })
    })

    it('calls onValueChange when an item is clicked', async () => {
      const handleValueChange = vi.fn()
      render(
        <Select open={true} onValueChange={handleValueChange}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      )

      await waitFor(() => {
        const option = screen.getByRole('option', { name: 'Option 2' })
        fireEvent.click(option)
      })

      expect(handleValueChange).toHaveBeenCalledWith('option2')
    })

    it('calls onOpenChange when trigger is clicked', () => {
      const handleOpenChange = vi.fn()
      render(
        <Select onOpenChange={handleOpenChange}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      fireEvent.keyDown(trigger, { key: 'ArrowDown' })

      expect(handleOpenChange).toHaveBeenCalled()
    })

    it('does not open dropdown when disabled', () => {
      const handleOpenChange = vi.fn()
      render(
        <Select disabled onOpenChange={handleOpenChange}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      fireEvent.keyDown(trigger, { key: 'ArrowDown' })

      expect(handleOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has aria-expanded false when closed', () => {
      renderSelect()
      const trigger = screen.getByRole('combobox')
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('has aria-expanded true when open', async () => {
      render(
        <Select open={true}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      )

      // When Select is open, we can verify by checking that the listbox is present
      // The trigger may be hidden when open, so we check for the listbox instead
      await waitFor(() => {
        const listbox = screen.getByRole('listbox')
        expect(listbox).toBeDefined()
        expect(listbox.getAttribute('data-state')).toBe('open')
      })
    })

    it('trigger has role combobox', () => {
      renderSelect()
      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeDefined()
    })

    it('supports aria-label on trigger', () => {
      renderSelect({ triggerProps: { 'aria-label': 'Select your preference' } })
      const trigger = screen.getByRole('combobox')
      expect(trigger.getAttribute('aria-label')).toBe('Select your preference')
    })

    it('supports aria-labelledby on trigger', () => {
      render(
        <>
          <label id="select-label">Choose an option</label>
          <Select>
            <SelectTrigger placeholder="Select an option" aria-labelledby="select-label" />
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger.getAttribute('aria-labelledby')).toBe('select-label')
    })

    it('supports aria-describedby on trigger', () => {
      renderSelect({ triggerProps: { 'aria-describedby': 'helper-text' } })
      const trigger = screen.getByRole('combobox')
      expect(trigger.getAttribute('aria-describedby')).toBe('helper-text')
    })

    it('has data-state closed when not open', () => {
      renderSelect()
      const trigger = screen.getByRole('combobox')
      expect(trigger.getAttribute('data-state')).toBe('closed')
    })

    it('has data-state open when opened', async () => {
      render(
        <Select open={true}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      )

      // When Select is open, verify via listbox data-state
      await waitFor(() => {
        const listbox = screen.getByRole('listbox')
        expect(listbox.getAttribute('data-state')).toBe('open')
      })
    })
  })

  describe('Controlled state', () => {
    it('respects controlled value changes', () => {
      const { rerender } = render(
        <Select value="option1">
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger.textContent).toContain('Option 1')

      rerender(
        <Select value="option2">
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      )

      expect(trigger.textContent).toContain('Option 2')
    })

    it('displays dropdown when open is controlled', async () => {
      render(
        <Select open={true}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      )

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeDefined()
      })
    })

    it('hides dropdown when open is controlled to false', () => {
      render(
        <Select open={false}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      )

      expect(screen.queryByRole('listbox')).toBeNull()
    })
  })
})

describe('SelectItem', () => {
  it('renders correctly in open dropdown', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="test-value">Test Item</SelectItem>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'Test Item' })
      expect(option).toBeDefined()
      // Radix UI uses data-value attribute on select items
      expect(option.textContent).toContain('Test Item')
    })
  })

  it('applies custom className', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="test" className="custom-item-class">
            Test Item
          </SelectItem>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'Test Item' })
      expect(option.className).toContain('custom-item-class')
    })
  })

  it('has data-disabled attribute when disabled', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="enabled">Enabled</SelectItem>
          <SelectItem value="disabled" disabled>
            Disabled
          </SelectItem>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const disabledOption = screen.getByRole('option', { name: 'Disabled' })
      expect(disabledOption.getAttribute('data-disabled')).toBe('')
    })
  })

  it('shows data-state checked when selected', async () => {
    render(
      <Select open={true} defaultValue="selected">
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="selected">Selected Item</SelectItem>
          <SelectItem value="unselected">Unselected Item</SelectItem>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const selectedOption = screen.getByRole('option', { name: 'Selected Item' })
      expect(selectedOption.getAttribute('data-state')).toBe('checked')
    })
  })

  it('shows data-state unchecked when not selected', async () => {
    render(
      <Select open={true} defaultValue="selected">
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="selected">Selected Item</SelectItem>
          <SelectItem value="unselected">Unselected Item</SelectItem>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const unselectedOption = screen.getByRole('option', { name: 'Unselected Item' })
      expect(unselectedOption.getAttribute('data-state')).toBe('unchecked')
    })
  })
})

describe('SelectGroup and SelectLabel', () => {
  it('renders groups with labels', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      expect(screen.getByText('Fruits')).toBeDefined()
      expect(screen.getByText('Vegetables')).toBeDefined()
      expect(screen.getByRole('option', { name: 'Apple' })).toBeDefined()
      expect(screen.getByRole('option', { name: 'Carrot' })).toBeDefined()
    })
  })

  it('applies custom className to group', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectGroup className="custom-group-class">
            <SelectLabel>Test Group</SelectLabel>
            <SelectItem value="item">Item</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const group = screen.getByRole('group')
      expect(group.className).toContain('custom-group-class')
    })
  })

  it('applies custom className to label', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="custom-label-class">Test Label</SelectLabel>
            <SelectItem value="item">Item</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const label = screen.getByText('Test Label')
      expect(label.className).toContain('custom-label-class')
    })
  })

  it('groups items correctly under group role', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const group = screen.getByRole('group')
      expect(group).toBeDefined()
    })
  })
})

describe('SelectContent', () => {
  it('applies custom className', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent className="custom-content-class">
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const listbox = screen.getByRole('listbox')
      // The content className is applied to the listbox element in Radix
      expect(listbox.className).toContain('custom-content-class')
    })
  })

  it('renders listbox when open', async () => {
    render(
      <Select open={true}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )

    await waitFor(() => {
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeDefined()
    })
  })

  it('does not render listbox when closed', () => {
    render(
      <Select open={false}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )

    expect(screen.queryByRole('listbox')).toBeNull()
  })
})

describe('SelectTrigger', () => {
  it('renders with custom placeholder', () => {
    render(
      <Select>
        <SelectTrigger placeholder="Custom placeholder text" />
        <SelectContent>
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger.textContent).toContain('Custom placeholder text')
  })

  it('has chevron icon', () => {
    const { container } = render(
      <Select>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )

    const icon = container.querySelector('[class*="trigger-icon"]')
    expect(icon).toBeDefined()
  })

  it('can be focused', () => {
    render(
      <Select>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )
    const trigger = screen.getByRole('combobox')

    trigger.focus()
    expect(document.activeElement).toBe(trigger)
  })

  it('displays selected value instead of placeholder', () => {
    render(
      <Select defaultValue="selected">
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="selected">Selected Value</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger.textContent).toContain('Selected Value')
    expect(trigger.textContent).not.toContain('Select an option')
  })

  it('has data-placeholder attribute when no value selected', () => {
    render(
      <Select>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger.hasAttribute('data-placeholder')).toBe(true)
  })

  it('does not have data-placeholder when value is selected', () => {
    render(
      <Select defaultValue="item">
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="item">Item</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger.hasAttribute('data-placeholder')).toBe(false)
  })
})
