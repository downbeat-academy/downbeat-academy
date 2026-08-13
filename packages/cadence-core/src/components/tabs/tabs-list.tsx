'use client'

import React, { useMemo, useRef } from 'react'
import classnames from 'classnames'
import s from './tabs.module.css'
import { TabsListContext, useTabsContext } from './tabs-context'

import type { TabsListProps } from './types'

const TabsList = ({
	children,
	loop = true,
	isContained = false,
	className,
}: TabsListProps) => {
	const { value, orientation } = useTabsContext('TabsList')
	const ref = useRef<HTMLDivElement>(null)

	const classes = classnames([
		s[`tabs--list`],
		isContained ? s['tabs--list--contained'] : null,
		className,
	])

	const context = useMemo(() => ({ loop }), [loop])

	// The tab stop normally lives on the selected tab (see `tabs-trigger.tsx`), so the
	// tablist itself is not focusable — that is the plain APG shape, and a focusable
	// non-interactive container is a defect in its own right.
	//
	// With no selection at all there is no tab to carry it, and the whole tablist would
	// drop out of the tab order. So in that one case the list takes the tab stop and
	// forwards focus to its first enabled tab, which is also what Radix did.
	const hasSelection = value !== undefined

	const focusFirstTab = (event: React.FocusEvent<HTMLDivElement>) => {
		if (hasSelection || event.target !== event.currentTarget) return
		const first = ref.current?.querySelector<HTMLButtonElement>(
			'[role="tab"]:not([disabled])'
		)
		first?.focus()
	}

	return (
		<TabsListContext.Provider value={context}>
			<div
				ref={ref}
				role="tablist"
				aria-orientation={orientation}
				data-orientation={orientation}
				className={classes}
				tabIndex={hasSelection ? undefined : 0}
				onFocus={focusFirstTab}
			>
				{children}
			</div>
		</TabsListContext.Provider>
	)
}

TabsList.displayName = 'TabsList'

export { TabsList }
