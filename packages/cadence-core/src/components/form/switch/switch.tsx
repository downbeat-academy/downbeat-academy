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
    s['cds-switch--root'],
    isInvalid && s['cds-switch--is-invalid'],
    className
  )

  const thumbClasses = classnames(s['cds-switch--thumb'])

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
      <span className={s['cds-switch--check-icon']}>
        <Check width={14} color="var(--cds-color-foreground-high-contrast)" />
      </span>
      <SwitchPrimitive.Thumb className={thumbClasses} />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = 'Switch'

export { Switch }
export type { SwitchProps }