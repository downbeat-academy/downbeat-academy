import classnames from 'classnames'
import s from './Sidebar.module.scss'

import type { SidebarProps } from './types'

const Sidebar = ({
  position,
  className,
}: SidebarProps) => {

  const classes = classnames(
    [s.sidebarRoot],
    [position]
    [className],
  )

  return (
    <aside className={classes}>
      <p>This is a sidebar</p>
    </aside>
  )
}

export { Sidebar }