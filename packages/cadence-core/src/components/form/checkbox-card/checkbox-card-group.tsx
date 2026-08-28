import React, { forwardRef, useState } from 'react'
import classnames from 'classnames'
import s from './checkbox-card.module.css'
import type { CheckboxCardGroupProps } from './types'

const columnsClassMap: Record<number, string> = {
  1: s.groupColumns1,
  2: s.groupColumns2,
  3: s.groupColumns3,
  4: s.groupColumns4,
  5: s.groupColumns5,
  6: s.groupColumns6,
}

const gapClassMap: Record<string, string> = {
  small: s.groupGapSmall,
  base: s.groupGapBase,
  large: s.groupGapLarge,
}

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
    s.groupRoot,
    columns && columnsClassMap[columns],
    gapClassMap[gap],
    className
  )

  // Checkboxes have no native group: unlike radios sharing a `name`, the browser does not
  // coordinate them, so the selected set lives here. When the caller does not control it,
  // the group holds it itself — `defaultValue` was previously handed to each item, which
  // had nothing to do with it, so an uncontrolled group could never change.
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? [])
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleValueChange = (next: string[]) => {
    if (!isControlled) {
      setInternalValue(next)
    }
    onValueChange?.(next)
  }

  // Clone children and pass down group props
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<Record<string, unknown>>(child)) {
      return React.cloneElement(child, {
        // Pass down group props to each CheckboxCardItem
        _groupValue: currentValue,
        _groupOnValueChange: handleValueChange,
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
