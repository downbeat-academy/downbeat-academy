import React from 'react'
import classnames from 'classnames'
import s from './button-wrapper.module.css'
import type { ButtonWrapperProps } from './types'

const ButtonWrapper = ({
  direction = 'horizontal',
  gap = 'medium',
  wrap = true,
  className,
  children,
}: ButtonWrapperProps) => {
  const classes = classnames([
    s[`root`],
    s[`direction-${direction}`],
    s[`gap-${gap}`],
    wrap && s[`wrap`],
    className,
  ])

  return <div className={classes}>{children}</div>
}

export { ButtonWrapper }
export type { ButtonWrapperProps }