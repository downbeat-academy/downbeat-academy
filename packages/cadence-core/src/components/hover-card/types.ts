import type React from 'react'
import type { OverlaySide, OverlayAlign } from '../overlay'

interface HoverCardProps {
	children?: React.ReactNode
	/** Controlled open state. When supplied, internal state is never written. */
	open?: boolean
	/** Uncontrolled initial state. @default false */
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
	/** Delay before opening on hover, in ms. @default 300 */
	openDelay?: number
	/**
	 * Grace period before closing once the pointer leaves, in ms. This is what lets the
	 * pointer travel onto the card to use its content. @default 150
	 */
	closeDelay?: number
	/** Which side of the trigger the card is placed on. @default 'top' */
	side?: OverlaySide
	/** Alignment along that side. @default 'center' */
	align?: OverlayAlign
}

interface HoverCardTriggerProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	/**
	 * Render the single child as the trigger, merging props onto it. The only place in
	 * this package where `asChild` is a documented part of the public API —
	 * `handbook-reference.tsx` in `www` passes a `Link` through it.
	 */
	asChild?: boolean
	/** Append a question-mark icon after the trigger content. @default false */
	hasIcon?: boolean
	/** Accessible label for that icon. @default 'More information available' */
	iconAriaLabel?: string
}

interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Gap between trigger and card, in px. @default 4 */
	sideOffset?: number
	/** Overrides the side set on `<HoverCard>`. */
	side?: OverlaySide
	/** Overrides the alignment set on `<HoverCard>`. */
	align?: OverlayAlign
}

export type {
	HoverCardProps,
	HoverCardTriggerProps,
	HoverCardContentProps,
	OverlaySide as HoverCardSide,
	OverlayAlign as HoverCardAlign,
}
export type { HoverCardTitleProps } from './hover-card-title'
export type { HoverCardMainProps } from './hover-card-main'
export type { HoverCardFooterProps } from './hover-card-footer'
