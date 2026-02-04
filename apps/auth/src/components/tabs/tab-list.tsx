'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './tabs.module.css'

import type { TabListProps } from './types'

const TabList = ({
	children,
	loop = true,
	isContained = false,
	className,
}: TabListProps) => {
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

TabList.displayName = 'TabList'

const List = TabList

export { TabList, List }
export type { TabListProps }
