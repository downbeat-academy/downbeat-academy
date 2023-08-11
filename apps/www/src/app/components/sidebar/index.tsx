import classnames from 'classnames'
import s from './sidebar.module.scss'

import type { SidebarProps } from './types'

const Sidebar = ({
  position,
  className,
}: SidebarProps) => {

  const classes = classnames(
    s['sidebar--root'],
    s[`sidebar-position--${position}`],
    [className],
  )

  return (
    <aside className={classes}>
      <p>This is a sidebar</p>
    </aside>
  )
}

export { Sidebar }