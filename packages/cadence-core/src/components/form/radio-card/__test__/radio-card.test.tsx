import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RadioCardGroup, RadioCardItem } from '../radio-card'
import { describe, it, expect, vi } from 'vitest'

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

    const radioItems = screen.getAllByRole('radio')
    expect(radioItems.length).toBe(2)
    expect(radioItems[0].getAttribute('value')).toBe('option1')
    expect(radioItems[1].getAttribute('value')).toBe('option2')
  })

  it('can select radio card items', () => {
    const handleChange = vi.fn()
    render(
      <RadioCardGroup aria-label="Test radio card group" onValueChange={handleChange}>
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    const radioItems = screen.getAllByRole('radio')
    const firstRadio = radioItems.find(item => item.getAttribute('value') === 'option1')
    fireEvent.click(firstRadio!)

    expect(handleChange).toHaveBeenCalledWith('option1')
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <RadioCardGroup aria-label="Test radio card group" value="option1">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    const radioItems = screen.getAllByRole('radio')
    const firstRadio = radioItems.find(item => item.getAttribute('value') === 'option1')!
    const secondRadio = radioItems.find(item => item.getAttribute('value') === 'option2')!

    expect(firstRadio.getAttribute('aria-checked')).toBe('true')
    expect(secondRadio.getAttribute('aria-checked')).toBe('false')

    rerender(
      <RadioCardGroup aria-label="Test radio card group" value="option2">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    expect(firstRadio.getAttribute('aria-checked')).toBe('false')
    expect(secondRadio.getAttribute('aria-checked')).toBe('true')
  })

  it('can be disabled', () => {
    const handleChange = vi.fn()
    render(
      <RadioCardGroup aria-label="Test radio card group" disabled onValueChange={handleChange}>
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" />
      </RadioCardGroup>
    )

    const radioItems = screen.getAllByRole('radio')
    radioItems.forEach(radio => {
      expect(radio.getAttribute('data-disabled')).toBe('')
    })

    fireEvent.click(radioItems[0])
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
    expect(radioGroup.className).toContain('cds-radio-card-group--columns-3')
  })

  it('applies gap classes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" gap="large">
        <RadioCardItem value="option1" title="Option 1" />
      </RadioCardGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup.className).toContain('cds-radio-card-group--gap-large')
  })
})

describe('RadioCardItem', () => {
  it('renders correctly with title and description', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem 
          value="test" 
          title="Test Title" 
          description="Test Description" 
        />
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

  it('can be individually disabled', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="option1" title="Option 1" />
        <RadioCardItem value="option2" title="Option 2" disabled />
      </RadioCardGroup>
    )

    const radioItems = screen.getAllByRole('radio')
    const firstRadio = radioItems.find(item => item.getAttribute('value') === 'option1')!
    const secondRadio = radioItems.find(item => item.getAttribute('value') === 'option2')!

    expect(firstRadio.getAttribute('data-disabled')).toBeNull()
    expect(secondRadio.getAttribute('data-disabled')).toBe('')
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test" title="Test option" isInvalid />
      </RadioCardGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.className).toContain('cds-radio-card-item--is-invalid')
  })

  it('applies size classes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test" title="Test option" size="large" />
      </RadioCardGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.className).toContain('cds-radio-card-item--size-large')
  })

  it('applies variant classes', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test" title="Test option" variant="outlined" />
      </RadioCardGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.className).toContain('cds-radio-card-item--variant-outlined')
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

    const radioItem = screen.getByRole('radio')
    expect(radioItem.className).toContain('custom-item-class')
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
    const radioGroup = screen.getByRole('radiogroup')
    
    expect(radioItem.getAttribute('id')).toBe('test-radio')
    expect(radioItem.getAttribute('value')).toBe('test')
    expect(radioGroup.getAttribute('aria-required')).toBe('true')
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

  it('has proper indicator element', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group">
        <RadioCardItem value="test" title="Test option" />
      </RadioCardGroup>
    )

    const radioItem = screen.getByRole('radio')
    const indicator = radioItem.querySelector('.cds-radio-card-item--indicator')
    expect(indicator).toBeDefined()
  })

  it('shows selected state correctly', () => {
    render(
      <RadioCardGroup aria-label="Test radio card group" value="test">
        <RadioCardItem value="test" title="Test option" />
        <RadioCardItem value="other" title="Other option" />
      </RadioCardGroup>
    )

    const radioItems = screen.getAllByRole('radio')
    const selectedRadio = radioItems.find(item => item.getAttribute('value') === 'test')!
    const unselectedRadio = radioItems.find(item => item.getAttribute('value') === 'other')!

    expect(selectedRadio.getAttribute('aria-checked')).toBe('true')
    expect(unselectedRadio.getAttribute('aria-checked')).toBe('false')
  })
})