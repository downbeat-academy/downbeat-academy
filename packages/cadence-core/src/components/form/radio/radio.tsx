'use client'

import React, { forwardRef } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import classnames from 'classnames'
import s from './radio.module.css'
import type { RadioGroupProps, RadioProps } from './types'

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
  orientation = 'vertical',
  className,
  ...props
}, ref) => {
  const rootClasses = classnames(
    s['group-root'],
    className
  )

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={rootClasses}
      {...props}
    />
  )
})

const Radio = forwardRef<HTMLButtonElement, RadioProps>(({
  isInvalid,
  className,
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
    <RadioGroupPrimitive.Item
      ref={ref}
      className={rootClasses}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={indicatorClasses} />
    </RadioGroupPrimitive.Item>
  )
})

RadioGroup.displayName = 'RadioGroup'
Radio.displayName = 'Radio'

export { RadioGroup, Radio }
export type { RadioGroupProps, RadioProps }