'use client'

import { createContext, useContext } from 'react'

/**
 * Shared state for a group of native radios.
 *
 * The browser already coordinates selection, arrow-key navigation and roving tabindex for
 * `<input type="radio">` elements that share a `name` — that is the whole reason this
 * component no longer needs `@radix-ui/react-roving-focus`. What it cannot do is surface a
 * group-level value to React, because HTML has no group element and no group change event.
 * That is all this context carries.
 */
export interface RadioGroupContextValue {
	/** The shared `name`, which is what makes the browser treat these inputs as one group. */
	name: string
	/** Set when the group is controlled. */
	value?: string
	/** Set when the group is uncontrolled. */
	defaultValue?: string
	/** Whether the group is controlled, which `value === undefined` alone cannot answer. */
	isControlled: boolean
	onChange?: (value: string) => void
	disabled?: boolean
	required?: boolean
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
	null
)

/**
 * Returns the enclosing group, or `null` for a standalone `Radio`. A bare radio outside a
 * group is unusual but valid HTML, so this deliberately does not throw.
 */
export function useRadioGroup(): RadioGroupContextValue | null {
	return useContext(RadioGroupContext)
}
