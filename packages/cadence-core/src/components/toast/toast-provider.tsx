'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ToastProviderContext } from './toast-context'

import type { ToastProviderProps } from './types'
import type { ToastProviderContextValue } from './toast-context'

/**
 * Supplies timing and the shared live region to every toast beneath it.
 *
 * Previously a bare re-export of Radix's `Toast.Provider`. It now owns state, which is
 * why `Toaster` renders it around both the list and the viewport.
 */
/** Long enough for a screen reader to pick the message up, short enough not to linger. */
const ANNOUNCEMENT_LIFETIME_MS = 1000

const ToastProvider = ({
	children,
	duration = 5000,
	label = 'Notifications (F8)',
	swipeDirection = 'right',
	swipeThreshold = 50,
}: ToastProviderProps) => {
	const [announcement, setAnnouncement] = useState('')
	const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite')
	// Guards against re-publishing identical text, which some screen readers skip
	// silently — two identical toasts in a row would announce once.
	const lastAnnouncement = useRef('')
	// State, not a ref: toasts need to re-render once the viewport exists so they can
	// portal into it.
	const [viewportElement, setViewportElement] =
		useState<HTMLOListElement | null>(null)

	const announce = useCallback(
		(text: string, level: 'polite' | 'assertive' = 'polite') => {
			if (!text) return
			setPoliteness(level)
			// A zero-width space when the text repeats: several screen readers skip a
			// mutation that leaves the region's content identical, so two identical toasts
			// in a row would announce once.
			setAnnouncement(
				text === lastAnnouncement.current ? `${text}\u200b` : text
			)
			lastAnnouncement.current = text
		},
		[]
	)

	/**
	 * Clear the region a moment after announcing.
	 *
	 * A live region that permanently holds the last message will re-announce it on
	 * unrelated mutations, and leaves a duplicate of every toast's text in the
	 * accessibility tree long after the toast has gone.
	 */
	useEffect(() => {
		if (!announcement) return
		const id = setTimeout(() => setAnnouncement(''), ANNOUNCEMENT_LIFETIME_MS)
		return () => clearTimeout(id)
	}, [announcement])

	const value = useMemo<ToastProviderContextValue>(
		() => ({
			duration,
			label,
			swipeDirection,
			swipeThreshold,
			announce,
			viewportElement,
			setViewportElement,
		}),
		[duration, label, swipeDirection, swipeThreshold, announce, viewportElement]
	)

	return (
		<ToastProviderContext.Provider value={value}>
			{children}
			{/*
			 * The live region. Persistent and mounted before any toast exists, because a
			 * region created at the same moment as its content is not reliably announced.
			 *
			 * Not visually hidden with `display: none` or `visibility: hidden` — both
			 * remove it from the accessibility tree, which would make it silent. The
			 * clip-based technique in the stylesheet is the one that keeps it exposed.
			 */}
			<div
				role="status"
				aria-live={politeness}
				aria-atomic="true"
				className="cds-toast-announcer"
				style={{
					position: 'absolute',
					width: 1,
					height: 1,
					padding: 0,
					margin: -1,
					overflow: 'hidden',
					clip: 'rect(0, 0, 0, 0)',
					whiteSpace: 'nowrap',
					borderWidth: 0,
				}}
			>
				{announcement}
			</div>
		</ToastProviderContext.Provider>
	)
}

ToastProvider.displayName = 'ToastProvider'

export { ToastProvider }
