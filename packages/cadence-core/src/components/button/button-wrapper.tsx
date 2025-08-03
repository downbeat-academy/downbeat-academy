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
    s[`cds-button-wrapper--root`],
    s[`cds-button-wrapper--direction-${direction}`],
    s[`cds-button-wrapper--gap-${gap}`],
    wrap && s[`cds-button-wrapper--wrap`],
    className,
  ])

  return <div className={classes}>{children}</div>
}

export { ButtonWrapper }
export type { ButtonWrapperProps }