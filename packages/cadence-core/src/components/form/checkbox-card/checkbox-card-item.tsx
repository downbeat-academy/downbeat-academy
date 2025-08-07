import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Checkbox } from '../checkbox'
import { Text } from '../../text'
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
  _groupValue,
  _groupDefaultValue,
  _groupOnValueChange,
  _groupDisabled,
  _groupRequired,
  _groupName,
  _groupIsInvalid,
  ...props
}, ref) => {
  if (!value) {
    throw new Error('CheckboxCardItem requires a value prop')
  }

  // Use group props if available, otherwise use individual props
  const finalDisabled = disabled ?? _groupDisabled
  const finalRequired = required ?? _groupRequired
  const finalIsInvalid = isInvalid ?? _groupIsInvalid

  // Handle group vs individual checkbox logic
  const isGrouped = _groupValue !== undefined || _groupOnValueChange !== undefined
  let finalChecked = checked
  let finalOnCheckedChange = onCheckedChange

  if (isGrouped) {
    const currentValue = _groupValue || []
    finalChecked = currentValue.includes(value)
    
    if (_groupOnValueChange) {
      finalOnCheckedChange = (newChecked: boolean) => {
        const currentValueAtTime = _groupValue || []
        if (newChecked) {
          // Add to array if not present
          if (!currentValueAtTime.includes(value)) {
            _groupOnValueChange([...currentValueAtTime, value])
          }
        } else {
          // Remove from array
          _groupOnValueChange(currentValueAtTime.filter(v => v !== value))
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (finalDisabled) return
    
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      finalOnCheckedChange?.(!finalChecked)
    }
  }

  return (
    <div
      ref={ref}
      id={id}
      className={rootClasses}
      onClick={() => !finalDisabled && finalOnCheckedChange?.(!finalChecked)}
      onKeyDown={handleKeyDown}
      tabIndex={finalDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={finalChecked === 'indeterminate' ? 'mixed' : finalChecked}
      aria-disabled={finalDisabled}
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
          disabled={finalDisabled}
          required={finalRequired}
          name={_groupName}
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