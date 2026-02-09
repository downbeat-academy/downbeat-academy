import React from 'react'
import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import s from './tabs.module.css'

import type { TabsTriggerProps } from './types'

const TabsTrigger = ({
	children,
	value,
	disabled,
	icon,
	className,
	'data-testid': dataTestId,
}: TabsTriggerProps) => {
	const classes = classnames([s[`tabs--trigger`], className])

	return (
		<TabsPrimitive.Trigger
			value={value}
			className={classes}
			disabled={disabled}
			data-testid={dataTestId}
		>
			{icon}
			{children}
		</TabsPrimitive.Trigger>
	)
}

TabsTrigger.displayName = 'TabsTrigger'

export { TabsTrigger }
