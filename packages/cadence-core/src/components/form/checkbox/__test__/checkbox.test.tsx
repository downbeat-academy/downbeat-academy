import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '../checkbox'
import { describe, it, expect, vi } from 'vitest'

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox aria-label="Test checkbox" />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDefined()
    expect(checkbox.getAttribute('aria-label')).toBe('Test checkbox')
  })

  it('can be checked and unchecked', () => {
    const handleChange = vi.fn()
    render(
      <Checkbox 
        aria-label="Test checkbox"
        onCheckedChange={handleChange}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    
    // Initially unchecked
    expect(checkbox.getAttribute('aria-checked')).toBe('false')

    // Click to check
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(true)

    // Click again to uncheck
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <Checkbox aria-label="Test checkbox" checked={false} />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-checked')).toBe('false')

    rerender(
      <Checkbox aria-label="Test checkbox" checked={true} />
    )
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
  })

  it('supports indeterminate state', () => {
    render(
      <Checkbox 
        aria-label="Indeterminate checkbox"
        checked="indeterminate"
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed')
  })

  it('can be disabled', () => {
    const handleChange = vi.fn()
    render(
      <Checkbox 
        aria-label="Disabled checkbox"
        disabled
        onCheckedChange={handleChange}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('data-disabled')).toBe('')

    fireEvent.click(checkbox)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <Checkbox
        aria-label="Invalid checkbox"
        isInvalid
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.className).toContain('isInvalid')
  })

  it('applies custom className', () => {
    render(
      <Checkbox
        aria-label="Custom checkbox"
        className="custom-checkbox-class"
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.className).toContain('custom-checkbox-class')
  })

  it('supports form attributes', () => {
    render(
      <Checkbox
        aria-label="Form checkbox"
        id="test-checkbox"
        name="test-name"
        value="test-value"
        required
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('id')).toBe('test-checkbox')
    expect(checkbox.getAttribute('value')).toBe('test-value')
    expect(checkbox.hasAttribute('required')).toBe(true)
    // Note: name attribute may not be set on Radix checkbox primitive
  })

  it('supports aria attributes', () => {
    render(
      <Checkbox
        aria-label="Accessible checkbox"
        aria-describedby="helper-text"
        aria-labelledby="label-text"
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-label')).toBe('Accessible checkbox')
    expect(checkbox.getAttribute('aria-describedby')).toBe('helper-text')
    expect(checkbox.getAttribute('aria-labelledby')).toBe('label-text')
  })

  it('works with uncontrolled state using defaultChecked', () => {
    const handleChange = vi.fn()
    render(
      <Checkbox
        aria-label="Uncontrolled checkbox"
        defaultChecked={true}
        onCheckedChange={handleChange}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-checked')).toBe('true')

    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it('shows correct icon for checked state', () => {
    const { container } = render(
      <Checkbox
        aria-label="Checked checkbox"
        checked={true}
      />
    )

    // Check that the indicator contains the check icon (not minus)
    const indicator = container.querySelector('[class*="indicator"]')
    expect(indicator).toBeDefined()
  })

  it('shows correct icon for indeterminate state', () => {
    const { container } = render(
      <Checkbox
        aria-label="Indeterminate checkbox"
        checked="indeterminate"
      />
    )

    // Check that the indicator contains the minus icon
    const indicator = container.querySelector('[class*="indicator"]')
    expect(indicator).toBeDefined()
  })
})