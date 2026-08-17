'use client'

import { createContext, useContext } from 'react'

import type { OverlaySide, OverlayAlign } from '../overlay'

interface DropdownMenuContextValue {
	open: boolean
	/**
	 * `viaKeyboard` records how the menu was opened, which decides whether the first item
	 * takes focus. Only the trigger's key handler passes it.
	 */
	setOpen: (open: boolean, viaKeyboard?: boolean) => void
	contentId: string
	triggerId: string
	anchorName: string
	side: OverlaySide
	align: OverlayAlign
	setTriggerElement: (el: HTMLElement | null) => void
	getTriggerElement: () => HTMLElement | null
	/**
	 * Whether the menu was opened by keyboard.
	 *
	 * A menu opened with Enter, Space or ArrowDown focuses its first item; one opened by
	 * pointer does not, so a mouse user does not get a focus ring they did not ask for.
	 * APG specifies the difference.
	 */
	openedByKeyboard: boolean
	/** Close and return focus to the trigger — Escape, selection, outside click. */
	closeAndRefocus: () => void
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

const useDropdownMenuContext = (
	component: string
): DropdownMenuContextValue => {
	const context = useContext(DropdownMenuContext)
	if (!context) {
		throw new Error(
			`\`${component}\` must be rendered inside a \`<DropdownMenu>\`.`
		)
	}
	return context
}

export { DropdownMenuContext, useDropdownMenuContext }
export type { DropdownMenuContextValue }
