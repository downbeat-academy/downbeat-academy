'use client'

import React, { forwardRef, useCallback } from 'react'
import classnames from 'classnames'
import { Slot } from '../slot'
import s from './tooltip.module.css'
import { useTooltipContext } from './tooltip-context'

import type { TooltipTriggerProps } from './types'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
	(
		{
			asChild = false,
			className,
			children,
			style,
			onPointerEnter,
			onPointerLeave,
			onFocus,
			onBlur,
			onClick,
			...rest
		},
		ref
	) => {
		const {
			open,
			contentId,
			anchorName,
			setTriggerElement,
			openWithDelay,
			openImmediately,
			close,
			closeWithGrace,
		} = useTooltipContext('TooltipTrigger')

		const handlePointerEnter = useCallback(
			(event: React.PointerEvent<HTMLButtonElement>) => {
				onPointerEnter?.(event)
				// A touch tap fires pointerenter immediately before click. Opening on it
				// would show a tooltip the user cannot dismiss without navigating away.
				if (event.pointerType === 'touch') return
				openWithDelay()
			},
			[onPointerEnter, openWithDelay]
		)

		const handlePointerLeave = useCallback(
			(event: React.PointerEvent<HTMLButtonElement>) => {
				onPointerLeave?.(event)
				if (event.pointerType === 'touch') return
				// Grace, not an immediate close — the pointer may be on its way to the
				// tooltip, and it has to cross the `sideOffset` gap to get there.
				closeWithGrace()
			},
			[onPointerLeave, closeWithGrace]
		)

		// Keyboard focus opens with no delay: the delay exists to stop tooltips flickering
		// as a pointer sweeps across a toolbar, which is not a thing that happens to focus.
		const handleFocus = useCallback(
			(event: React.FocusEvent<HTMLButtonElement>) => {
				onFocus?.(event)
				openImmediately()
			},
			[onFocus, openImmediately]
		)

		const handleBlur = useCallback(
			(event: React.FocusEvent<HTMLButtonElement>) => {
				onBlur?.(event)
				close()
			},
			[onBlur, close]
		)

		// A tooltip must not survive the action it describes. Radix closed on click too.
		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event)
				close()
			},
			[onClick, close]
		)

		const Comp: React.ElementType = asChild ? Slot : 'button'

		return (
			<Comp
				ref={composeRefs(ref, setTriggerElement)}
				// `aria-describedby` only while open. Pointing at an element that is not in
				// the DOM makes the reference dangling, and some screen readers announce
				// nothing at all rather than skipping it.
				aria-describedby={open ? contentId : undefined}
				data-state={open ? 'open' : 'closed'}
				// The anchor is published as a custom property rather than the
				// `anchor-name` property itself, so the value survives engines that do not
				// recognise the property, and so the stylesheet decides how to consume it.
				//
				// Merged with the consumer's `style` rather than set alongside it. `...rest`
				// is spread after this, so an incoming `style` prop would otherwise replace
				// the whole object and take the anchor with it — leaving the tooltip
				// unanchored and parked at its static position.
				style={
					{
						...style,
						'--cds-tooltip-anchor': anchorName,
					} as React.CSSProperties
				}
				className={classnames(s.trigger, className)}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onClick={handleClick}
				{...(asChild ? {} : { type: 'button' as const })}
				{...rest}
			>
				{children}
			</Comp>
		)
	}
)

TooltipTrigger.displayName = 'TooltipTrigger'

export { TooltipTrigger }
