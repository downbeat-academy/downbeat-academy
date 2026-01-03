'use client'

import React, { forwardRef } from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import classnames from 'classnames'
import s from './switch.module.css'
import { Check } from 'cadence-icons'
import type { SwitchProps } from './types'

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(({
  checked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  id,
  className,
  isInvalid,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s.root,
    isInvalid && s.isInvalid,
    className
  )

  const thumbClasses = classnames(
    s.thumb,
    checked && s.thumbChecked
  )

  const checkIconClasses = classnames(
    s.checkIcon,
    checked && s.checkIconVisible
  )

  return (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      id={id}
      className={rootClasses}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      <span className={checkIconClasses}>
        <Check width={14} color="var(--cds-color-foreground-high-contrast)" />
      </span>
      <SwitchPrimitive.Thumb className={thumbClasses} />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = 'Switch'

export { Switch }
export type { SwitchProps }