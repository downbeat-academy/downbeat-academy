'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

import type { DropdownMenuSeparatorProps } from './types'

const DropdownMenuSeparator = forwardRef<
	HTMLDivElement,
	DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		role="separator"
		aria-orientation="horizontal"
		className={classnames(s.separator, className)}
		{...props}
	/>
))

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export { DropdownMenuSeparator }
