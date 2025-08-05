import React, { forwardRef, useContext } from 'react'
import classnames from 'classnames'
import { Radio } from '../radio'
import { Text } from '../../text'
import { RadioCardGroupContext } from './radio-card-group'
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
  ...props
}, ref) => {
  const context = useContext(RadioCardGroupContext)

  if (!value) {
    throw new Error('RadioCardItem requires a value prop')
  }

  // Use context values if available, otherwise use props
  const finalDisabled = disabled ?? context?.disabled
  const finalRequired = required ?? context?.required
  const finalIsInvalid = isInvalid ?? context?.isInvalid

  // Handle group vs individual radio logic
  const isGrouped = context !== null
  const isSelected = isGrouped ? context.value === value : false

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
      onClick={() => !finalDisabled && context?.onValueChange?.(value)}
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