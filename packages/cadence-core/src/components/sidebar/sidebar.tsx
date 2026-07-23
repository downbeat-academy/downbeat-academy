'use client'

import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import classnames from 'classnames'
import s from './sidebar.module.css'
import { SidebarContext, type SidebarContextValue } from './sidebar-context'
import type { SidebarProps } from './types'

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
	(
		{
			ariaLabel = 'Sidebar navigation',
			defaultCollapsed = false,
			collapsed,
			onCollapsedChange,
			className,
			children,
			...rest
		},
		ref
	) => {
		const isControlled = collapsed !== undefined
		const [uncontrolled, setUncontrolled] = useState(defaultCollapsed)
		const value = isControlled ? collapsed : uncontrolled

		const setCollapsed = useCallback(
			(next: boolean) => {
				if (!isControlled) setUncontrolled(next)
				onCollapsedChange?.(next)
			},
			[isControlled, onCollapsedChange]
		)

		const contextValue = useMemo<SidebarContextValue>(
			() => ({ collapsed: value, setCollapsed }),
			[value, setCollapsed]
		)

		return (
			<SidebarContext.Provider value={contextValue}>
				<nav
					ref={ref}
					aria-label={ariaLabel}
					data-collapsed={value ? 'true' : 'false'}
					className={classnames(s.root, className)}
					{...rest}
				>
					{children}
				</nav>
			</SidebarContext.Provider>
		)
	}
)

Sidebar.displayName = 'Sidebar'

export { Sidebar }
