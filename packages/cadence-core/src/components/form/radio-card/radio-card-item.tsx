import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Radio } from '../radio'
import { Text } from '../../text'
import s from './radio-card.module.css'
import type { RadioCardItemProps } from './types'

const RadioCardItem = forwardRef<HTMLDivElement, RadioCardItemProps>(({
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
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  _groupValue,
  _groupOnValueChange,
  _groupDisabled,
  _groupRequired,
  _groupName,
  _groupIsInvalid,
  ...props
}, ref) => {
  if (!value) {
    throw new Error('RadioCardItem requires a value prop')
  }

  // Use group props if available, otherwise use individual props
  const finalDisabled = disabled ?? _groupDisabled
  const finalRequired = required ?? _groupRequired
  const finalIsInvalid = isInvalid ?? _groupIsInvalid

  // Check if this item is selected based on group value
  const isSelected = _groupValue === value

  const rootClasses = classnames(
    s['item-root'],
    s[`item-size-${size}`],
    s[`item-alignment-${alignment}`],
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
      onClick={() => !finalDisabled && _groupOnValueChange?.(value)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      data-state={isSelected ? 'checked' : 'unchecked'}
      data-disabled={finalDisabled || undefined}
      {...props}
    >
      {content}
      <div className={indicatorAreaClasses}>
        <Radio
          value={value}
          checked={isSelected}
          disabled={finalDisabled}
          required={finalRequired}
          id={id}
          isInvalid={finalIsInvalid}
          className={indicatorClasses}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </div>
  )
})

RadioCardItem.displayName = 'RadioCardItem'

export { RadioCardItem }