'use client'

import { createContext, useContext } from 'react'

import type { TooltipSide, TooltipAlign } from './types'

interface TooltipProviderContextValue {
	delayDuration: number
	skipDelayDuration: number
	disableHoverableContent: boolean
	/** Shared across a provider so a second tooltip opens instantly after a first. */
	isSkipping: () => boolean
	startSkipWindow: () => void
	cancelSkipWindow: () => void
}

/**
 * The provider is optional. Radix threw without one; a tooltip that silently refuses to
 * open is a worse failure than one that opens with the default delay, and every consumer
 * that wants a shared delay already mounts a provider.
 */
const TooltipProviderContext =
	createContext<TooltipProviderContextValue | null>(null)

const DEFAULT_PROVIDER: TooltipProviderContextValue = {
	delayDuration: 700,
	skipDelayDuration: 300,
	disableHoverableContent: false,
	isSkipping: () => false,
	startSkipWindow: () => {},
	cancelSkipWindow: () => {},
}

const useTooltipProvider = (): TooltipProviderContextValue =>
	useContext(TooltipProviderContext) ?? DEFAULT_PROVIDER

interface TooltipContextValue {
	open: boolean
	contentId: string
	/** The `anchor-name` this instance owns, e.g. `--cds-tooltip-r1`. */
	anchorName: string
	side: TooltipSide
	align: TooltipAlign
	setTriggerElement: (el: HTMLElement | null) => void
	getTriggerElement: () => HTMLElement | null
	/** Open after the configured delay. */
	openWithDelay: () => void
	/** Open now, no delay — focus and programmatic opens. */
	openImmediately: () => void
	/** Close now — blur, Escape, click. */
	close: () => void
	/**
	 * Close after a short grace period, cancellable by `cancelClose`.
	 *
	 * Pointer-out has to go through this. There is a real gap between trigger and tooltip
	 * (`sideOffset`), so moving onto the tooltip means leaving the trigger first; closing
	 * on that event would unmount the content before the pointer could arrive, and
	 * hoverable content would be unreachable.
	 */
	closeWithGrace: () => void
	cancelClose: () => void
	disableHoverableContent: boolean
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

const useTooltipContext = (component: string): TooltipContextValue => {
	const context = useContext(TooltipContext)
	if (!context) {
		throw new Error(`\`${component}\` must be rendered inside a \`<Tooltip>\`.`)
	}
	return context
}

export {
	TooltipProviderContext,
	TooltipContext,
	useTooltipProvider,
	useTooltipContext,
	DEFAULT_PROVIDER,
}
export type { TooltipProviderContextValue, TooltipContextValue }
