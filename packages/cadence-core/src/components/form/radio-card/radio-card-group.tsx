import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { RadioGroup } from '../radio'
import s from './radio-card.module.css'
import type { RadioCardGroupProps } from './types'

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
    s['group-root'],
    columns && s[`group-columns-${columns}`],
    s[`group-gap-${gap}`],
    className
  )

  const { defaultValue, dir, ...restProps } = props

  // Clone children and pass down group props
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<Record<string, unknown>>(child)) {
      return React.cloneElement(child, {
        // Pass down group props to each RadioCardItem
        _groupValue: value,
        _groupOnValueChange: onValueChange,
        _groupDisabled: disabled,
        _groupRequired: required,
        _groupName: name,
        _groupIsInvalid: isInvalid,
        ...(child.props as Record<string, unknown>) // Keep existing child props, they take precedence
      })
    }
    return child
  })

  return (
    <RadioGroup
      ref={ref}
      value={value}
      defaultValue={typeof defaultValue === 'string' ? defaultValue : undefined}
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
      {...restProps}
    >
      {clonedChildren}
    </RadioGroup>
  )
})

RadioCardGroup.displayName = 'RadioCardGroup'

export { RadioCardGroup }