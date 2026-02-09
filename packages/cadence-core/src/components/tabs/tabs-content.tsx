import React from 'react'
import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './tabs.module.css'

import type { TabsContentProps } from './types'

const TabsContent = ({
	children,
	value,
	forceMount = false,
	padding,
	background,
	className,
}: TabsContentProps) => {
	const classes = classnames([
		s[`tabs--content`],
		s[`tabs--content--padding--${padding}`],
		s[`tabs--content--background--${background}`],
		className,
	])

	return (
		<TabsPrimitive.Content
			value={value}
			// @ts-ignore
			forceMount={forceMount}
			className={classes}
		>
			{children}
		</TabsPrimitive.Content>
	)
}

TabsContent.displayName = 'TabsContent'

export { TabsContent }
