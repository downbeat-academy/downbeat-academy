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
	// `useId` produces `:r1:` style values, which are not valid in a dashed-ident. Strip
	// everything a custom-ident cannot carry rather than hoping the shape never changes.
	const anchorName = useMemo(
		() => `--cds-tooltip-${baseId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
		[baseId]
	)
	const contentId = `${baseId}-content`

	const triggerRef = useRef<HTMLElement | null>(null)
	const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
		clearOpenTimer()
		cancelClose()
		provider.cancelSkipWindow()
		setOpen(true)
	}, [clearOpenTimer, cancelClose, provider, setOpen])

	const openWithDelay = useCallback(() => {
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

	const close = useCallback(() => {
		clearOpenTimer()
		cancelClose()
		// Only start the skip window if something was actually open — otherwise merely
		// sweeping the pointer across a trigger would make the next tooltip instant.
		if (open) provider.startSkipWindow()
		setOpen(false)
	}, [clearOpenTimer, cancelClose, open, provider, setOpen])

	const closeWithGrace = useCallback(() => {
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
