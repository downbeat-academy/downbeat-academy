'use client'

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuLabelProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
	inset?: boolean
}

const DropdownMenuLabel = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={classnames(s.label, inset && s.labelInset, className)}
		{...props}
	/>
))

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export { DropdownMenuLabel }
