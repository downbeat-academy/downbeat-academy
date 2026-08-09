'use client'

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import classnames from 'classnames'
import { Check, Minus } from 'cadence-icons'
import s from './checkbox.module.css'
import type { CheckboxProps } from './types'

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  isInvalid,
  indeterminate = false,
  ...props
}, ref) => {
  // The input is styled directly with `appearance: none`, but a native checkbox is a
  // void element and cannot hold the icon — so the mark is an aria-hidden sibling,
  // shown and hidden by CSS off `:checked` / `:indeterminate`. Doing that in CSS
  // rather than in JSX is what keeps uncontrolled (`defaultChecked`) usage working,
  // since React never learns the current value in that case.
  const innerRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

  // `indeterminate` has no HTML attribute; it exists only as a DOM property.
  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const rootClasses = classnames(
    s.root,
    isInvalid && s.isInvalid,
    className
  )

  return (
    <span className={s.wrapper}>
      <input
        type="checkbox"
        ref={innerRef}
        className={rootClasses}
        {...props}
      />
      <span className={s.indicator} aria-hidden="true">
        {indeterminate ? (
          <Minus width={12} height={12} />
        ) : (
          <Check width={12} height={12} />
        )}
      </span>
    </span>
  )
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }
export type { CheckboxProps }
