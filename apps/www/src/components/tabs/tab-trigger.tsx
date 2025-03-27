'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './tabs.module.css'

import type { TabTriggerProps } from './types'

const TabTrigger = ({
	children,
	value,
	disabled,
	icon,
	className,
}: TabTriggerProps) => {
	const classes = classnames([s[`tabs--trigger`], className])

	return (
		<TabsPrimitive.Trigger
			value={value}
			className={classes}
			disabled={disabled}
		>
			{icon}
			{children}
		</TabsPrimitive.Trigger>
	)
}

TabTrigger.displayName = 'TabTrigger'

const Trigger = TabTrigger

export { TabTrigger, Trigger }
export type { TabTriggerProps }
