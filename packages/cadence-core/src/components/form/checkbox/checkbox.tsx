import React, { forwardRef, createContext, useContext } from 'react'
import { Root as CheckboxRoot, Indicator as CheckboxIndicator } from '@radix-ui/react-checkbox'
import classnames from 'classnames'
import s from './checkbox.module.css'
import type { CheckboxGroupProps, CheckboxItemProps } from './types'

// CheckMark icon for checked state
const CheckMark = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Minus icon for indeterminate state
const Minus = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 6H9.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

// Context for CheckboxGroup
interface CheckboxGroupContextValue {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  required?: boolean
  name?: string
  isInvalid?: boolean
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(({
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
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s['cds-checkbox-group--root'],
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
    <CheckboxGroupContext.Provider value={contextValue}>
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
    </CheckboxGroupContext.Provider>
  )
})

const CheckboxItem = forwardRef<HTMLButtonElement, CheckboxItemProps>(({
  value,
  disabled,
  required,
  id,
  isInvalid,
  className,
  checked,
  onCheckedChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const context = useContext(CheckboxGroupContext)
  
  // Use context values if available, otherwise use props
  const finalDisabled = disabled ?? context?.disabled
  const finalRequired = required ?? context?.required
  const finalIsInvalid = isInvalid ?? context?.isInvalid
  
  // Handle group vs individual checkbox logic
  const isGrouped = context !== null
  let finalChecked = checked
  let finalOnCheckedChange = onCheckedChange

  if (isGrouped) {
    const currentValue = context.value || []
    finalChecked = currentValue.includes(value)
    
    if (context.onValueChange) {
      finalOnCheckedChange = (newChecked: boolean) => {
        const currentValueAtTime = context.value || []
        if (newChecked) {
          // Add to array if not present
          if (!currentValueAtTime.includes(value)) {
            context.onValueChange?.([...currentValueAtTime, value])
          }
        } else {
          // Remove from array
          context.onValueChange?.(currentValueAtTime.filter(v => v !== value))
        }
      }
    }
  }

  const rootClasses = classnames(
    s['cds-checkbox-item--root'],
    finalIsInvalid && s['cds-checkbox-item--is-invalid'],
    className
  )

  const indicatorClasses = classnames(
    s['cds-checkbox-item--indicator']
  )

  return (
    <CheckboxRoot
      ref={ref}
      checked={finalChecked}
      onCheckedChange={finalOnCheckedChange}
      disabled={finalDisabled}
      required={finalRequired}
      id={id}
      name={context?.name}
      value={value}
      className={rootClasses}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      <CheckboxIndicator className={indicatorClasses}>
        {finalChecked === 'indeterminate' ? <Minus /> : <CheckMark />}
      </CheckboxIndicator>
    </CheckboxRoot>
  )
})

CheckboxGroup.displayName = 'CheckboxGroup'
CheckboxItem.displayName = 'CheckboxItem'

export { CheckboxGroup, CheckboxItem }
export type { CheckboxGroupProps, CheckboxItemProps }