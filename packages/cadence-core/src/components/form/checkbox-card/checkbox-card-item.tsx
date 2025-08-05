import React, { forwardRef, useContext } from 'react'
import classnames from 'classnames'
import { Checkbox } from '../checkbox'
import { Text } from '../../text'
import { CheckboxCardGroupContext } from './checkbox-card-group'
import s from './checkbox-card.module.css'
import type { CheckboxCardItemProps } from './types'

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
  alignment = 'left',
  icon,
  title,
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
    if (!value) {
      throw new Error('CheckboxCardItem requires a value prop when used within CheckboxCardGroup')
    }
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
    s[`item-alignment-${alignment}`],
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
            <Text 
              className={s['item-title']}
              tag="h3"
              type="productive-headline"
              size="h6"
              color="strong"
              align={alignment}
            >
              {title}
            </Text>
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
    <div
      className={rootClasses}
      onClick={() => !finalDisabled && finalOnCheckedChange?.(!finalChecked)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      data-state={finalChecked === 'indeterminate' ? 'indeterminate' : finalChecked ? 'checked' : 'unchecked'}
      data-disabled={finalDisabled || undefined}
      {...props}
    >
      <div className={s['item-content-wrapper']}>
        {content}
      </div>
      <div className={s['item-indicator-area']}>
        <Checkbox
          ref={ref}
          checked={finalChecked}
          onCheckedChange={finalOnCheckedChange}
          disabled={finalDisabled}
          required={finalRequired}
          id={id}
          name={context?.name}
          value={value}
          isInvalid={finalIsInvalid}
          className={indicatorClasses}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </div>
  )
})

CheckboxCardItem.displayName = 'CheckboxCardItem'

export { CheckboxCardItem }