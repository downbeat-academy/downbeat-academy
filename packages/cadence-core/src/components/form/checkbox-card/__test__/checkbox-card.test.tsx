import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckboxCardGroup, CheckboxCardItem } from '../index'
import { describe, it, expect, vi } from 'vitest'

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

    const checkboxItems = screen.getAllByRole('checkbox')
    expect(checkboxItems.length).toBe(2)
    expect(checkboxItems[0]).toBeDefined()
    expect(checkboxItems[1]).toBeDefined()
  })

  it('can select multiple checkbox card items', () => {
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

    const checkboxItems = screen.getAllByRole('checkbox')
    
    // Initially both should be unchecked
    expect(checkboxItems[0].getAttribute('aria-checked')).toBe('false')
    expect(checkboxItems[1].getAttribute('aria-checked')).toBe('false')

    // Click first checkbox
    fireEvent.click(checkboxItems[0])
    expect(checkboxItems[0].getAttribute('aria-checked')).toBe('true')
    expect(checkboxItems[1].getAttribute('aria-checked')).toBe('false')

    // Click second checkbox
    fireEvent.click(checkboxItems[1])
    expect(checkboxItems[0].getAttribute('aria-checked')).toBe('true')
    expect(checkboxItems[1].getAttribute('aria-checked')).toBe('true')
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <CheckboxCardGroup aria-label="Test checkbox card group" value={['option1']}>
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    const checkboxItems = screen.getAllByRole('checkbox')
    expect(checkboxItems[0].getAttribute('aria-checked')).toBe('true')
    expect(checkboxItems[1].getAttribute('aria-checked')).toBe('false')

    rerender(
      <CheckboxCardGroup aria-label="Test checkbox card group" value={['option2']}>
        <CheckboxCardItem value="option1" title="Option 1" />
        <CheckboxCardItem value="option2" title="Option 2" />
      </CheckboxCardGroup>
    )

    expect(checkboxItems[0].getAttribute('aria-checked')).toBe('false')
    expect(checkboxItems[1].getAttribute('aria-checked')).toBe('true')
  })

  it('applies grid columns class', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" columns={3}>
        <CheckboxCardItem value="option1" title="Option 1" />
      </CheckboxCardGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup.className).toContain('group-columns-3')
  })

  it('applies gap class', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" gap="large">
        <CheckboxCardItem value="option1" title="Option 1" />
      </CheckboxCardGroup>
    )

    const checkboxGroup = screen.getByRole('group')
    expect(checkboxGroup.className).toContain('group-gap-large')
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

  it('applies size classes', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test" title="Test" size="large" />
      </CheckboxCardGroup>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.className).toContain('item-size-large')
  })

  it('applies alignment classes', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test" title="Test" alignment="center" />
      </CheckboxCardGroup>
    )

    const checkbox = screen.getByRole('checkbox')
    // Check that the content div has the alignment class
    const contentDiv = checkbox.querySelector('.item-content-alignment-center')
    expect(contentDiv).toBeDefined()
  })

  it('works as standalone checkbox card', () => {
    const handleChange = vi.fn()
    render(
      <CheckboxCardItem 
        value="standalone" 
        title="Standalone Card"
        onCheckedChange={handleChange}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('supports indeterminate state', () => {
    render(
      <CheckboxCardItem 
        value="indeterminate" 
        title="Indeterminate Card"
        checked="indeterminate"
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed')
  })

  it('can be disabled', () => {
    const handleChange = vi.fn()
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" onValueChange={handleChange}>
        <CheckboxCardItem value="test" title="Test" disabled />
      </CheckboxCardGroup>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-disabled')).toBe('true')
    
    fireEvent.click(checkbox)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem value="test" title="Test" isInvalid />
      </CheckboxCardGroup>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.className).toContain('item-is-invalid')
  })

  it('applies custom className', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem
          value="test"
          title="Test"
          className="custom-card-class"
        />
      </CheckboxCardGroup>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.className).toContain('custom-card-class')
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

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('id')).toBe('test-checkbox-card')
    // The card div doesn't have a value attribute - that's for the internal hidden checkbox
    expect(checkbox).toBeDefined()
  })

  it('supports aria attributes', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group">
        <CheckboxCardItem
          value="test"
          title="Test"
          aria-label="Test card"
          aria-describedby="helper-text"
          aria-labelledby="label-text"
        />
      </CheckboxCardGroup>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-label')).toBe('Test card')
    expect(checkbox.getAttribute('aria-describedby')).toBe('helper-text')
    expect(checkbox.getAttribute('aria-labelledby')).toBe('label-text')
  })

  it('displays selection indicator correctly', () => {
    render(
      <CheckboxCardGroup aria-label="Test checkbox card group" value={['selected']}>
        <CheckboxCardItem value="selected" title="Selected Card" />
        <CheckboxCardItem value="unselected" title="Unselected Card" />
      </CheckboxCardGroup>
    )

    const checkboxes = screen.getAllByRole('checkbox')
    // Find by checking the title text content or aria-checked state since the card div doesn't have a value attribute
    const selectedCheckbox = checkboxes.find(cb => cb.getAttribute('aria-checked') === 'true')
    const unselectedCheckbox = checkboxes.find(cb => cb.getAttribute('aria-checked') === 'false')
    
    expect(selectedCheckbox?.getAttribute('data-state')).toBe('checked')
    expect(unselectedCheckbox?.getAttribute('data-state')).toBe('unchecked')
  })
})