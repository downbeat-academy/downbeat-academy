import React from 'react'

export interface DialogProps {
	children?: React.ReactNode
	/** Controlled open state. Omit for an uncontrolled dialog. */
	open?: boolean
	/** Initial open state when uncontrolled. */
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
}

export interface DialogContentProps
	// `open` is omitted because this component owns it: a modal dialog is opened with
	// `showModal()`, and the `open` attribute alone renders a *non-modal* one. Letting a
	// consumer set it would silently downgrade the dialog and make `showModal()` throw.
	extends Omit<React.ComponentPropsWithoutRef<'dialog'>, 'open'> {}

export interface DialogTriggerProps
	extends React.ComponentPropsWithoutRef<'button'> {
	/** Merge the trigger's props onto the child element instead of rendering a button. */
	asChild?: boolean
}

export interface DialogCloseProps extends React.ComponentPropsWithoutRef<'button'> {
	/** Merge the close button's props onto the child element instead of rendering one. */
	asChild?: boolean
}

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<'h2'> {}

export interface DialogDescriptionProps
	extends React.ComponentPropsWithoutRef<'p'> {}

export interface DialogHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogFooterProps
	extends React.HTMLAttributes<HTMLDivElement> {}
