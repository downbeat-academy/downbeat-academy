import React, { forwardRef } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import classnames from 'classnames'
import s from './radio.module.css'
import type { RadioGroupProps, RadioGroupItemProps } from './types'

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
    <RadioGroupPrimitive.Root
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
    </RadioGroupPrimitive.Root>
  )
})

const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(({
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
    <RadioGroupPrimitive.Item
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
      <RadioGroupPrimitive.Indicator className={indicatorClasses} />
    </RadioGroupPrimitive.Item>
  )
})

RadioGroup.displayName = 'RadioGroup'
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
export type { RadioGroupProps, RadioGroupItemProps }