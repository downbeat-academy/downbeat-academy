'use client'

import { createContext, useContext } from 'react'

interface ModalContextValue {
	open: boolean
	setOpen: (open: boolean) => void
	/** The `<dialog>` element's id, so the trigger can point `aria-controls` at it. */
	contentId: string
	titleId: string
	descriptionId: string
	/**
	 * Whether a title / description is actually rendered. `aria-labelledby` and
	 * `aria-describedby` are emitted only when they are — Radix always emitted
	 * `aria-describedby`, so a modal with no description pointed at an id that did not
	 * exist. Axe does not flag a dangling IDREF; it is still wrong.
	 */
	hasTitle: boolean
	hasDescription: boolean
	registerTitle: () => () => void
	registerDescription: () => () => void
	/** Focus returns here on close. */
	triggerRef: React.MutableRefObject<HTMLElement | null>
}

const ModalContext = createContext<ModalContextValue | null>(null)

const useModalContext = (component: string): ModalContextValue => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error(`<${component}> must be rendered inside its root component.`)
	}
	return context
}

export { ModalContext, useModalContext }
export type { ModalContextValue }
