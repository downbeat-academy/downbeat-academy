import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckboxGroup, CheckboxItem } from '../checkbox'
import { describe, it, expect, vi } from 'vitest'

describe('CheckboxGroup', () => {
  it('renders correctly', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group">
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" />
      </CheckboxGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup).toBeDefined()
    expect(checkboxGroup.getAttribute('aria-label')).toBe('Test checkbox group')
  })

  it('renders checkbox items correctly', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group">
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" />
      </CheckboxGroup>
    )

    const checkboxItems = screen.getAllByRole('checkbox')
    expect(checkboxItems.length).toBe(2)
    expect(checkboxItems[0].getAttribute('value')).toBe('option1')
    expect(checkboxItems[1].getAttribute('value')).toBe('option2')
  })

  it('can select multiple checkbox items', () => {
    const TestComponent = () => {
      const [values, setValues] = React.useState<string[]>([])
      return (
        <CheckboxGroup 
          aria-label="Test checkbox group" 
          value={values}
          onValueChange={setValues}
        >
          <CheckboxItem value="option1" aria-label="Option 1" />
          <CheckboxItem value="option2" aria-label="Option 2" />
        </CheckboxGroup>
      )
    }

    render(<TestComponent />)

    const firstCheckbox = screen.getByLabelText('Option 1')
    const secondCheckbox = screen.getByLabelText('Option 2')

    // Initially both should be unchecked
    expect(firstCheckbox.getAttribute('aria-checked')).toBe('false')
    expect(secondCheckbox.getAttribute('aria-checked')).toBe('false')

    // Click first checkbox
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox.getAttribute('aria-checked')).toBe('true')
    expect(secondCheckbox.getAttribute('aria-checked')).toBe('false')

    // Click second checkbox
    fireEvent.click(secondCheckbox)
    expect(firstCheckbox.getAttribute('aria-checked')).toBe('true')
    expect(secondCheckbox.getAttribute('aria-checked')).toBe('true')
  })

  it('can deselect checkbox items', () => {
    const handleChange = vi.fn()
    render(
      <CheckboxGroup 
        aria-label="Test checkbox group" 
        value={['option1', 'option2']}
        onValueChange={handleChange}
      >
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" />
      </CheckboxGroup>
    )

    const firstCheckbox = screen.getByLabelText('Option 1')
    fireEvent.click(firstCheckbox)
    expect(handleChange).toHaveBeenCalledWith(['option2'])
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <CheckboxGroup aria-label="Test checkbox group" value={['option1']}>
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" />
      </CheckboxGroup>
    )

    const firstCheckbox = screen.getByLabelText('Option 1')
    const secondCheckbox = screen.getByLabelText('Option 2')

    expect(firstCheckbox.getAttribute('aria-checked')).toBe('true')
    expect(secondCheckbox.getAttribute('aria-checked')).toBe('false')

    rerender(
      <CheckboxGroup aria-label="Test checkbox group" value={['option2']}>
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" />
      </CheckboxGroup>
    )

    expect(firstCheckbox.getAttribute('aria-checked')).toBe('false')
    expect(secondCheckbox.getAttribute('aria-checked')).toBe('true')
  })

  it('can be disabled', () => {
    const handleChange = vi.fn()
    render(
      <CheckboxGroup aria-label="Test checkbox group" disabled onValueChange={handleChange}>
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" />
      </CheckboxGroup>
    )

    const checkboxItems = screen.getAllByRole('checkbox')
    checkboxItems.forEach(checkbox => {
      expect(checkbox.getAttribute('data-disabled')).toBe('')
    })

    fireEvent.click(checkboxItems[0])
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports horizontal orientation', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group" orientation="horizontal">
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" />
      </CheckboxGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup.getAttribute('data-orientation')).toBe('horizontal')
  })

  it('applies custom className', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group" className="custom-class">
        <CheckboxItem value="option1" aria-label="Option 1" />
      </CheckboxGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup.className).toContain('custom-class')
  })

  it('handles empty value array correctly', () => {
    const handleChange = vi.fn()
    render(
      <CheckboxGroup aria-label="Test checkbox group" value={[]} onValueChange={handleChange}>
        <CheckboxItem value="option1" aria-label="Option 1" />
      </CheckboxGroup>
    )

    const checkbox = screen.getByLabelText('Option 1')
    expect(checkbox.getAttribute('aria-checked')).toBe('false')

    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(['option1'])
  })
})

