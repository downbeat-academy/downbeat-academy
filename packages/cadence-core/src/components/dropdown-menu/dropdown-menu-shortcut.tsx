import React from 'react'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

import type { DropdownMenuShortcutProps } from './types'

const DropdownMenuShortcut = ({
	className,
	...props
}: DropdownMenuShortcutProps) => {
	return <span className={classnames(s.shortcut, className)} {...props} />
}

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export { DropdownMenuShortcut }
