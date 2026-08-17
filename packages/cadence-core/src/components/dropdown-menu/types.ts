import type React from 'react'
import type { OverlaySide, OverlayAlign } from '../overlay'

export interface DropdownMenuProps {
	children?: React.ReactNode
	/** Controlled open state. When supplied, internal state is never written. */
	open?: boolean
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
	/** Which side of the trigger the menu opens on. @default 'bottom' */
	side?: OverlaySide
	/** Alignment along that side. @default 'start' */
	align?: OverlayAlign
}

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** Render the single child as the trigger instead of a `<button>`. */
	asChild?: boolean
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Gap between trigger and menu, in px. @default 4 */
	sideOffset?: number
	side?: OverlaySide
	align?: OverlayAlign
}

export interface DropdownMenuItemProps extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'onSelect'
> {
	/** Indents the item to line up with items that have a leading icon. */
	inset?: boolean
	disabled?: boolean
	/** Called when the item is chosen, by click or by Enter/Space. */
	onSelect?: () => void
}

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
	inset?: boolean
}

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export type {
	OverlaySide as DropdownMenuSide,
	OverlayAlign as DropdownMenuAlign,
}
