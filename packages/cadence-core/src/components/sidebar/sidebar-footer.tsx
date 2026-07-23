import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './sidebar.module.css'
import type { SidebarFooterProps } from './types'

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
	({ className, children, ...rest }, ref) => (
		<div ref={ref} className={classnames(s.footer, className)} {...rest}>
			{children}
		</div>
	)
)

SidebarFooter.displayName = 'SidebarFooter'

export { SidebarFooter }
