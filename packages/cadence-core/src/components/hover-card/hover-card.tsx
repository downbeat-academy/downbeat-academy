'use client'

import React, {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react'
import { HoverCardContext } from './hover-card-context'
import { useAnchorName } from '../overlay'

import type { HoverCardProps } from './types'
import type { HoverCardContextValue } from './hover-card-context'

/**
 * A hover card differs from a tooltip in one way that changes everything about its
 * timing: **it is interactive**. The card can hold links and buttons, so the pointer must
 * be able to leave the trigger, cross the `sideOffset` gap, and land on the card without
 * it closing underneath. That is what `closeDelay` buys, and why every pointer-out path
 * schedules rather than closes.
 *
 * Placement is shared with `Tooltip` through `../overlay`. The timing is not.
 */
const HoverCard = ({
	children,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	openDelay = 300,
	closeDelay = 150,
	side = 'top',
	align = 'center',
}: HoverCardProps) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
	const isControlled = openProp !== undefined
	const open = isControlled ? openProp : uncontrolledOpen

	const baseId = useId()
	const anchorName = useAnchorName(baseId, 'hover-card')
	const contentId = `${baseId}-content`
	const triggerId = `${baseId}-trigger`

	const triggerRef = useRef<HTMLElement | null>(null)
	const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	/**
	 * Set when Escape dismisses the card, cleared when the pointer leaves the trigger.
	 *
	 * Same reason as `Tooltip`'s: dismissing removes the card from the top layer, the
	 * browser re-runs hit-testing, and a trigger still under a resting cursor gets a fresh
	 * `pointerenter` that reopens it in the same frame. Without this, Escape does nothing
	 * at all for anyone using a mouse.
	 */
	const dismissed = useRef(false)

	const cancelOpen = useCallback(() => {
		if (openTimer.current) clearTimeout(openTimer.current)
		openTimer.current = null
	}, [])

	const cancelClose = useCallback(() => {
		if (closeTimer.current) clearTimeout(closeTimer.current)
		closeTimer.current = null
	}, [])

	const setOpen = useCallback(
		(next: boolean) => {
			// Never written in controlled mode, so an owner that ignores `onOpenChange`
			// cannot drift away from what it rendered.
			if (!isControlled) setUncontrolledOpen(next)
			onOpenChange?.(next)
		},
		[isControlled, onOpenChange]
	)

	const openWithDelay = useCallback(() => {
		if (dismissed.current) return
		cancelClose()
		cancelOpen()
		if (openDelay <= 0) {
			setOpen(true)
			return
		}
		openTimer.current = setTimeout(() => {
			openTimer.current = null
			setOpen(true)
		}, openDelay)
	}, [cancelClose, cancelOpen, openDelay, setOpen])

	const closeWithDelay = useCallback(() => {
		// The pointer or focus has left, so an Escape dismissal has served its purpose.
		dismissed.current = false
		cancelOpen()
		cancelClose()
		if (closeDelay <= 0) {
			setOpen(false)
			return
		}
		closeTimer.current = setTimeout(() => {
			closeTimer.current = null
			setOpen(false)
		}, closeDelay)
	}, [cancelOpen, cancelClose, closeDelay, setOpen])

	const close = useCallback(
		(options?: { dismiss?: boolean }) => {
			cancelOpen()
			cancelClose()
			if (options?.dismiss) dismissed.current = true
			setOpen(false)
		},
		[cancelOpen, cancelClose, setOpen]
	)

	useEffect(
		() => () => {
			cancelOpen()
			cancelClose()
		},
		[cancelOpen, cancelClose]
	)

	const value = useMemo<HoverCardContextValue>(
		() => ({
			open,
			contentId,
			triggerId,
			anchorName,
			side,
			align,
			setTriggerElement: (el) => {
				triggerRef.current = el
			},
			getTriggerElement: () => triggerRef.current,
			openWithDelay,
			cancelOpen,
			closeWithDelay,
			cancelClose,
			close,
		}),
		[
			open,
			contentId,
			triggerId,
			anchorName,
			side,
			align,
			openWithDelay,
			cancelOpen,
			closeWithDelay,
			cancelClose,
			close,
		]
	)

	return (
		<HoverCardContext.Provider value={value}>
			{children}
		</HoverCardContext.Provider>
	)
}

HoverCard.displayName = 'HoverCard'

export { HoverCard }
