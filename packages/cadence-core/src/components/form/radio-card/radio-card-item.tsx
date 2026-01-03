import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Radio } from '../radio'
import { Text } from '../../text'
import s from './radio-card.module.css'
import type { RadioCardItemProps } from './types'

const sizeClassMap: Record<string, string> = {
  small: s.itemSizeSmall,
  medium: s.itemSizeMedium,
  large: s.itemSizeLarge,
}

const alignmentClassMap: Record<string, string> = {
  left: s.itemContentAlignmentLeft,
  center: s.itemContentAlignmentCenter,
}

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
    s.itemRoot,
    sizeClassMap[size],
    finalIsInvalid && s.itemIsInvalid,
    className
  )

  const itemContentClasses = classnames(
    s.itemContent,
    alignmentClassMap[alignment],
  )

  const content = (
    <div className={itemContentClasses}>
      {icon && (
        <div className={s.itemIcon}>
          {icon}
        </div>
      )}
      {title && (
        <Text
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
        <div>
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
      <div className={s.itemIndicatorArea}>
        <Radio
          value={value}
          checked={isSelected}
          disabled={finalDisabled}
          required={finalRequired}
          id={id}
          isInvalid={finalIsInvalid}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </div>
  )
})

RadioCardItem.displayName = 'RadioCardItem'

export { RadioCardItem }
