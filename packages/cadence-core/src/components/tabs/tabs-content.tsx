'use client'

import React from 'react'
import classnames from 'classnames'
import s from './tabs.module.css'
import { contentId, triggerId, useTabsContext } from './tabs-context'

import type { TabsContentProps } from './types'

const TabsContent = ({
	children,
	value,
	forceMount = false,
	padding,
	background,
	className,
}: TabsContentProps) => {
	const { value: selectedValue, orientation, baseId } = useTabsContext('TabsContent')
	const isSelected = selectedValue === value

	// Only append a modifier when the prop was actually given. The previous version
	// interpolated unconditionally and emitted `tabs--content--padding--undefined`, which
	// `classnames` then dropped as `undefined` — harmless, but it meant the class list
	// depended on a lookup miss. There is deliberately no base `tabs--content` class:
	// the stylesheet has never defined one, so the old reference to it resolved to
	// `undefined` too.
	const classes = classnames([
		padding ? s[`tabs--content--padding--${padding}`] : null,
		background ? s[`tabs--content--background--${background}`] : null,
		className,
	])

	return (
		<div
			role="tabpanel"
			id={contentId(baseId, value)}
			aria-labelledby={triggerId(baseId, value)}
			data-state={isSelected ? 'active' : 'inactive'}
			data-orientation={orientation}
			tabIndex={0}
			// `hidden` tracks selection and nothing else. Previously `forceMount` also
			// dropped it, which left an unselected panel in the accessibility tree and
			// made two tabpanels reachable at once — pinned by the 0.3 backfill as
			// current behaviour, explicitly not endorsed. `forceMount` now means what it
			// says and no more: keep the children mounted. It does not un-hide the panel.
			hidden={!isSelected}
			className={classes}
		>
			{isSelected || forceMount ? children : null}
		</div>
	)
}

TabsContent.displayName = 'TabsContent'

export { TabsContent }
