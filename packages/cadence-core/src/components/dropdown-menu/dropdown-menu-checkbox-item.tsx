'use client'

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check } from 'cadence-icons'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'

export interface DropdownMenuCheckboxItemProps
	extends React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.CheckboxItem
	> {}

const DropdownMenuCheckboxItem = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		checked={checked}
		className={classnames(s.checkboxItem, className)}
		{...props}
	>
		<span className={s.indicator}>
			<DropdownMenuPrimitive.ItemIndicator>
				<Check width={16} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
))

DropdownMenuCheckboxItem.displayName =
	DropdownMenuPrimitive.CheckboxItem.displayName

export { DropdownMenuCheckboxItem }
