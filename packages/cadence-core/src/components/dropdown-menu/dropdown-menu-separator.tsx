'use client'

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuSeparatorProps
	extends React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.Separator
	> {}

const DropdownMenuSeparator = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={classnames(s.separator, className)}
		{...props}
	/>
))

DropdownMenuSeparator.displayName =
	DropdownMenuPrimitive.Separator.displayName

export { DropdownMenuSeparator }
