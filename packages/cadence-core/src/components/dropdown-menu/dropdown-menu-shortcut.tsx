import React from 'react'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuShortcutProps
	extends React.HTMLAttributes<HTMLSpanElement> {}

const DropdownMenuShortcut = ({
	className,
	...props
}: DropdownMenuShortcutProps) => {
	return (
		<span className={classnames(s.shortcut, className)} {...props} />
	)
}

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export { DropdownMenuShortcut }
