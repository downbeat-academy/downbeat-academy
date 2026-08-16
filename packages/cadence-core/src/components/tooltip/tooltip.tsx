'use client'

import React, {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react'
import {
	TooltipContext,
	TooltipProviderContext,
	useTooltipProvider,
} from './tooltip-context'
import { useAnchorName } from '../overlay'

import type { TooltipProps, TooltipProviderProps } from './types'
import type {
	TooltipContextValue,
	TooltipProviderContextValue,
} from './tooltip-context'

/**
 * Shares a delay across every tooltip beneath it, and a "skip" window so that moving
 * between adjacent triggers does not re-pay the delay each time.
 *
 * Optional, unlike Radix's — see the note in `tooltip-context.ts`.
 */
const TooltipProvider = ({
	children,
	delayDuration = 700,
	skipDelayDuration = 300,
	disableHoverableContent = false,
}: TooltipProviderProps) => {
	// Refs, not state: the skip window must never re-render the tree. It is read at the
	// moment a pointer enters a trigger and written when one closes, and a re-render on
	// either would be a visible cost for something the user cannot see.
	const skipping = useRef(false)
	const skipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	const cancelSkipWindow = useCallback(() => {
		if (skipTimer.current) clearTimeout(skipTimer.current)
		skipTimer.current = null
		skipping.current = false
	}, [])

	const startSkipWindow = useCallback(() => {
		if (skipTimer.current) clearTimeout(skipTimer.current)
		skipping.current = true
		skipTimer.current = setTimeout(() => {
			skipping.current = false
			skipTimer.current = null
		}, skipDelayDuration)
	}, [skipDelayDuration])

	useEffect(
		() => () => {
			if (skipTimer.current) clearTimeout(skipTimer.current)
		},
		[]
	)

	const value = useMemo<TooltipProviderContextValue>(
		() => ({
			delayDuration,
			skipDelayDuration,
			disableHoverableContent,
			isSkipping: () => skipping.current,
			startSkipWindow,
			cancelSkipWindow,
		}),
		[
			delayDuration,
			skipDelayDuration,
			disableHoverableContent,
			startSkipWindow,
			cancelSkipWindow,
		]
	)

	return (
		<TooltipProviderContext.Provider value={value}>
			{children}
		</TooltipProviderContext.Provider>
	)
}

TooltipProvider.displayName = 'TooltipProvider'

/**
 * How long the tooltip survives a pointer leaving the trigger.
 *
 * Not configurable. It exists to span the `sideOffset` gap between trigger and tooltip,
 * which is a few pixels of travel, not a user-facing preference — exposing it would invite
 * consumers to tune away the only thing making hoverable content reachable.
 */
const CLOSE_GRACE_MS = 150

const Tooltip = ({
	children,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	delayDuration,
	disableHoverableContent,
	side = 'top',
	align = 'center',
}: TooltipProps) => {
	const provider = useTooltipProvider()
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
	const isControlled = openProp !== undefined
	const open = isControlled ? openProp : uncontrolledOpen

	const baseId = useId()
	const anchorName = useAnchorName(baseId, 'tooltip')
	const contentId = `${baseId}-content`

	const triggerRef = useRef<HTMLElement | null>(null)
	const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	/**
	 * Set when Escape dismisses the tooltip, and cleared when the pointer leaves the
	 * trigger or focus moves away.
	 *
	 * Without it, Escape does not work at all for a mouse user. Dismissing removes the
	 * tooltip from the top layer, the browser re-runs hit-testing, and the trigger still
	 * under the resting cursor receives a fresh `pointerenter` — which reopens the tooltip
	 * in the same frame. APG is explicit that Escape dismisses a tooltip and that it stays
	 * dismissed until hover or focus is re-established; this is what implements that.
	 *
	 * Found by a browser spec that failed only when a previous spec had physically moved
	 * the mouse over the trigger first, which is also the only condition a real user hits.
	 */
	const dismissed = useRef(false)

	const resolvedDelay = delayDuration ?? provider.delayDuration
	const resolvedHoverable =
		disableHoverableContent ?? provider.disableHoverableContent

	const clearOpenTimer = useCallback(() => {
		if (openTimer.current) clearTimeout(openTimer.current)
		openTimer.current = null
	}, [])

	const cancelClose = useCallback(() => {
		if (closeTimer.current) clearTimeout(closeTimer.current)
		closeTimer.current = null
	}, [])

	const setOpen = useCallback(
		(next: boolean) => {
			// The internal value is never written in controlled mode, so a controlled owner
			// that ignores `onOpenChange` cannot drift out of sync with what it rendered.
			if (!isControlled) setUncontrolledOpen(next)
			onOpenChange?.(next)
		},
		[isControlled, onOpenChange]
	)

	const openImmediately = useCallback(() => {
		if (dismissed.current) return
		clearOpenTimer()
		cancelClose()
		provider.cancelSkipWindow()
		setOpen(true)
	}, [clearOpenTimer, cancelClose, provider, setOpen])

	const openWithDelay = useCallback(() => {
		if (dismissed.current) return
		clearOpenTimer()
		// Inside the skip window a neighbouring tooltip just closed, so this one is a
		// continuation of the same gesture and opens at once.
		if (provider.isSkipping() || resolvedDelay <= 0) {
			openImmediately()
			return
		}
		openTimer.current = setTimeout(() => {
			openTimer.current = null
			setOpen(true)
		}, resolvedDelay)
	}, [clearOpenTimer, provider, resolvedDelay, openImmediately, setOpen])

	const close = useCallback(
		(options?: { dismiss?: boolean }) => {
			clearOpenTimer()
			cancelClose()
			// Only Escape latches. Blur and click close for reasons that do not survive the
			// pointer moving away and back.
			if (options?.dismiss) dismissed.current = true
			// Only start the skip window if something was actually open — otherwise merely
			// sweeping the pointer across a trigger would make the next tooltip instant.
			if (open) provider.startSkipWindow()
			setOpen(false)
		},
		[clearOpenTimer, cancelClose, open, provider, setOpen]
	)

	const closeWithGrace = useCallback(() => {
		// The pointer has left the trigger, so an Escape dismissal has served its purpose
		// and the tooltip may open again on the next hover.
		dismissed.current = false
		clearOpenTimer()
		cancelClose()
		// The skip window opens now, not when the close lands. The pointer leaving this
		// trigger is the moment the gesture continues towards a neighbour, and waiting out
		// the grace period first would make the next tooltip re-pay the full delay — the
		// flicker the skip window exists to prevent.
		if (open) provider.startSkipWindow()
		closeTimer.current = setTimeout(() => {
			closeTimer.current = null
			setOpen(false)
		}, CLOSE_GRACE_MS)
	}, [clearOpenTimer, cancelClose, open, provider, setOpen])

	useEffect(
		() => () => {
			clearOpenTimer()
			cancelClose()
		},
		[clearOpenTimer, cancelClose]
	)

	const value = useMemo<TooltipContextValue>(
		() => ({
			open,
			contentId,
			anchorName,
			side,
			align,
			setTriggerElement: (el) => {
				triggerRef.current = el
			},
			getTriggerElement: () => triggerRef.current,
			openWithDelay,
			openImmediately,
			close,
			closeWithGrace,
			cancelClose,
			disableHoverableContent: resolvedHoverable,
		}),
		[
			open,
			contentId,
			anchorName,
			side,
			align,
			openWithDelay,
			openImmediately,
			close,
			closeWithGrace,
			cancelClose,
			resolvedHoverable,
		]
	)

	return (
		<TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
	)
}

Tooltip.displayName = 'Tooltip'

export { Tooltip, TooltipProvider }
