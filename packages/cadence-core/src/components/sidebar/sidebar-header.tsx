'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './sidebar.module.css'
import type { SidebarHeaderProps } from './types'

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
	({ className, children, ...rest }, ref) => (
		<div ref={ref} className={classnames(s.header, className)} {...rest}>
			{children}
		</div>
	)
)

SidebarHeader.displayName = 'SidebarHeader'

export { SidebarHeader }