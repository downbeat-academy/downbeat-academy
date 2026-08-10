import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { RadioGroup } from '../radio'
import s from './radio-card.module.css'
import type { RadioCardGroupProps } from './types'

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

const RadioCardGroup = forwardRef<HTMLDivElement, RadioCardGroupProps>(({
  value,
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

  const { defaultValue, dir, ...restProps } = props

  // Clone children and pass down the group props that are purely presentational.
  //
  // Selection, the shared `name`, and the change callback are no longer cloned down —
  // `RadioGroup` puts them on context and the native input inside each card reads them
  // directly. Only `isInvalid` needs to reach the card itself, because it styles the card
  // border rather than the control; `disabled` and `required` are forwarded so a card used
  // outside a group still behaves.
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<Record<string, unknown>>(child)) {
      return React.cloneElement(child, {
        _groupDisabled: disabled,
        _groupRequired: required,
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
      onChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
      orientation={orientation}
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
