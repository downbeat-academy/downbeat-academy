'use client'

import React, { forwardRef, useCallback } from 'react'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'
import { useDropdownMenuContext } from './dropdown-menu-context'

import type { DropdownMenuItemProps } from './types'

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
	(
		{
			className,
			inset = false,
			disabled = false,
			onSelect,
			onClick,
			children,
			...rest
		},
		ref
	) => {
		const { closeAndRefocus } = useDropdownMenuContext('DropdownMenuItem')

		const select = useCallback(() => {
			if (disabled) return
			onSelect?.()
			// Selecting dismisses the menu and returns focus to the trigger. A menu that
			// stays open after a choice has to be dismissed twice.
			closeAndRefocus()
		}, [disabled, onSelect, closeAndRefocus])

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLDivElement>) => {
				onClick?.(event)
				if (event.defaultPrevented) return
				select()
			},
			[onClick, select]
		)

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				// Enter and Space activate. This is a `div` with `role="menuitem"` rather
				// than a `button`, because a button inside a menu brings its own Space and
				// Enter handling and its own focus ring — the roving tabindex in
				// `DropdownMenuContent` owns focus here.
				if (event.key !== 'Enter' && event.key !== ' ') return
				event.preventDefault()
				// Stop the menu's own handler treating Space as typeahead.
				event.stopPropagation()
				select()
			},
			[select]
		)

		return (
			<div
				ref={ref}
				role="menuitem"
				// `aria-disabled`, not the `disabled` attribute: a disabled item stays in the
				// menu's reading order so its existence is discoverable, which is what APG
				// asks for. `DropdownMenuContent` skips it when moving focus.
				aria-disabled={disabled || undefined}
				data-disabled={disabled ? '' : undefined}
				// Seeded by the content on open; -1 until then so a closed menu contributes
				// nothing to the tab order.
				tabIndex={-1}
				className={classnames(s.item, inset && s.itemInset, className)}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...rest}
			>
				{children}
			</div>
		)
	}
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

export { DropdownMenuItem }
