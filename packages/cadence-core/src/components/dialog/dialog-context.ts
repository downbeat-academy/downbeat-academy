'use client'

import { createContext, useContext } from 'react'

interface DialogContextValue {
	open: boolean
	setOpen: (open: boolean) => void
	/** The `<dialog>` element, so the trigger can point `aria-controls` at it. */
	contentId: string
	titleId: string
	descriptionId: string
	/**
	 * Whether a `DialogTitle` / `DialogDescription` is actually rendered. `aria-labelledby`
	 * and `aria-describedby` are emitted only when they are — Radix always emitted
	 * `aria-describedby`, so a dialog with no description pointed at an id that did not
	 * exist. Axe does not flag a dangling IDREF; it is still wrong.
	 */
	hasTitle: boolean
	hasDescription: boolean
	registerTitle: () => () => void
	registerDescription: () => () => void
	/** Focus returns here on close. */
	triggerRef: React.MutableRefObject<HTMLElement | null>
}

const DialogContext = createContext<DialogContextValue | null>(null)

const useDialogContext = (component: string): DialogContextValue => {
	const context = useContext(DialogContext)
	if (!context) {
		throw new Error(`<${component}> must be rendered inside a <Dialog>.`)
	}
	return context
}

export { DialogContext, useDialogContext }
export type { DialogContextValue }
