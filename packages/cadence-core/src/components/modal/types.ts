import React from 'react'

export interface ModalRootProps {
	children?: React.ReactNode
	/** Controlled open state. Omit for an uncontrolled modal. */
	open?: boolean
	/** Initial open state when uncontrolled. */
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
}

export interface ModalSurfaceProps
	// `open` is omitted because this component owns it: a modal is opened with
	// `showModal()`, and the `open` attribute alone renders a *non-modal* dialog. Letting
	// a consumer set it would silently downgrade the modal and make `showModal()` throw.
	extends Omit<React.ComponentPropsWithoutRef<'dialog'>, 'open'> {
	/** Class for the built-in close button, which differs per stylesheet. */
	closeClassName?: string
}

export interface ModalTriggerProps
	extends React.ComponentPropsWithoutRef<'button'> {
	/** Merge the trigger's props onto the child element instead of rendering a button. */
	asChild?: boolean
}

export interface ModalCloseProps extends React.ComponentPropsWithoutRef<'button'> {
	/** Merge the close button's props onto the child element instead of rendering one. */
	asChild?: boolean
}

export interface ModalTitleProps extends React.ComponentPropsWithoutRef<'h2'> {}

export interface ModalDescriptionProps
	extends React.ComponentPropsWithoutRef<'p'> {}
