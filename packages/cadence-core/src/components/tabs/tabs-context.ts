'use client'

import { createContext, useContext } from 'react'

interface TabsContextValue {
	/** The selected tab's value, or `undefined` when nothing is selected yet. */
	value: string | undefined
	/** Select a tab. Handles the controlled/uncontrolled split for its caller. */
	selectValue: (value: string) => void
	orientation: 'horizontal' | 'vertical'
	dir: 'ltr' | 'rtl'
	activationMode: 'automatic' | 'manual'
	/** `useId()` from the root, so triggers and panels can derive matching ids. */
	baseId: string
}

interface TabsListContextValue {
	/** Whether arrow navigation wraps at the ends. */
	loop: boolean
}

const TabsContext = createContext<TabsContextValue | null>(null)
const TabsListContext = createContext<TabsListContextValue | null>(null)

const useTabsContext = (component: string): TabsContextValue => {
	const context = useContext(TabsContext)
	if (!context) {
		throw new Error(`<${component}> must be rendered inside a <Tabs>.`)
	}
	return context
}

/**
 * `TabsTrigger` is the only consumer, and it is only ever rendered inside a `TabsList`
 * in practice — but a trigger placed outside one should degrade to "no wrapping" rather
 * than throw, since arrow navigation is the only thing that depends on it.
 */
const useTabsListContext = (): TabsListContextValue =>
	useContext(TabsListContext) ?? { loop: true }

/** The id a trigger renders, and the one its panel points at via `aria-labelledby`. */
const triggerId = (baseId: string, value: string) => `${baseId}-trigger-${value}`

/** The id a panel renders, and the one its trigger points at via `aria-controls`. */
const contentId = (baseId: string, value: string) => `${baseId}-content-${value}`

export {
	TabsContext,
	TabsListContext,
	useTabsContext,
	useTabsListContext,
	triggerId,
	contentId,
}
export type { TabsContextValue, TabsListContextValue }
