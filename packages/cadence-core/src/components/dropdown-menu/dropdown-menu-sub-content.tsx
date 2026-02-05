'use client'

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuSubContentProps
	extends React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.SubContent
	> {}

const DropdownMenuSubContent = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.SubContent
			ref={ref}
			className={classnames(s.subContent, className)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
))

DropdownMenuSubContent.displayName =
	DropdownMenuPrimitive.SubContent.displayName

export { DropdownMenuSubContent }
