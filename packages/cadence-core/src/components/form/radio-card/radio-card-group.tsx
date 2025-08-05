import React, { forwardRef, createContext } from 'react'
import classnames from 'classnames'
import { RadioGroup } from '../radio'
import s from './radio-card.module.css'
import type { RadioCardGroupProps } from './types'

// Context for RadioCardGroup
interface RadioCardGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  name?: string
  isInvalid?: boolean
}

const RadioCardGroupContext = createContext<RadioCardGroupContextValue | null>(null)

const RadioCardGroup = forwardRef<HTMLDivElement, RadioCardGroupProps>(({
  value,
  onValueChange,
  disabled,
  required,
  name,
  orientation = 'vertical',
  loop = true,
  isInvalid,
  className,
  children,
  columns,
  gap = 'base',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s['group-root'],
    columns && s[`group-columns-${columns}`],
    s[`group-gap-${gap}`],
    className
  )

  const contextValue = {
    value,
    onValueChange,
    disabled,
    required,
    name,
    isInvalid
  }

  const { defaultValue, dir, ...restProps } = props

  return (
    <RadioCardGroupContext.Provider value={contextValue}>
      <RadioGroup
        ref={ref}
        value={value}
        defaultValue={typeof defaultValue === 'string' ? defaultValue : undefined}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
        name={name}
        orientation={orientation}
        loop={loop}
        className={rootClasses}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        {...restProps}
      >
        {children}
      </RadioGroup>
    </RadioCardGroupContext.Provider>
  )
})

RadioCardGroup.displayName = 'RadioCardGroup'

export { RadioCardGroup, RadioCardGroupContext }