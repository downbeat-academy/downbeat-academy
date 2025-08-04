import React, { forwardRef } from 'react'
import { Root as RadioGroupRoot, Item as RadioGroupItem, Indicator as RadioGroupIndicator } from '@radix-ui/react-radio-group'
import classnames from 'classnames'
import s from './radio.module.css'
import type { RadioGroupProps, RadioItemProps } from './types'

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
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
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s['cds-radio-group--root'],
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

const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(({
  value,
  disabled,
  required,
  id,
  isInvalid,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s['cds-radio-group-item--root'],
    isInvalid && s['cds-radio-group-item--is-invalid'],
    className
  )

  const indicatorClasses = classnames(
    s['cds-radio-group-item--indicator']
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
      <RadioGroupIndicator className={indicatorClasses} />
    </RadioGroupItem>
  )
})

RadioGroup.displayName = 'RadioGroup'
RadioItem.displayName = 'RadioItem'

export { RadioGroup, RadioItem }
export type { RadioGroupProps, RadioItemProps }