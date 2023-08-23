import classnames from 'classnames'
import s from './button-wrapper.module.scss'

import type { ButtonWrapperProps } from "./types"

const ButtonWrapper = ({
  direction = 'horizontal',
  gap = 'medium',
  wrap = true,
  className,
  children,
}: ButtonWrapperProps) => {

  const classes = classnames([
    s.root,
    s[direction],
    s[gap],
    {
      [s.wrap]: wrap,
    },
    className,
  ])

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { ButtonWrapper }
export type { ButtonWrapperProps }