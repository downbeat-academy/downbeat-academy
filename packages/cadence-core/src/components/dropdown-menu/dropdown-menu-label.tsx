'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

import type { DropdownMenuLabelProps } from './types'

const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
	({ className, inset = false, ...props }, ref) => (
		<div
			ref={ref}
			// `presentation`, so a group heading is not announced as a selectable item.
			role="presentation"
			className={classnames(s.label, inset && s.labelInset, className)}
			{...props}
		/>
	)
)

DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export { DropdownMenuLabel }
