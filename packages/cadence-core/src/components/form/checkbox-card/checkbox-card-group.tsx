import React, { forwardRef, createContext } from 'react'
import classnames from 'classnames'
import s from './checkbox-card.module.css'
import type { CheckboxCardGroupProps } from './types'

// Context for CheckboxCardGroup
interface CheckboxCardGroupContextValue {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  required?: boolean
  name?: string
  isInvalid?: boolean
}

const CheckboxCardGroupContext = createContext<CheckboxCardGroupContextValue | null>(null)

const CheckboxCardGroup = forwardRef<HTMLDivElement, CheckboxCardGroupProps>(({
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  name,
  orientation = 'vertical',
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
    defaultValue,
    onValueChange,
    disabled,
    required,
    name,
    isInvalid
  }

  return (
    <CheckboxCardGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={rootClasses}
        data-orientation={orientation}
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        {...props}
      >
        {children}
      </div>
    </CheckboxCardGroupContext.Provider>
  )
})

CheckboxCardGroup.displayName = 'CheckboxCardGroup'

export { CheckboxCardGroup, CheckboxCardGroupContext }