'use client'

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuItemProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
	inset?: boolean
}

const DropdownMenuItem = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={classnames(s.item, inset && s.itemInset, className)}
		{...props}
	/>
))

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export { DropdownMenuItem }
