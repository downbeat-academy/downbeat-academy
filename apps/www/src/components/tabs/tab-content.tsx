'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './tabs.module.css'

import type { TabContentProps } from './types'

const TabContent = ({
	children,
	value,
	forceMount = false,
	padding,
	background,
	className,
}: TabContentProps) => {
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

TabContent.displayName = 'TabContent'

const Content = TabContent

export { TabContent, Content }
export type { TabContentProps }
