import React from 'react'
import classnames from 'classnames'
import s from './button-wrapper.module.css'
import type { ButtonWrapperProps } from './types'

type Direction = ButtonWrapperProps['direction']
type Gap = ButtonWrapperProps['gap']

const directionStyles: Record<NonNullable<Direction>, string> = {
  horizontal: s.horizontal,
  vertical: s.vertical,
}

const gapStyles: Record<NonNullable<Gap>, string> = {
  none: s.gapNone,
  small: s.gapSmall,
  medium: s.gapMedium,
  large: s.gapLarge,
}

const ButtonWrapper = ({
  direction = 'horizontal',
  gap = 'medium',
  wrap = true,
  className,
  children,
}: ButtonWrapperProps) => {
  const classes = classnames([
    s.root,
    directionStyles[direction],
    gapStyles[gap],
    wrap && s.wrap,
    className,
  ])

  return <div className={classes}>{children}</div>
}

export { ButtonWrapper }
export type { ButtonWrapperProps }