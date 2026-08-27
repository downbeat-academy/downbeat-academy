import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Checkbox } from '../checkbox'
import { Text } from '../../text'
import s from './checkbox-card.module.css'
import type { CheckboxCardItemProps } from './types'

const sizeClassMap: Record<string, string> = {
  small: s.itemSizeSmall,
  medium: s.itemSizeMedium,
  large: s.itemSizeLarge,
}

const alignmentClassMap: Record<string, string> = {
  left: s.itemContentAlignmentLeft,
  center: s.itemContentAlignmentCenter,
}

const CheckboxCardItem = forwardRef<HTMLLabelElement, CheckboxCardItemProps>(({
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
  checked,
  onCheckedChange,
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
    throw new Error('CheckboxCardItem requires a value prop')
  }

  // Use group props if available, otherwise use individual props
  const finalDisabled = disabled ?? _groupDisabled
  const finalRequired = required ?? _groupRequired
  const finalIsInvalid = isInvalid ?? _groupIsInvalid

  // A checkbox group has no native equivalent — unlike radios, checkboxes sharing a `name`
  // are not coordinated by the browser — so the group's array still resolves this item's
  // state. `CheckboxCardGroup` always supplies a concrete array, controlled or not.
  const isGrouped = _groupValue !== undefined

  // Left `undefined` for a standalone card with no `checked` prop, which is what keeps the
  // input uncontrolled and clickable rather than pinned to `false` by React.
  const finalChecked = isGrouped ? _groupValue.includes(value) : checked

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.checked

    if (isGrouped) {
      _groupOnValueChange?.(
        next
          ? [..._groupValue, value]
          : _groupValue.filter((v) => v !== value)
      )
    }

    onCheckedChange?.(next)
  }

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
    // The card is a `<label>` wrapping the real checkbox — the same fix `radio-card`
    // received in Radix A.4. A click anywhere on the card toggles the input natively, the
    // input stays in the tab order, and Space operates it because it is a real checkbox.
    // Previously this was a bare `div role="checkbox"` with an onClick and a hand-rolled
    // keydown handler, holding an `aria-hidden`, `tabIndex={-1}` checkbox that assistive
    // technology could not see and the keyboard could not reach.
    //
    // Selected, indeterminate, focused and disabled styling is expressed with `:has()`
    // against that input rather than mirrored onto `data-state` / `data-disabled`
    // attributes, so the DOM cannot drift out of sync with the control.
    <label
      ref={ref}
      className={rootClasses}
      {...props}
    >
      {content}
      <div className={s.itemIndicatorArea}>
        <Checkbox
          id={id}
          value={value}
          name={_groupName}
          checked={finalChecked === 'indeterminate' ? false : finalChecked}
          indeterminate={finalChecked === 'indeterminate'}
          onChange={handleChange}
          disabled={finalDisabled}
          required={finalRequired}
          isInvalid={finalIsInvalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
        />
      </div>
    </label>
  )
})

CheckboxCardItem.displayName = 'CheckboxCardItem'

export { CheckboxCardItem }