describe('CheckboxItem', () => {
  it('renders correctly', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group">
        <CheckboxItem value="test" aria-label="Test option" />
      </CheckboxGroup>
    )

    const checkboxItem = screen.getByRole('checkbox')
    expect(checkboxItem).toBeDefined()
    expect(checkboxItem.getAttribute('value')).toBe('test')
  })

  it('works as standalone checkbox', () => {
    const handleChange = vi.fn()
    render(
      <CheckboxItem 
        value="standalone" 
        aria-label="Standalone checkbox"
        onCheckedChange={handleChange}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('supports indeterminate state', () => {
    render(
      <CheckboxItem 
        value="indeterminate" 
        aria-label="Indeterminate checkbox"
        checked="indeterminate"
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed')
  })

  it('can be individually disabled', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group">
        <CheckboxItem value="option1" aria-label="Option 1" />
        <CheckboxItem value="option2" aria-label="Option 2" disabled />
      </CheckboxGroup>
    )

    const firstCheckbox = screen.getByLabelText('Option 1')
    const secondCheckbox = screen.getByLabelText('Option 2')

    expect(firstCheckbox.getAttribute('data-disabled')).toBeNull()
    expect(secondCheckbox.getAttribute('data-disabled')).toBe('')
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group">
        <CheckboxItem value="test" aria-label="Test option" isInvalid />
      </CheckboxGroup>
    )

    const checkboxItem = screen.getByRole('checkbox')
    expect(checkboxItem.className).toContain('cds-checkbox-item--is-invalid')
  })

  it('applies custom className', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group">
        <CheckboxItem
          value="test"
          aria-label="Test option"
          className="custom-item-class"
        />
      </CheckboxGroup>
    )

    const checkboxItem = screen.getByRole('checkbox')
    expect(checkboxItem.className).toContain('custom-item-class')
  })

  it('supports form attributes', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group" name="test-group">
        <CheckboxItem
          value="test"
          aria-label="Test option"
          id="test-checkbox"
          required
        />
      </CheckboxGroup>
    )

    const checkboxItem = screen.getByRole('checkbox')
    expect(checkboxItem.getAttribute('id')).toBe('test-checkbox')
    expect(checkboxItem.getAttribute('value')).toBe('test')
  })

  it('supports aria attributes', () => {
    render(
      <CheckboxGroup aria-label="Test checkbox group">
        <CheckboxItem
          value="test"
          aria-label="Test option"
          aria-describedby="helper-text"
          aria-labelledby="label-text"
        />
      </CheckboxGroup>
    )

    const checkboxItem = screen.getByRole('checkbox')
    expect(checkboxItem.getAttribute('aria-label')).toBe('Test option')
    expect(checkboxItem.getAttribute('aria-describedby')).toBe('helper-text')
    expect(checkboxItem.getAttribute('aria-labelledby')).toBe('label-text')
  })

  it('prevents adding duplicates to group value', () => {
    const TestComponent = () => {
      const [values, setValues] = React.useState<string[]>(['option1'])
      return (
        <CheckboxGroup 
          aria-label="Test checkbox group" 
          value={values}
          onValueChange={setValues}
        >
          <CheckboxItem value="option1" aria-label="Option 1" />
        </CheckboxGroup>
      )
    }

    render(<TestComponent />)

    const checkbox = screen.getByLabelText('Option 1')
    // Should be checked initially
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
    
    // Click to uncheck
    fireEvent.click(checkbox)
    expect(checkbox.getAttribute('aria-checked')).toBe('false')
    
    // Click again to check - should not create duplicates
    fireEvent.click(checkbox)
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
  })
})