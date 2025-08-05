import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './checkbox-card.module.css'
import type { CheckboxCardGroupProps } from './types'

const CheckboxCardGroup = forwardRef<HTMLDivElement, CheckboxCardGroupProps>(({
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  name,
  orientation = 'vertical',
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

  // Clone children and pass down group props
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // Pass down group props to each CheckboxCardItem
        _groupValue: value,
        _groupDefaultValue: defaultValue,
        _groupOnValueChange: onValueChange,
        _groupDisabled: disabled,
        _groupRequired: required,
        _groupName: name,
        _groupIsInvalid: isInvalid,
        ...child.props // Keep existing child props, they take precedence
      })
    }
    return child
  })

  return (
    <div
      ref={ref}
      className={rootClasses}
      data-orientation={orientation}
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {clonedChildren}
    </div>
  )
})

CheckboxCardGroup.displayName = 'CheckboxCardGroup'

export { CheckboxCardGroup }