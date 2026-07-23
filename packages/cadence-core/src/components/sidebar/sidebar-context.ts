'use client'

import { createContext, useContext } from 'react'

export interface SidebarContextValue {
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar(): SidebarContextValue {
	const ctx = useContext(SidebarContext)
	if (!ctx) {
		throw new Error('useSidebar must be used within a <Sidebar> component.')
	}
	return ctx
}

/**
 * True when the surrounding `<SidebarSection>` has rendered a `<ul>`. Links and
 * separators use this to decide whether an `<li>` wrapper is valid — outside a
 * section there is no list, and an orphan `<li>` under `<nav>` is invalid HTML.
 */
export const SidebarListContext = createContext(false)

export function useSidebarList(): boolean {
	return useContext(SidebarListContext)
}
