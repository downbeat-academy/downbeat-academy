'use client'

import { createContext, useContext } from 'react'

import type { OverlaySide, OverlayAlign } from '../overlay'

interface HoverCardContextValue {
	open: boolean
	contentId: string
	triggerId: string
	/** The `anchor-name` this instance owns, e.g. `--cds-hover-card-r1`. */
	anchorName: string
	side: OverlaySide
	align: OverlayAlign
	setTriggerElement: (el: HTMLElement | null) => void
	getTriggerElement: () => HTMLElement | null
	/** Open after `openDelay`. */
	openWithDelay: () => void
	/** Cancel a pending open — the pointer left before the delay elapsed. */
	cancelOpen: () => void
	/**
	 * Close after `closeDelay`.
	 *
	 * Every pointer-out goes through this. A hover card holds interactive content, so the
	 * pointer has to be able to travel from trigger to card across the `sideOffset` gap;
	 * closing on the trigger's own `pointerleave` would make that content unreachable.
	 */
	closeWithDelay: () => void
	/** Cancel a pending close — the pointer arrived on the card. */
	cancelClose: () => void
	/**
	 * Close now — Escape, or focus leaving the whole card.
	 *
	 * `dismiss` latches it shut until the pointer leaves the trigger. Escape sets it;
	 * nothing else does.
	 */
	close: (options?: { dismiss?: boolean }) => void
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

const useHoverCardContext = (component: string): HoverCardContextValue => {
	const context = useContext(HoverCardContext)
	if (!context) {
		throw new Error(
			`\`${component}\` must be rendered inside a \`<HoverCard>\`.`
		)
	}
	return context
}

export { HoverCardContext, useHoverCardContext }
export type { HoverCardContextValue }
