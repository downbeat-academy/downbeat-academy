import React, { forwardRef } from 'react'
import { Root as RadioGroupRoot, Item as RadioGroupItem, Indicator as RadioGroupIndicator } from '@radix-ui/react-radio-group'
import classnames from 'classnames'
import s from './radio-card.module.css'
import type { RadioCardGroupProps, RadioCardItemProps } from './types'

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
    s['cds-radio-card-group--root'],
    columns && s[`cds-radio-card-group--columns-${columns}`],
    s[`cds-radio-card-group--gap-${gap}`],
    className
  )

  return (
    <RadioGroupRoot
      ref={ref}
      value={value}
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
      {...props}
    >
      {children}
    </RadioGroupRoot>
  )
})

const RadioCardItem = forwardRef<HTMLButtonElement, RadioCardItemProps>(({
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
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s['cds-radio-card-item--root'],
    s[`cds-radio-card-item--size-${size}`],
    s[`cds-radio-card-item--variant-${variant}`],
    isInvalid && s['cds-radio-card-item--is-invalid'],
    className
  )

  const indicatorClasses = classnames(
    s['cds-radio-card-item--indicator']
  )

  // If children is provided, use it directly
  // Otherwise, build the content from props
  const content = children || (
    <div className={s['cds-radio-card-item--content']}>
      <div className={s['cds-radio-card-item--header']}>
        {icon && (
          <div className={s['cds-radio-card-item--icon']}>
            {icon}
          </div>
        )}
        <div className={s['cds-radio-card-item--text-content']}>
          {title && (
            <h3 className={s['cds-radio-card-item--title']}>
              {title}
            </h3>
          )}
          {description && (
            <p className={s['cds-radio-card-item--description']}>
              {description}
            </p>
          )}
        </div>
        {badge && (
          <div className={s['cds-radio-card-item--badge']}>
            {badge}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <RadioGroupItem
      ref={ref}
      value={value}
      disabled={disabled}
      required={required}
      id={id}
      className={rootClasses}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {content}
      <RadioGroupIndicator className={indicatorClasses} />
    </RadioGroupItem>
  )
})

RadioCardGroup.displayName = 'RadioCardGroup'
RadioCardItem.displayName = 'RadioCardItem'

export { RadioCardGroup, RadioCardItem }
export type { RadioCardGroupProps, RadioCardItemProps }