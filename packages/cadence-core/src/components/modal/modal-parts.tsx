'use client'

import React, { forwardRef, useEffect } from 'react'
import { Slot, composeRefs } from '../slot'
import { useModalContext } from './modal-context'
import type {
	ModalCloseProps,
	ModalDescriptionProps,
	ModalTitleProps,
	ModalTriggerProps,
} from './types'

/**
 * The trigger, close, title and description shared by `Dialog` and `Drawer`.
 *
 * `asChild` is reimplemented on the in-house `Slot` from A.6 rather than dropped — it is
 * in shipping use on both components: `account/update-profile/index.tsx` for `Dialog`,
 * `components/changelog/changelog-drawer.tsx` for `Drawer`.
 */

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
	({ asChild = false, className, onClick, ...props }, forwardedRef) => {
		const { open, setOpen, contentId, triggerRef } = useModalContext('ModalTrigger')
		const Comp = (asChild ? Slot : 'button') as React.ElementType

		return (
			<Comp
				// Composed as HTMLElement, not HTMLButtonElement: with `asChild` the
				// rendered node is whatever the consumer supplied — an anchor, a Cadence
				// Button — which is why the context stores the wider type.
				ref={composeRefs<HTMLElement>(
					forwardedRef as React.Ref<HTMLElement> | undefined,
					triggerRef
				)}
				type="button"
				className={className}
				aria-haspopup="dialog"
				aria-expanded={open}
				// Conditional: while closed there is no element with this id to point at,
				// and a dangling IDREF is worse than an absent attribute. Radix 1.1.23
				// made the same change.
				aria-controls={open ? contentId : undefined}
				data-state={open ? 'open' : 'closed'}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					onClick?.(event)
					if (!event.defaultPrevented) setOpen(true)
				}}
				{...props}
			/>
		)
	}
)
ModalTrigger.displayName = 'ModalTrigger'

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
	({ asChild = false, className, onClick, ...props }, forwardedRef) => {
		const { setOpen } = useModalContext('ModalClose')

		// Deliberately not `<form method="dialog">`, which is the other way to close a
		// native dialog: it closes the element behind React's back, so the controlled
		// `open` prop would desync.
		const Comp = (asChild ? Slot : 'button') as React.ElementType

		return (
			<Comp
				ref={forwardedRef}
				type="button"
				className={className}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					onClick?.(event)
					if (!event.defaultPrevented) setOpen(false)
				}}
				{...props}
			/>
		)
	}
)
ModalClose.displayName = 'ModalClose'

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
	({ className, ...props }, ref) => {
		const { titleId, registerTitle } = useModalContext('ModalTitle')

		// Registers so the surface knows to emit `aria-labelledby`. Without this the
		// content would have to point at an id that may name nothing.
		useEffect(() => registerTitle(), [registerTitle])

		return <h2 id={titleId} className={className} ref={ref} {...props} />
	}
)
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
	({ className, ...props }, ref) => {
		const { descriptionId, registerDescription } =
			useModalContext('ModalDescription')

		// See `ModalTitle` — this is what makes `aria-describedby` conditional. Radix
		// emitted it unconditionally, so a modal with no description pointed at a
		// nonexistent element.
		useEffect(() => registerDescription(), [registerDescription])

		return <p id={descriptionId} className={className} ref={ref} {...props} />
	}
)
ModalDescription.displayName = 'ModalDescription'

export { ModalTrigger, ModalClose, ModalTitle, ModalDescription }
