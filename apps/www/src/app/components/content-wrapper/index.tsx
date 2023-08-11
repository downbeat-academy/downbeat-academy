import classnames from 'classnames'
import s from './content-wrapper.module.scss'

import type { ContentWrapperProps } from './types'

const ContentWrapper = ({
  children,
  className,
}: ContentWrapperProps) => {

  const classes = classnames(
    s['content-wrapper--root'],
    [className],
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { ContentWrapper }