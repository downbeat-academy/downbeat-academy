'use client'

import React, { useCallback, useId, useMemo, useRef, useState } from 'react'
import { DropdownMenuContext } from './dropdown-menu-context'
import { useAnchorName } from '../overlay'

import type { DropdownMenuProps } from './types'
import type { DropdownMenuContextValue } from './dropdown-menu-context'

/**
 * Was a bare re-export of `DropdownMenuPrimitive.Root`.
 *
 * Scope note, because the export list shrank: this covers what the package actually uses —
 * a trigger, a positioned menu, items, separators and labels. Submenus, checkbox and radio
 * items were removed rather than rebuilt; nothing in the repo rendered them, and they are
 * where the genuinely hard parts live (safe-triangle tracking, indicator state). See
 * `docs/adr/0002-known-gaps.md`.
 */
const DropdownMenu = ({
	children,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	side = 'bottom',
	align = 'start',
}: DropdownMenuProps) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
	const isControlled = openProp !== undefined
	const open = isControlled ? openProp : uncontrolledOpen

	const baseId = useId()
	const anchorName = useAnchorName(baseId, 'dropdown-menu')
	const contentId = `${baseId}-content`
	const triggerId = `${baseId}-trigger`

	const triggerRef = useRef<HTMLElement | null>(null)
	const [openedByKeyboard, setOpenedByKeyboard] = useState(false)

	const setOpen = useCallback(
		(next: boolean, viaKeyboard = false) => {
			if (next) setOpenedByKeyboard(viaKeyboard)
			// Never written in controlled mode, so an owner that ignores `onOpenChange`
			// cannot drift from what it rendered.
			if (!isControlled) setUncontrolledOpen(next)
			onOpenChange?.(next)
		},
		[isControlled, onOpenChange]
	)

	const closeAndRefocus = useCallback(() => {
		setOpen(false)
		// Focus must come back to the trigger, or a keyboard user is dropped at the top of
		// the document every time they dismiss a menu.
		triggerRef.current?.focus()
	}, [setOpen])

	const value = useMemo<DropdownMenuContextValue>(
		() => ({
			open,
			setOpen,
			contentId,
			triggerId,
			anchorName,
			side,
			align,
			setTriggerElement: (el) => {
				triggerRef.current = el
			},
			getTriggerElement: () => triggerRef.current,
			openedByKeyboard,
			closeAndRefocus,
		}),
		[
			open,
			setOpen,
			contentId,
			triggerId,
			anchorName,
			side,
			align,
			openedByKeyboard,
			closeAndRefocus,
		]
	)

	return (
		<DropdownMenuContext.Provider value={value}>
			{children}
		</DropdownMenuContext.Provider>
	)
}

DropdownMenu.displayName = 'DropdownMenu'

export { DropdownMenu }
