import classnames from 'classnames'
import s from './ContentWrapper.module.scss'

import type { ContentWrapperProps } from './types'

const ContentWrapper = ({
  children
}: ContentWrapperProps) => {

  const classes = classnames(
    [s.contentWrapperRoot],
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { ContentWrapper }