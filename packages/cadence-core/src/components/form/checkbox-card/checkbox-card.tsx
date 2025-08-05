import React, { forwardRef, createContext, useContext } from 'react'
import { Root as CheckboxRoot, Indicator as CheckboxIndicator } from '@radix-ui/react-checkbox'
import classnames from 'classnames'
import s from './checkbox-card.module.css'
import type { CheckboxCardGroupProps, CheckboxCardItemProps } from './types'

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

const CheckboxCardItem = forwardRef<HTMLButtonElement, CheckboxCardItemProps>(({
  value,
  disabled,
  required,
  id,
  isInvalid,
  className,
  children,
  size = 'medium',
  variant = 'default',
  icon,
  title,
  description,
  badge,
  checked,
  onCheckedChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const context = useContext(CheckboxCardGroupContext)
  
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
    s['item-root'],
    s[`item-size-${size}`],
    s[`item-variant-${variant}`],
    finalIsInvalid && s['item-is-invalid'],
    className
  )

  const indicatorClasses = classnames(
    s['item-indicator']
  )

  // If children is provided, use it directly
  // Otherwise, build the content from props
  const content = children || (
    <div className={s['item-content']}>
      <div className={s['item-header']}>
        {icon && (
          <div className={s['item-icon']}>
            {icon}
          </div>
        )}
        <div className={s['item-text-content']}>
          {title && (
            <h3 className={s['item-title']}>
              {title}
            </h3>
          )}
          {description && (
            <p className={s['item-description']}>
              {description}
            </p>
          )}
        </div>
        {badge && (
          <div className={s['item-badge']}>
            {badge}
          </div>
        )}
      </div>
    </div>
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
      {content}
      <CheckboxIndicator className={indicatorClasses}>
        {finalChecked === 'indeterminate' ? <Minus /> : <CheckMark />}
      </CheckboxIndicator>
    </CheckboxRoot>
  )
})

CheckboxCardGroup.displayName = 'CheckboxCardGroup'
CheckboxCardItem.displayName = 'CheckboxCardItem'

export { CheckboxCardGroup, CheckboxCardItem }
export type { CheckboxCardGroupProps, CheckboxCardItemProps }