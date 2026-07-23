'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './sidebar.module.css'
import { useSidebarList } from './sidebar-context'
import type { SidebarSeparatorProps } from './types'

const SidebarSeparator = forwardRef<HTMLDivElement, SidebarSeparatorProps>(
	({ className, ...rest }, ref) => {
		const inList = useSidebarList()

		const divider = (
			<div
				ref={ref}
				role="separator"
				className={classnames(s.separator, className)}
				{...rest}
			/>
		)

		// Inside a `<SidebarSection>` the parent is a `<ul>`, which only accepts list
		// items — and a bare `role="separator"` on the `<li>` itself would strip its
		// listitem role, which is exactly what the axe `list` rule flags.
		return inList ? <li className={s.separatorItem}>{divider}</li> : divider
	}
)

SidebarSeparator.displayName = 'SidebarSeparator'

export { SidebarSeparator }
