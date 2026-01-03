import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RadioGroup, Radio } from '../radio'
import { describe, it, expect, vi } from 'vitest'

describe('RadioGroup', () => {
  it('renders correctly', () => {
    render(
      <RadioGroup aria-label="Test radio group">
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" />
      </RadioGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup).toBeDefined()
    expect(radioGroup.getAttribute('aria-label')).toBe('Test radio group')
  })

  it('renders radio items correctly', () => {
    render(
      <RadioGroup aria-label="Test radio group">
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" />
      </RadioGroup>
    )

    const radioItems = screen.getAllByRole('radio')
    expect(radioItems.length).toBe(2)
    expect(radioItems[0].getAttribute('value')).toBe('option1')
    expect(radioItems[1].getAttribute('value')).toBe('option2')
  })

  it('can select radio items', () => {
    const handleChange = vi.fn()
    render(
      <RadioGroup aria-label="Test radio group" onValueChange={handleChange}>
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" />
      </RadioGroup>
    )

    const firstRadio = screen.getByLabelText('Option 1')
    fireEvent.click(firstRadio)

    expect(handleChange).toHaveBeenCalledWith('option1')
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <RadioGroup aria-label="Test radio group" value="option1">
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" />
      </RadioGroup>
    )

    const firstRadio = screen.getByLabelText('Option 1')
    const secondRadio = screen.getByLabelText('Option 2')

    expect(firstRadio.getAttribute('aria-checked')).toBe('true')
    expect(secondRadio.getAttribute('aria-checked')).toBe('false')

    rerender(
      <RadioGroup aria-label="Test radio group" value="option2">
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" />
      </RadioGroup>
    )

    expect(firstRadio.getAttribute('aria-checked')).toBe('false')
    expect(secondRadio.getAttribute('aria-checked')).toBe('true')
  })

  it('can be disabled', () => {
    const handleChange = vi.fn()
    render(
      <RadioGroup aria-label="Test radio group" disabled onValueChange={handleChange}>
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" />
      </RadioGroup>
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
      <RadioGroup aria-label="Test radio group" orientation="horizontal">
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" />
      </RadioGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup.getAttribute('data-orientation')).toBe('horizontal')
  })

  it('applies custom className', () => {
    render(
      <RadioGroup aria-label="Test radio group" className="custom-class">
        <Radio value="option1" aria-label="Option 1" />
      </RadioGroup>
    )

    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup.className).toContain('custom-class')
  })
})

describe('Radio', () => {
  it('renders correctly', () => {
    render(
      <RadioGroup aria-label="Test radio group">
        <Radio value="test" aria-label="Test option" />
      </RadioGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem).toBeDefined()
    expect(radioItem.getAttribute('value')).toBe('test')
  })

  it('can be individually disabled', () => {
    render(
      <RadioGroup aria-label="Test radio group">
        <Radio value="option1" aria-label="Option 1" />
        <Radio value="option2" aria-label="Option 2" disabled />
      </RadioGroup>
    )

    const firstRadio = screen.getByLabelText('Option 1')
    const secondRadio = screen.getByLabelText('Option 2')

    expect(firstRadio.getAttribute('data-disabled')).toBeNull()
    expect(secondRadio.getAttribute('data-disabled')).toBe('')
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <RadioGroup aria-label="Test radio group">
        <Radio value="test" aria-label="Test option" isInvalid />
      </RadioGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.className).toContain('isInvalid')
  })

  it('applies custom className', () => {
    render(
      <RadioGroup aria-label="Test radio group">
        <Radio
          value="test"
          aria-label="Test option"
          className="custom-item-class"
        />
      </RadioGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.className).toContain('custom-item-class')
  })

  it('supports form attributes', () => {
    render(
      <RadioGroup aria-label="Test radio group" name="test-group">
        <Radio
          value="test"
          aria-label="Test option"
          id="test-radio"
          required
        />
      </RadioGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.getAttribute('id')).toBe('test-radio')
    // Note: name and required attributes are handled internally by Radix UI for proper form behavior
    expect(radioItem.getAttribute('value')).toBe('test')
  })

  it('supports aria attributes', () => {
    render(
      <RadioGroup aria-label="Test radio group">
        <Radio
          value="test"
          aria-label="Test option"
          aria-describedby="helper-text"
          aria-labelledby="label-text"
        />
      </RadioGroup>
    )

    const radioItem = screen.getByRole('radio')
    expect(radioItem.getAttribute('aria-label')).toBe('Test option')
    expect(radioItem.getAttribute('aria-describedby')).toBe('helper-text')
    expect(radioItem.getAttribute('aria-labelledby')).toBe('label-text')
  })
})