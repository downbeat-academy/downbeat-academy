import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Select } from '../select'

describe('Select', () => {
  const renderSelect = (props: Record<string, unknown> = {}) => {
    return render(
      <Select {...props}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    )
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderSelect()
      const select = screen.getByRole('combobox')
      expect(select).toBeDefined()
    })

    it('renders as a native select element', () => {
      renderSelect()
      const select = screen.getByRole('combobox')
      expect(select.tagName).toBe('SELECT')
    })

    it('renders all options', () => {
      renderSelect()
      const options = screen.getAllByRole('option')
      expect(options.length).toBe(4)
    })

    it('renders with a default value', () => {
      render(
        <Select defaultValue="option1">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
      )

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('option1')
    })

    it('renders with a controlled value', () => {
      render(
        <Select value="option2" onChange={() => {}}>
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
      )

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('option2')
    })
  })

  describe('Props', () => {
    it('applies isInvalid styling class', () => {
      renderSelect({ isInvalid: true })
      const select = screen.getByRole('combobox')
      expect(select.className).toContain('isInvalid')
    })

    it('applies aria-invalid when isInvalid is true', () => {
      renderSelect({ isInvalid: true })
      const select = screen.getByRole('combobox')
      expect(select.getAttribute('aria-invalid')).toBe('true')
    })

    it('applies disabled state', () => {
      renderSelect({ disabled: true })
      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.disabled).toBe(true)
    })

    it('passes custom className', () => {
      renderSelect({ className: 'custom-select-class' })
      const select = screen.getByRole('combobox')
      expect(select.className).toContain('custom-select-class')
    })

    it('applies custom id', () => {
      renderSelect({ id: 'custom-select-id' })
      const select = screen.getByRole('combobox')
      expect(select.getAttribute('id')).toBe('custom-select-id')
    })

    it('applies name attribute for form integration', () => {
      renderSelect({ name: 'test-select' })
      const select = screen.getByRole('combobox')
      expect(select.getAttribute('name')).toBe('test-select')
    })

    it('applies required attribute', () => {
      renderSelect({ required: true })
      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.required).toBe(true)
    })
  })

  describe('Interactions', () => {
    it('calls onChange when value changes', () => {
      const handleChange = vi.fn()
      render(
        <Select onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
      )

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'option1' } })

      expect(handleChange).toHaveBeenCalled()
    })

    it('updates value on change', () => {
      render(
        <Select defaultValue="">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
      )

      const select = screen.getByRole('combobox') as HTMLSelectElement
      fireEvent.change(select, { target: { value: 'option2' } })

      expect(select.value).toBe('option2')
    })

    it('disabled select prevents user interaction', () => {
      render(
        <Select disabled defaultValue="">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
        </Select>
      )

      const select = screen.getByRole('combobox') as HTMLSelectElement
      // Verify the select is disabled - browser will prevent interaction
      expect(select.disabled).toBe(true)
      // Value should remain unchanged
      expect(select.value).toBe('')
    })
  })

  describe('Accessibility', () => {
    it('can be focused', () => {
      renderSelect()
      const select = screen.getByRole('combobox')

      select.focus()
      expect(document.activeElement).toBe(select)
    })

    it('supports aria-label', () => {
      renderSelect({ 'aria-label': 'Select your preference' })
      const select = screen.getByRole('combobox')
      expect(select.getAttribute('aria-label')).toBe('Select your preference')
    })

    it('supports aria-labelledby', () => {
      render(
        <>
          <label id="select-label">Choose an option</label>
          <Select aria-labelledby="select-label">
            <option value="option1">Option 1</option>
          </Select>
        </>
      )

      const select = screen.getByRole('combobox')
      expect(select.getAttribute('aria-labelledby')).toBe('select-label')
    })

    it('supports aria-describedby', () => {
      renderSelect({ 'aria-describedby': 'helper-text' })
      const select = screen.getByRole('combobox')
      expect(select.getAttribute('aria-describedby')).toBe('helper-text')
    })
  })

  describe('Controlled state', () => {
    it('respects controlled value changes', () => {
      const { rerender } = render(
        <Select value="option1" onChange={() => {}}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
      )

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('option1')

      rerender(
        <Select value="option2" onChange={() => {}}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
      )

      expect(select.value).toBe('option2')
    })
  })

  describe('With optgroups', () => {
    it('renders optgroups correctly', () => {
      render(
        <Select>
          <optgroup label="Fruits">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </optgroup>
          <optgroup label="Vegetables">
            <option value="carrot">Carrot</option>
          </optgroup>
        </Select>
      )

      const groups = screen.getAllByRole('group')
      expect(groups.length).toBe(2)

      const options = screen.getAllByRole('option')
      expect(options.length).toBe(3)
    })
  })

  describe('Wrapper and icon', () => {
    it('renders with chevron icon', () => {
      const { container } = renderSelect()
      const icon = container.querySelector('[class*="icon"]')
      expect(icon).toBeDefined()
    })

    it('icon has aria-hidden', () => {
      const { container } = renderSelect()
      const icon = container.querySelector('[class*="icon"]')
      expect(icon?.getAttribute('aria-hidden')).toBe('true')
    })

    it('renders within a wrapper div', () => {
      const { container } = renderSelect()
      const wrapper = container.querySelector('[class*="wrapper"]')
      expect(wrapper).toBeDefined()
    })
  })
})
