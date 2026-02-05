'use client'

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'cadence-icons'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuSubTriggerProps
	extends React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.SubTrigger
	> {
	inset?: boolean
}

const DropdownMenuSubTrigger = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={classnames(
			s.subTrigger,
			inset && s.subTriggerInset,
			className,
		)}
		{...props}
	>
		{children}
		<span className={s.subTriggerIcon}>
			<ChevronRight width={16} />
		</span>
	</DropdownMenuPrimitive.SubTrigger>
))

DropdownMenuSubTrigger.displayName =
	DropdownMenuPrimitive.SubTrigger.displayName

export { DropdownMenuSubTrigger }
