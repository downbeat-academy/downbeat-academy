import type React from 'react'

type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
type TooltipAlign = 'start' | 'center' | 'end'

interface TooltipProviderProps {
	children?: React.ReactNode
	/** Hover delay, in ms, for every tooltip under this provider. @default 700 */
	delayDuration?: number
	/**
	 * Window, in ms, after a tooltip closes during which the next one opens with no
	 * delay. Moving along a row of icon buttons should not re-pay the delay each time.
	 * @default 300
	 */
	skipDelayDuration?: number
	/** When true, moving the pointer onto the tooltip does not keep it open. @default false */
	disableHoverableContent?: boolean
}

interface TooltipProps {
	children?: React.ReactNode
	/** Controlled open state. When supplied, internal state is never written. */
	open?: boolean
	/** Uncontrolled initial state. @default false */
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
	/** Overrides the provider's delay for this tooltip only. @default 700 */
	delayDuration?: number
	disableHoverableContent?: boolean
	/** Which side of the trigger the tooltip is placed on. @default 'top' */
	side?: TooltipSide
	/** Alignment along that side. @default 'center' */
	align?: TooltipAlign
}

interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Render the single child as the trigger instead of a `<button>`, merging props onto
	 * it. Uses the in-house `Slot`. Relied on by `sidebar-link.tsx`.
	 */
	asChild?: boolean
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Gap between trigger and tooltip, in px. @default 4 */
	sideOffset?: number
	/** Overrides the side set on `<Tooltip>`. */
	side?: TooltipSide
	/** Overrides the alignment set on `<Tooltip>`. */
	align?: TooltipAlign
}

export type {
	TooltipSide,
	TooltipAlign,
	TooltipProviderProps,
	TooltipProps,
	TooltipTriggerProps,
	TooltipContentProps,
}
