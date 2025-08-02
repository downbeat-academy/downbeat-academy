import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from '../switch'
import { describe, it, expect, vi } from 'vitest'

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch aria-label="Test switch" />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeInTheDocument()
  })

  it('can be checked and unchecked', () => {
    const handleChange = vi.fn()
    render(
      <Switch 
        aria-label="Test switch" 
        onCheckedChange={handleChange}
      />
    )
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')
    
    fireEvent.click(switchElement)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('respects controlled state', () => {
    const { rerender } = render(
      <Switch 
        aria-label="Test switch" 
        checked={false}
      />
    )
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')
    
    rerender(
      <Switch 
        aria-label="Test switch" 
        checked={true}
      />
    )
    
    expect(switchElement).toHaveAttribute('aria-checked', 'true')
  })

  it('can be disabled', () => {
    const handleChange = vi.fn()
    render(
      <Switch 
        aria-label="Test switch" 
        disabled
        onCheckedChange={handleChange}
      />
    )
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeDisabled()
    
    fireEvent.click(switchElement)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(
      <Switch 
        aria-label="Test switch" 
        className="custom-class"
      />
    )
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('custom-class')
  })

  it('supports name attribute for forms', () => {
    render(
      <Switch 
        aria-label="Test switch" 
        name="notifications"
        value="enabled"
      />
    )
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('name', 'notifications')
    expect(switchElement).toHaveAttribute('value', 'enabled')
  })

  it('applies invalid styles when isInvalid is true', () => {
    render(
      <Switch 
        aria-label="Test switch" 
        isInvalid
      />
    )
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('cds-switch--is-invalid')
  })

  it('supports aria attributes', () => {
    render(
      <Switch 
        aria-label="Test switch"
        aria-describedby="helper-text"
        aria-labelledby="label-text"
      />
    )
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-label', 'Test switch')
    expect(switchElement).toHaveAttribute('aria-describedby', 'helper-text')
    expect(switchElement).toHaveAttribute('aria-labelledby', 'label-text')
  })
})