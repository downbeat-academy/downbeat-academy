'use client'

import React, { useCallback, useId, useMemo, useState } from 'react'
import classnames from 'classnames'
import { TabsContext } from './tabs-context'

import type { TabsProps } from './types'

const Tabs = ({
	children,
	defaultValue,
	value,
	onValueChange,
	orientation = 'horizontal',
	dir = 'ltr',
	activationMode = 'automatic',
	className,
}: TabsProps) => {
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
	const baseId = useId()

	// Controlled when `value` is supplied, uncontrolled otherwise. A controlled Tabs whose
	// owner ignores `onValueChange` must not switch itself — so the internal state is
	// never written in that mode, rather than written and then overridden on re-render.
	const isControlled = value !== undefined
	const selectedValue = isControlled ? value : uncontrolledValue

	const selectValue = useCallback(
		(next: string) => {
			if (!isControlled) setUncontrolledValue(next)
			onValueChange?.(next)
		},
		[isControlled, onValueChange]
	)

	const context = useMemo(
		() => ({
			value: selectedValue,
			selectValue,
			orientation,
			dir,
			activationMode,
			baseId,
		}),
		[selectedValue, selectValue, orientation, dir, activationMode, baseId]
	)

	const classes = classnames([className])

	return (
		<TabsContext.Provider value={context}>
			<div className={classes} dir={dir} data-orientation={orientation}>
				{children}
			</div>
		</TabsContext.Provider>
	)
}

Tabs.displayName = 'Tabs'

export { Tabs }
