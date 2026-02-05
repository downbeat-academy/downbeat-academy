'use client'

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { DotFilled } from 'cadence-icons'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuRadioItemProps
	extends React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.RadioItem
	> {}

const DropdownMenuRadioItem = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={classnames(s.radioItem, className)}
		{...props}
	>
		<span className={s.indicator}>
			<DropdownMenuPrimitive.ItemIndicator>
				<DotFilled width={16} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
))

DropdownMenuRadioItem.displayName =
	DropdownMenuPrimitive.RadioItem.displayName

export { DropdownMenuRadioItem }
