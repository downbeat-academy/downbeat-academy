'use client'

import React, { forwardRef } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import classnames from 'classnames'
import { Check, Minus } from 'cadence-icons'
import s from './checkbox.module.css'
import type { CheckboxProps } from './types'

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(({
  className,
  isInvalid,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s['root'],
    isInvalid && s['is-invalid'],
    className
  )

  const indicatorClasses = classnames(
    s['indicator']
  )

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={rootClasses}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={indicatorClasses}>
        {props.checked === 'indeterminate' ? (
          <Minus width={12} height={12} />
        ) : (
          <Check width={12} height={12} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }
export type { CheckboxProps }