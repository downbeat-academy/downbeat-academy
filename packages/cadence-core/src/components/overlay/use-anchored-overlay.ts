'use client'

import { useEffect, useLayoutEffect, useMemo } from 'react'
import { computeFallbackPosition, supportsAnchorPositioning } from './position'

import type React from 'react'
import type { OverlaySide, OverlayAlign } from './types'

// `useLayoutEffect` warns during SSR. Overlay content only renders once open, which is a
// client event, but a consumer rendering one open on the server would trip it.
const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Turns a `useId()` value into a valid dashed-ident.
 *
 * `useId` produces `:r1:`-shaped strings, and a colon is not valid in a custom-ident —
 * an `anchor-name: --cds-x-:r1:` declaration is simply invalid and dropped, which shows up
 * as an overlay silently parked at its static position rather than as an error.
 */
export const useAnchorName = (baseId: string, prefix: string): string =>
	useMemo(
		() => `--cds-${prefix}-${baseId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
		[baseId, prefix]
	)

interface AnchoredOverlayOptions {
	/** The overlay element. Null while closed. */
	ref: React.RefObject<HTMLElement | null>
	open: boolean
	getAnchorElement: () => HTMLElement | null
	side: OverlaySide
	align: OverlayAlign
	sideOffset: number
}

/**
 * Places an overlay against its anchor, and promotes it into the top layer.
 *
 * Shared by `Tooltip` and `HoverCard`. What is shared is *placement*; the interaction
 * timing that decides when `open` flips is deliberately not — a tooltip's delay and a
 * hover card's open/close grace are different behaviours that happen to look alike.
 *
 * Two placement mechanisms, chosen at runtime:
 *
 * 1. **CSS anchor positioning**, where the engine has it. The stylesheet owns everything
 *    and this hook writes no inline position at all, so the two can never fight.
 * 2. **A JS fallback**, where it does not — below Chrome 125, Edge 125, Firefox 147 and
 *    Safari 26.0. Deliberately not a positioning engine: it places and clamps, and does
 *    not flip. `docs/adr/0003-browser-support-floor.md` permits an overlay that cannot
 *    flip and forbids one that renders in the wrong place.
 */
export function useAnchoredOverlay({
	ref,
	open,
	getAnchorElement,
	side,
	align,
	sideOffset,
}: AnchoredOverlayOptions): void {
	/**
	 * Top-layer promotion.
	 *
	 * `popover="manual"`, never `"auto"`. An auto popover joins the light-dismiss group,
	 * which force-closes every other open auto popover outside its ancestor chain — an
	 * overlay opening inside a menu would dismiss the menu.
	 *
	 * The attribute is set here rather than rendered in JSX for the reason
	 * `toast-viewport.tsx` records: jsdom parses `popover` without implementing the API,
	 * so a rendered attribute would leave the element `display: none` for the whole jsdom
	 * project. Setting it only where `showPopover` exists keeps attribute and capability
	 * together.
	 */
	useIsomorphicLayoutEffect(() => {
		const el = ref.current
		if (!el || typeof el.showPopover !== 'function') return

		el.setAttribute('popover', 'manual')
		try {
			el.showPopover()
		} catch {
			// Disconnected or mid-transition. Losing the promotion costs stacking order,
			// not correctness — the overlay is still placed and readable.
		}

		return () => {
			try {
				if (el.matches(':popover-open')) el.hidePopover()
			} catch {
				/* unmounting anyway */
			}
		}
		// `open` is load-bearing here, not decoration. Callers keep the component mounted
		// and return `null` while closed, so on an empty dependency array this would run
		// once against a still-null ref and never again — the overlay would render,
		// correctly placed, and never enter the top layer. It failed exactly that way once.
	}, [ref, open])

	/** The fallback placement. Never runs where CSS can do the job. */
	useIsomorphicLayoutEffect(() => {
		if (supportsAnchorPositioning()) return
		const el = ref.current
		const anchor = getAnchorElement()
		if (!el || !anchor) return

		const place = () => {
			const { top, left } = computeFallbackPosition(
				anchor.getBoundingClientRect(),
				el.getBoundingClientRect(),
				side,
				align,
				sideOffset
			)
			el.style.top = `${top}px`
			el.style.left = `${left}px`
		}

		place()

		// `capture: true` so a scroll in any ancestor is caught — scroll does not bubble.
		window.addEventListener('scroll', place, true)
		window.addEventListener('resize', place)
		return () => {
			window.removeEventListener('scroll', place, true)
			window.removeEventListener('resize', place)
		}
	}, [ref, open, getAnchorElement, side, align, sideOffset])
}
