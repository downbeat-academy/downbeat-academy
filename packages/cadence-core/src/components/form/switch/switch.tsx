'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './switch.module.css'
import { Check } from 'cadence-icons'
import type { SwitchProps } from './types'

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  className,
  isInvalid,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s.root,
    isInvalid && s.isInvalid,
    className
  )

  // A checkbox carrying `role="switch"` is the standard native switch: it keeps the
  // checkbox's form participation, label association and Space-to-toggle, while being
  // announced as an on/off control. Radix used a `<button role="switch">` and bubbled a
  // hidden input in for form submission — that workaround is gone.
  //
  // The track is the input itself, styled with `appearance: none`. The thumb and check
  // mark cannot be children of a void element, so they are aria-hidden siblings moved by
  // CSS off `:checked`, which is also what keeps uncontrolled usage working.
  return (
    <span className={s.wrapper}>
      <input
        type="checkbox"
        role="switch"
        ref={ref}
        className={rootClasses}
        {...props}
      />
      <span className={s.checkIcon} aria-hidden="true">
        <Check width={14} color="var(--cds-color-foreground-high-contrast)" />
      </span>
      <span className={s.thumb} aria-hidden="true" />
    </span>
  )
})

Switch.displayName = 'Switch'

export { Switch }
export type { SwitchProps }
