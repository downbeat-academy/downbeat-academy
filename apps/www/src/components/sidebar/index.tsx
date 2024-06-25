import classnames from 'classnames'
import s from './sidebar.module.scss'

import type { SidebarProps } from './types'

const Sidebar = ({ className, position, children }: SidebarProps) => {
	const classes = classnames(
		s['sidebar--root'],
		s[position ? `sidebar--position-${position}` : `sidebar--position-left`],
		[className]
	)

	return <aside className={classes}>{children}</aside>
}

export { Sidebar }
