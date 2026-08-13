'use client'

import React, { forwardRef } from 'react'
import { Slot } from '../slot'
import { useDialogContext } from './dialog-context'
import type { DialogCloseProps } from './types'

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
	({ asChild = false, className, onClick, ...props }, forwardedRef) => {
		const { setOpen } = useDialogContext('DialogClose')

		// `asChild` here too — `apps/www/src/app/(pages)/account/update-profile/
		// update-profile-form.tsx` wraps a Cadence `<Button>` in one.
		//
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

DialogClose.displayName = 'DialogClose'

export { DialogClose }
