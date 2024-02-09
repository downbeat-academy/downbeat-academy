import classnames from 'classnames'
import s from './horizontal-wrapper.module.scss'

import type { HorizontalWrapperProps } from './types'

const HorizontalWrapper = ({ children }: HorizontalWrapperProps)  => {

  const classes = classnames(
    s['form--layout_helper--horizontal-wrapper']
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { HorizontalWrapper }