'use client'

import React, { forwardRef, useCallback } from 'react'
import classnames from 'classnames'
import { Slot } from '../slot'
import s from './dropdown-menu.module.css'
import { useDropdownMenuContext } from './dropdown-menu-context'

import type { DropdownMenuTriggerProps } from './types'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

const DropdownMenuTrigger = forwardRef<
	HTMLButtonElement,
	DropdownMenuTriggerProps
>(
	(
		{
			asChild = false,
			children,
			className,
			style,
			onClick,
			onKeyDown,
			...rest
		},
		ref
	) => {
		const {
			open,
			setOpen,
			contentId,
			triggerId,
			anchorName,
			setTriggerElement,
			closeAndRefocus,
		} = useDropdownMenuContext('DropdownMenuTrigger')

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event)
				if (event.defaultPrevented) return
				if (open) closeAndRefocus()
				else setOpen(true)
			},
			[onClick, open, setOpen, closeAndRefocus]
		)

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLButtonElement>) => {
				onKeyDown?.(event)
				if (event.defaultPrevented) return
				// APG: ArrowDown, Enter and Space all open the menu and move focus to its
				// first item. Enter and Space would otherwise arrive as a click, which opens
				// without focusing — hence handling them here and claiming the event.
				if (
					event.key === 'ArrowDown' ||
					event.key === 'Enter' ||
					event.key === ' '
				) {
					event.preventDefault()
					setOpen(true, true)
				}
			},
			[onKeyDown, setOpen]
		)

		const Comp: React.ElementType = asChild ? Slot : 'button'

		return (
			<Comp
				ref={composeRefs(ref, setTriggerElement)}
				id={triggerId}
				aria-haspopup="menu"
				aria-expanded={open}
				// Only while open: a reference to an element that is not in the document is
				// dangling, and some screen readers handle that badly.
				aria-controls={open ? contentId : undefined}
				data-state={open ? 'open' : 'closed'}
				// Merged with the consumer's style — `...rest` is spread after this, so an
				// incoming `style` would otherwise replace the anchor wholesale.
				style={
					{
						...style,
						'--cds-dropdown-menu-anchor': anchorName,
					} as React.CSSProperties
				}
				className={classnames(s.trigger, className)}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...(asChild ? {} : { type: 'button' as const })}
				{...rest}
			>
				{children}
			</Comp>
		)
	}
)

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

export { DropdownMenuTrigger }
