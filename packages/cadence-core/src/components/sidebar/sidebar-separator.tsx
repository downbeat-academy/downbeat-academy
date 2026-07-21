import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './sidebar.module.css'
import type { SidebarSeparatorProps } from './types'

const SidebarSeparator = forwardRef<HTMLDivElement, SidebarSeparatorProps>(
	({ className, ...rest }, ref) => (
		<div
			ref={ref}
			role="separator"
			className={classnames(s.separator, className)}
			{...rest}
		/>
	)
)

SidebarSeparator.displayName = 'SidebarSeparator'

export { SidebarSeparator }
