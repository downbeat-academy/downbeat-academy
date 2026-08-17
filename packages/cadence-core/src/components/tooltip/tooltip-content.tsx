'use client'

import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import s from './tooltip.module.css'
import { useTooltipContext } from './tooltip-context'
import { useAnchoredOverlay } from '../overlay'

import type { TooltipContentProps } from './types'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

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

		// Placement and top-layer promotion both live in the shared `overlay/` module,
		// because `HoverCard` needs exactly the same two mechanisms. What stays here is the
		// interaction timing, which is genuinely tooltip-specific.
		useAnchoredOverlay({
			ref: contentRef,
			open,
			getAnchorElement: getTriggerElement,
			side,
			align,
			sideOffset,
		})

		// Escape closes, per APG. Bound to the document because focus is on the trigger,
		// not the tooltip, so a handler on the content would never see the key.
		//
		// `dismiss: true` latches it shut. Closing alone is not enough: removing the
		// tooltip from the top layer makes the browser re-hit-test, and a trigger still
		// under a resting cursor gets a fresh `pointerenter` that reopens it immediately.
		useEffect(() => {
			const onKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') close({ dismiss: true })
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
