import React from 'react'
import classnames from 'classnames'
import s from './horizontal-wrapper.module.css'
import type { HorizontalWrapperProps } from './types'

const HorizontalWrapper = ({ 
  gap = 'medium',
  children, 
  className,
  ...restProps 
}: HorizontalWrapperProps) => {
  const classes = classnames(s['form--layout_helper--horizontal-wrapper'], className)

  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  )
}

export { HorizontalWrapper }
export type { HorizontalWrapperProps }