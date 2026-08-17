import type { OverlaySide, OverlayAlign } from './types'

/**
 * Whether this engine can place the tooltip with CSS alone.
 *
 * CSS anchor positioning is absent — not partial — below Chrome 125, Edge 125,
 * Firefox 147 and Safari 26.0. See `docs/adr/0003-browser-support-floor.md`, whose
 * original claim that Safari 18.2/18.3 supported `anchor()` was wrong and has been
 * corrected.
 *
 * Guarded for `CSS` itself because jsdom does not implement `CSS.supports`.
 */
export const supportsAnchorPositioning = (): boolean => {
	if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
		return false
	}
	return CSS.supports('anchor-name', '--probe')
}

/**
 * Viewport coordinates for the fallback path, where CSS cannot do it.
 *
 * This is deliberately *not* a positioning engine. There is no collision detection and no
 * flipping: ADR-0003 says an overlay that cannot flip is acceptable and an overlay that
 * renders in the wrong place is not, so this does the second thing and stops. Clamping to
 * the viewport is the one concession, because a tooltip rendered off-screen is
 * indistinguishable from a broken one.
 */
export function computeFallbackPosition(
	trigger: DOMRect,
	content: DOMRect,
	side: OverlaySide,
	align: OverlayAlign,
	sideOffset: number
): { top: number; left: number } {
	let top = 0
	let left = 0

	const alignAlong = (
		start: number,
		triggerSize: number,
		contentSize: number
	) => {
		if (align === 'start') return start
		if (align === 'end') return start + triggerSize - contentSize
		return start + triggerSize / 2 - contentSize / 2
	}

	switch (side) {
		case 'top':
			top = trigger.top - content.height - sideOffset
			left = alignAlong(trigger.left, trigger.width, content.width)
			break
		case 'bottom':
			top = trigger.bottom + sideOffset
			left = alignAlong(trigger.left, trigger.width, content.width)
			break
		case 'left':
			left = trigger.left - content.width - sideOffset
			top = alignAlong(trigger.top, trigger.height, content.height)
			break
		case 'right':
			left = trigger.right + sideOffset
			top = alignAlong(trigger.top, trigger.height, content.height)
			break
	}

	// `document.documentElement.clientWidth` rather than `window.innerWidth`: the latter
	// includes the scrollbar, which would let the tooltip sit under it.
	const viewportWidth = document.documentElement.clientWidth
	const viewportHeight = document.documentElement.clientHeight
	const margin = 4

	left = Math.min(
		Math.max(margin, left),
		Math.max(margin, viewportWidth - content.width - margin)
	)
	top = Math.min(
		Math.max(margin, top),
		Math.max(margin, viewportHeight - content.height - margin)
	)

	return { top, left }
}
