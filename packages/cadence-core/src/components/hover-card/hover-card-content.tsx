'use client'

import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import s from './hover-card.module.css'
import { useHoverCardContext } from './hover-card-context'
import { useAnchoredOverlay } from '../overlay'

import type { HoverCardContentProps } from './types'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
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
			onFocus,
			onBlur,
			...rest
		},
		ref
	) => {
		const {
			open,
			contentId,
			triggerId,
			anchorName,
			side: contextSide,
			align: contextAlign,
			getTriggerElement,
			cancelClose,
			closeWithDelay,
			close,
		} = useHoverCardContext('HoverCardContent')

		const contentRef = useRef<HTMLDivElement | null>(null)
		const side = sideProp ?? contextSide
		const align = alignProp ?? contextAlign

		// Placement and top-layer promotion are shared with `Tooltip` — see `../overlay`.
		useAnchoredOverlay({
			ref: contentRef,
			open,
			getAnchorElement: getTriggerElement,
			side,
			align,
			sideOffset,
		})

		// `dismiss: true` — closing alone is not enough. Removing the card from the top
		// layer makes the browser re-hit-test, and a trigger under a resting cursor gets a
		// fresh `pointerenter` that reopens it immediately.
		useEffect(() => {
			const onKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') close({ dismiss: true })
			}
			document.addEventListener('keydown', onKeyDown)
			return () => document.removeEventListener('keydown', onKeyDown)
		}, [close])

		// Arriving on the card cancels the pending close. This is the whole point of a
		// hover card over a tooltip: the content is meant to be reached and used.
		const handlePointerEnter = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				onPointerEnter?.(event)
				cancelClose()
			},
			[onPointerEnter, cancelClose]
		)

		const handlePointerLeave = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				onPointerLeave?.(event)
				closeWithDelay()
			},
			[onPointerLeave, closeWithDelay]
		)

		// Focus moving into the card keeps it open, so its links are keyboard-reachable.
		const handleFocus = useCallback(
			(event: React.FocusEvent<HTMLDivElement>) => {
				onFocus?.(event)
				cancelClose()
			},
			[onFocus, cancelClose]
		)

		const handleBlur = useCallback(
			(event: React.FocusEvent<HTMLDivElement>) => {
				onBlur?.(event)
				// Only when focus leaves the card entirely — moving between two links inside
				// it fires blur on the first, and closing there would be unusable.
				if (
					event.relatedTarget instanceof Node &&
					event.currentTarget.contains(event.relatedTarget)
				) {
					return
				}
				closeWithDelay()
			},
			[onBlur, closeWithDelay]
		)

		if (!open) return null

		return (
			<div
				ref={composeRefs(ref, contentRef)}
				id={contentId}
				// `dialog`, not `tooltip`. A tooltip is a plain text description and its
				// contents are not reachable; this holds links and is meant to be entered.
				// `aria-labelledby` points at the trigger so the card is announced with the
				// name of the thing it belongs to.
				role="dialog"
				aria-labelledby={triggerId}
				data-state="open"
				data-side={side}
				data-align={align}
				style={
					{
						...style,
						'--cds-hover-card-anchor': anchorName,
						'--cds-hover-card-offset': `${sideOffset}px`,
					} as React.CSSProperties
				}
				className={classnames(s.content, className)}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...rest}
			>
				{children}
			</div>
		)
	}
)

HoverCardContent.displayName = 'HoverCardContent'

export { HoverCardContent }
