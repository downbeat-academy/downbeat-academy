import classnames from 'classnames'
import s from './content-wrapper.module.scss'

import type { ContentWrapperProps } from './types'

const ContentWrapper = ({
  children
}: ContentWrapperProps) => {

  const classes = classnames(
    s['content-wrapper--root'],
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { ContentWrapper }