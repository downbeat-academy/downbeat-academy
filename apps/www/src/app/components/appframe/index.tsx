import classnames from 'classnames'

import type { AppFrameProps } from './types'
import s from './app-frame.module.scss'

const AppFrame = ({
  children,
}: AppFrameProps) => {

  const classes = classnames(
    s['app-frame--root'],
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { AppFrame };