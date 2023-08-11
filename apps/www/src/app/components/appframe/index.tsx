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
    <main className={classes}>
      {children}
    </main>
  )
}

export { AppFrame };