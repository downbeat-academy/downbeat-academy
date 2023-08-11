import classnames from 'classnames'

import type { AppframeProps } from './types'
import s from './Appframe.module.scss'

const Appframe = ({
  children,
}: AppframeProps) => {

  const classes = classnames(
    [s.appframeRoot],
  )

  return (
    <main className={classes}>
      {children}
    </main>
  )
}

export { Appframe };