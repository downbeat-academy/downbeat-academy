'use client'

import React, {
	forwardRef,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from 'react'
import classnames from 'classnames'
import s from './tooltip.module.css'
import { useTooltipContext } from './tooltip-context'
import {
	computeFallbackPosition,
	supportsAnchorPositioning,
} from './tooltip-position'

import type { TooltipContentProps } from './types'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

// `useLayoutEffect` warns during SSR. The content only ever renders once open, which is a
// client-side event, but a consumer rendering `<Tooltip open>` on the server would trip it.
const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
	(
		{
			className,
			sideOffset = 4,
			side: sideProp,
			align: alignProp,
			children,
			style,
			onPointerEnter,
			onPointerLeave,
			...rest
		},
		ref
	) => {
		const {
			open,
			contentId,
			anchorName,
			side: contextSide,
			align: contextAlign,
			getTriggerElement,
			close,
			closeWithGrace,
			cancelClose,
			disableHoverableContent,
		} = useTooltipContext('TooltipContent')

		const contentRef = useRef<HTMLDivElement | null>(null)
		const side = sideProp ?? contextSide
		const align = alignProp ?? contextAlign

		/**
		 * Promote into the top layer.
		 *
		 * `popover="manual"`, never `"auto"`. An auto popover joins the light-dismiss
		 * group, which force-closes every other open auto popover outside its ancestor
		 * chain — a tooltip inside an open menu would dismiss the menu. Manual also means
		 * Escape is ours to handle, which the effect below does.
		 *
		 * The attribute is set here rather than in JSX for the reason `toast-viewport.tsx`
		 * records: jsdom parses `popover` without implementing the API, so a rendered
		 * attribute would leave the element `display: none` forever in the jsdom project.
		 * Setting it only where `showPopover` exists keeps attribute and capability
		 * together.
		 */
		useIsomorphicLayoutEffect(() => {
			const el = contentRef.current
			if (!el || typeof el.showPopover !== 'function') return

			el.setAttribute('popover', 'manual')
			try {
				el.showPopover()
			} catch {
				// Disconnected or mid-transition. Losing top-layer promotion costs stacking
				// order, not correctness — the tooltip is still positioned and readable.
			}

			return () => {
				try {
					if (el.matches(':popover-open')) el.hidePopover()
				} catch {
					/* unmounting anyway */
				}
			}
			// `open` is load-bearing in this dependency list, not decoration. This
			// component stays mounted and returns `null` while closed, so on an empty
			// array the effect would run once against a ref that is still null and never
			// run again — the content would render, correctly positioned, and never be
			// promoted into the top layer. It failed exactly that way once.
		}, [open])

		/**
		 * The fallback placement, for engines with no CSS anchor positioning.
		 *
		 * Runs only when `supportsAnchorPositioning()` is false. Where it is true the
		 * stylesheet owns placement entirely and this never writes an inline style, so the
		 * two mechanisms cannot fight over the same properties.
		 */
		useIsomorphicLayoutEffect(() => {
			if (supportsAnchorPositioning()) return
			const el = contentRef.current
			const trigger = getTriggerElement()
			if (!el || !trigger) return

			const place = () => {
				const { top, left } = computeFallbackPosition(
					trigger.getBoundingClientRect(),
					el.getBoundingClientRect(),
					side,
					align,
					sideOffset
				)
				el.style.top = `${top}px`
				el.style.left = `${left}px`
			}

			place()

			// `capture: true` so a scroll in any ancestor is caught, not just the window —
			// scroll does not bubble.
			window.addEventListener('scroll', place, true)
			window.addEventListener('resize', place)
			return () => {
				window.removeEventListener('scroll', place, true)
				window.removeEventListener('resize', place)
			}
		}, [getTriggerElement, side, align, sideOffset])

		// Escape closes, per APG. Bound to the document because focus is on the trigger,
		// not the tooltip, so a handler on the content would never see the key.
		useEffect(() => {
			const onKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') close()
			}
			document.addEventListener('keydown', onKeyDown)
			return () => document.removeEventListener('keydown', onKeyDown)
		}, [close])

		const handlePointerEnter = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				onPointerEnter?.(event)
				// Cancelling the pending close is what keeps the tooltip alive while the
				// pointer is over it — which is what makes a tooltip containing a link
				// usable at all. Cancelling rather than re-opening, because the tooltip is
				// already open and re-opening would clear the provider's skip window.
				if (!disableHoverableContent) cancelClose()
			},
			[onPointerEnter, disableHoverableContent, cancelClose]
		)

		const handlePointerLeave = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				onPointerLeave?.(event)
				// Grace here too, so travelling back onto the trigger does not close it.
				if (!disableHoverableContent) closeWithGrace()
			},
			[onPointerLeave, disableHoverableContent, closeWithGrace]
		)

		// Unmounted when closed rather than hidden. There is no exit animation to wait for,
		// and leaving a stale tooltip in the DOM is what made `aria-describedby` dangle.
		if (!open) return null

		return (
			<div
				ref={composeRefs(ref, contentRef)}
				id={contentId}
				role="tooltip"
				data-state="open"
				data-side={side}
				data-align={align}
				// Consumer style first: `...rest` is spread after this, so setting the two
				// custom properties alongside an incoming `style` prop would let the
				// consumer's object replace them wholesale and unanchor the tooltip.
				style={
					{
						...style,
						'--cds-tooltip-anchor': anchorName,
						'--cds-tooltip-offset': `${sideOffset}px`,
					} as React.CSSProperties
				}
				className={classnames(s.content, className)}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				{...rest}
			>
				{children}
			</div>
		)
	}
)

TooltipContent.displayName = 'TooltipContent'

export { TooltipContent }
