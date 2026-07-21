'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ChevronsLeft, ChevronsRight } from 'cadence-icons'
import s from './sidebar.module.css'
import { useSidebar } from './sidebar-context'
import type { SidebarToggleProps } from './types'

const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
	({ className, onClick, 'aria-label': ariaLabel, ...rest }, ref) => {
		const { collapsed, setCollapsed } = useSidebar()
		const label = ariaLabel ?? (collapsed ? 'Expand sidebar' : 'Collapse sidebar')
		const Icon = collapsed ? ChevronsRight : ChevronsLeft

		return (
			<button
				ref={ref}
				type="button"
				className={classnames(s.toggle, className)}
				aria-label={label}
				aria-expanded={!collapsed}
				onClick={(e) => {
					onClick?.(e)
					if (!e.defaultPrevented) setCollapsed(!collapsed)
				}}
				{...rest}
			>
				<Icon width={16} height={16} aria-hidden="true" />
			</button>
		)
	}
)

SidebarToggle.displayName = 'SidebarToggle'

export { SidebarToggle }
