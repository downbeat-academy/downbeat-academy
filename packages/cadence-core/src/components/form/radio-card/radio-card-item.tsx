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

const RadioCardItem = forwardRef<HTMLLabelElement, RadioCardItemProps>(({
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
  _groupDisabled,
  _groupRequired,
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
    // The card is a `<label>` wrapping the real radio. That single change is the whole
    // accessibility fix: a click anywhere on the card activates the input natively, the
    // input stays in the tab order, and arrow keys move between cards because the inputs
    // share a `name` — all behaviour the browser provides. Previously this was a bare
    // `div role="radio"` with an onClick, holding an `aria-hidden`, `tabIndex={-1}` radio
    // that assistive technology could not see and the keyboard could not reach.
    //
    // Selected, focused and disabled styling is expressed with `:has()` against that
    // input rather than mirrored onto `data-state` / `data-disabled` attributes, so the
    // DOM cannot drift out of sync with the control.
    <label
      ref={ref}
      className={rootClasses}
      {...props}
    >
      {content}
      <div className={s.itemIndicatorArea}>
        <Radio
          value={value}
          disabled={finalDisabled}
          required={finalRequired}
          id={id}
          isInvalid={finalIsInvalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
        />
      </div>
    </label>
  )
})

RadioCardItem.displayName = 'RadioCardItem'

export { RadioCardItem }
