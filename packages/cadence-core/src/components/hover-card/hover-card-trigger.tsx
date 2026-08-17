'use client'

import React, { forwardRef, useCallback } from 'react'
import classnames from 'classnames'
import { QuestionCircleOutline } from 'cadence-icons'
import { Slot } from '../slot'
import s from './hover-card.module.css'
import { useHoverCardContext } from './hover-card-context'

import type { HoverCardTriggerProps } from './types'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

const HoverCardTrigger = forwardRef<HTMLAnchorElement, HoverCardTriggerProps>(
	(
		{
			asChild = false,
			hasIcon = false,
			iconAriaLabel = 'More information available',
			className,
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
			setTriggerElement,
			openWithDelay,
			cancelOpen,
			closeWithDelay,
		} = useHoverCardContext('HoverCardTrigger')

		const handlePointerEnter = useCallback(
			(event: React.PointerEvent<HTMLAnchorElement>) => {
				onPointerEnter?.(event)
				// A touch tap fires pointerenter immediately before click, and a hover card
				// opened that way covers the thing the user was about to reach.
				if (event.pointerType === 'touch') return
				openWithDelay()
			},
			[onPointerEnter, openWithDelay]
		)

		const handlePointerLeave = useCallback(
			(event: React.PointerEvent<HTMLAnchorElement>) => {
				onPointerLeave?.(event)
				if (event.pointerType === 'touch') return
				// Cancels a pending open as well as scheduling the close, so sweeping across
				// the trigger never opens a card a moment later.
				cancelOpen()
				closeWithDelay()
			},
			[onPointerLeave, cancelOpen, closeWithDelay]
		)

		// Keyboard focus opens with no delay. The delay exists to stop cards appearing
		// under a moving pointer, which is not something focus does.
		const handleFocus = useCallback(
			(event: React.FocusEvent<HTMLAnchorElement>) => {
				onFocus?.(event)
				openWithDelay()
			},
			[onFocus, openWithDelay]
		)

		const handleBlur = useCallback(
			(event: React.FocusEvent<HTMLAnchorElement>) => {
				onBlur?.(event)
				// Delayed, not immediate: focus may be moving into the card itself, and the
				// content's own focus handler cancels this.
				closeWithDelay()
			},
			[onBlur, closeWithDelay]
		)

		const Comp: React.ElementType = asChild ? Slot : 'a'

		return (
			<Comp
				ref={composeRefs(ref, setTriggerElement)}
				id={triggerId}
				// The card is supplementary content the trigger owns, so it is announced as
				// a description rather than replacing the trigger's own name. Only while
				// open — a dangling `aria-describedby` makes some screen readers announce
				// nothing at all.
				aria-describedby={open ? contentId : undefined}
				data-state={open ? 'open' : 'closed'}
				// Published as a custom property so the value survives engines that do not
				// recognise `anchor-name`, and merged with the consumer's `style` because
				// `...rest` is spread after this and would otherwise replace it wholesale.
				style={
					{
						...style,
						'--cds-hover-card-anchor': anchorName,
					} as React.CSSProperties
				}
				className={classnames(s.trigger, className)}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...rest}
			>
				{asChild ? (
					children
				) : (
					<>
						{children}
						{hasIcon && (
							<QuestionCircleOutline width={16} aria-label={iconAriaLabel} />
						)}
					</>
				)}
			</Comp>
		)
	}
)

HoverCardTrigger.displayName = 'HoverCardTrigger'

export { HoverCardTrigger }
