import classnames from 'classnames'

import type { AppframeProps } from './types'
import s from './Appframe.module.scss'

const Appframe = ({
  sidebarLeft,
  sidebarRight,
  header,
  footer,
  children,
}: AppframeProps) => {

  const classes = classnames(
    'appframe--root',
  )

  return (
    <main className={classes}>
      {header}
      {sidebarLeft &&
        <aside className={classnames('appframe--sidebar-left')}>{sidebarLeft}</aside>
      }
      {children}
      {sidebarRight &&
        <aside className={classnames('appframe--sidebar-right')}>{sidebarRight}</aside>
      }
      {footer}
    </main>
  )
}

export { Appframe };