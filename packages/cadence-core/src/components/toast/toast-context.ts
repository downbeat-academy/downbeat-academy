'use client'

import { createContext, useContext } from 'react'

interface ToastProviderContextValue {
	/** Auto-dismiss duration in ms, overridable per toast. @default 5000 */
	duration: number
	/** Accessible name for the viewport region. @default 'Notifications (F8)' */
	label: string
	swipeDirection: 'right' | 'left' | 'up' | 'down'
	/** Distance in px a swipe must travel to dismiss. @default 50 */
	swipeThreshold: number
	/**
	 * Publish a toast's text to the shared live region.
	 *
	 * The region is persistent and lives in the viewport, rather than each toast being its
	 * own live region. A live region that appears at the same moment as its content is
	 * unreliable — several screen readers only announce mutations to regions that already
	 * existed. This is also why the close button is never part of what gets published:
	 * only the title and description are, so "Close" is not read as part of the message.
	 */
	announce: (text: string, politeness?: 'polite' | 'assertive') => void
	/**
	 * The viewport's `<ol>`, once mounted.
	 *
	 * Toasts portal into it rather than rendering where they are written. The documented
	 * composition puts `<Toast>` as a *sibling* of `<ToastViewport>`, so rendering in
	 * place would leave a bare `<li>` outside any list — invalid HTML, an axe `listitem`
	 * violation, and no list semantics for a screen reader. Radix solved this the same
	 * way.
	 */
	viewportElement: HTMLOListElement | null
	setViewportElement: (el: HTMLOListElement | null) => void
}

const ToastProviderContext = createContext<ToastProviderContextValue | null>(
	null
)

const DEFAULTS: ToastProviderContextValue = {
	duration: 5000,
	label: 'Notifications (F8)',
	swipeDirection: 'right',
	swipeThreshold: 50,
	announce: () => {},
	viewportElement: null,
	setViewportElement: () => {},
}

/**
 * Optional, like `TooltipProvider`. Radix threw without one; a toast that refuses to
 * render is a worse failure than one that renders with default timing.
 */
const useToastProvider = (): ToastProviderContextValue =>
	useContext(ToastProviderContext) ?? DEFAULTS

/**
 * Per-toast context, so `ToastClose` and `ToastAction` can dismiss the toast they are
 * inside without the consumer wiring a handler through. Radix did this through its Root's
 * internal context; this is the same idea with a name.
 */
interface ToastItemContextValue {
	close: () => void
}

const ToastItemContext = createContext<ToastItemContextValue | null>(null)

const useToastItem = (component: string): ToastItemContextValue => {
	const context = useContext(ToastItemContext)
	if (!context) {
		throw new Error(`\`${component}\` must be rendered inside a \`<Toast>\`.`)
	}
	return context
}

export {
	ToastProviderContext,
	useToastProvider,
	ToastItemContext,
	useToastItem,
	DEFAULTS,
}
export type { ToastProviderContextValue, ToastItemContextValue }
