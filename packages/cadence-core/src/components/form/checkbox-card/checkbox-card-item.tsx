import React, { forwardRef, useContext } from 'react'
import classnames from 'classnames'
import { Checkbox } from '../checkbox'
import { Text } from '../../text'
import { CheckboxCardGroupContext } from './checkbox-card-group'
import s from './checkbox-card.module.css'
import type { CheckboxCardItemProps } from './types'

const CheckboxCardItem = forwardRef<HTMLDivElement, CheckboxCardItemProps>(({
  value,
  disabled,
  required,
  id,
  isInvalid,
  className,
  children,
  size = 'medium',
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

  if (!value) {
    throw new Error('CheckboxCardItem requires a value prop')
  }

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
    finalIsInvalid && s['item-is-invalid'],
    className
  )

  const itemContentClasses = classnames(
    s[`item-content`],
    s[`item-content-alignment-${alignment}`],
  )

  const indicatorAreaClasses = classnames(
    s[`item-indicator-area`]
  )

  const indicatorClasses = classnames(
    s['item-indicator']
  )

  const content = (
    <div className={itemContentClasses}>
      {icon && (
        <div className={s['item-icon']}>
          {icon}
        </div>
      )}
      {title && (
        <Text
          className={s['item-title']}
          tag="h3"
          type="productive-headline"
          size="h6"
          color="strong"
          align={alignment}
          collapse
        >
          {title}
        </Text>
      )}
      {badge && (
        <div className={s['item-badge']}>
          {badge}
        </div>
      )}
      {children}
    </div>
  )

  return (
    <div
      ref={ref}
      className={rootClasses}
      onClick={() => !finalDisabled && finalOnCheckedChange?.(!finalChecked)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      data-state={finalChecked === 'indeterminate' ? 'indeterminate' : finalChecked ? 'checked' : 'unchecked'}
      data-disabled={finalDisabled || undefined}
      {...props}
    >
      {content}
      <div className={indicatorAreaClasses}>
        <Checkbox
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