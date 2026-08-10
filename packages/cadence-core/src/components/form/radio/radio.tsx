'use client'

import React, { forwardRef, useId } from 'react'
import classnames from 'classnames'
import s from './radio.module.css'
import { RadioGroupContext, useRadioGroup } from './radio-group-context'
import type { RadioGroupProps, RadioProps } from './types'

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
  orientation = 'vertical',
  className,
  value,
  defaultValue,
  onChange,
  name,
  disabled,
  required,
  children,
  ...props
}, ref) => {
  // A shared `name` is not cosmetic — it is the only thing that makes the browser treat
  // these inputs as one group, and therefore the only reason arrow keys, roving tabindex
  // and single-selection work without any JavaScript. Generated when the caller omits it.
  const generatedName = useId()
  const groupName = name ?? generatedName

  const rootClasses = classnames(
    s.groupRoot,
    className
  )

  return (
    <RadioGroupContext.Provider
      value={{
        name: groupName,
        value,
        defaultValue,
        isControlled: value !== undefined,
        onChange,
        disabled,
        required,
      }}
    >
      <div
        ref={ref}
        role="radiogroup"
        aria-orientation={orientation}
        // Retained as the styling hook the stylesheet already keys off.
        data-orientation={orientation}
        className={rootClasses}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
})

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  isInvalid,
  className,
  value,
  checked,
  defaultChecked,
  onChange,
  name,
  disabled,
  required,
  ...props
}, ref) => {
  const group = useRadioGroup()

  // An explicit prop always wins over the group, so a `Radio` can be driven directly —
  // which is what `radio-card-item` does.
  const resolvedChecked =
    checked ?? (group?.isControlled ? group.value === value : undefined)

  const resolvedDefaultChecked =
    defaultChecked ??
    (group && !group.isControlled && group.defaultValue !== undefined
      ? group.defaultValue === value
      : undefined)

  const rootClasses = classnames(
    s.root,
    isInvalid && s.isInvalid,
    className
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    if (event.target.checked) {
      group?.onChange?.(value)
    }
  }

  return (
    <span className={s.wrapper}>
      <input
        type="radio"
        ref={ref}
        value={value}
        name={name ?? group?.name}
        checked={resolvedChecked}
        defaultChecked={resolvedDefaultChecked}
        onChange={handleChange}
        disabled={disabled ?? group?.disabled}
        required={required ?? group?.required}
        className={rootClasses}
        {...props}
      />
      {/* A radio input is a void element and cannot contain its own dot, so the mark is
          an aria-hidden sibling revealed by CSS off `:checked`. Keeping it in CSS rather
          than JSX is what lets uncontrolled groups work, since React never learns which
          radio the browser selected. */}
      <span className={s.indicator} aria-hidden="true" />
    </span>
  )
})

RadioGroup.displayName = 'RadioGroup'
Radio.displayName = 'Radio'

export { RadioGroup, Radio }
export type { RadioGroupProps, RadioProps }
