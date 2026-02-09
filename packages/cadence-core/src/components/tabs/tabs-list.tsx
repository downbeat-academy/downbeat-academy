import React from 'react'
import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './tabs.module.css'

import type { TabsListProps } from './types'

const TabsList = ({
	children,
	loop = true,
	isContained = false,
	className,
}: TabsListProps) => {
	const classes = classnames([
		s[`tabs--list`],
		isContained ? s['tabs--list--contained'] : null,
		className,
	])

	return (
		<TabsPrimitive.List loop={loop} className={classes}>
			{children}
		</TabsPrimitive.List>
	)
}

TabsList.displayName = 'TabsList'

export { TabsList }
