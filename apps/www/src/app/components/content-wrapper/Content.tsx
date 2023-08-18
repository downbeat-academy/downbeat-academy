import classnames from 'classnames'
import s from './content.module.scss'

import type { ContentProps } from './types'

const Content = ({
  children,
  isFullBleed,
  className
}: ContentProps) => {

  const classes = classnames(
    s['content-wrapper'],
    s[isFullBleed ? 'is-full-bleed' : null],
    className,
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { Content }