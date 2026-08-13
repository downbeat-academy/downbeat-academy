'use client'

import React, { forwardRef } from 'react'
import { Slot, composeRefs } from '../slot'
import { useDialogContext } from './dialog-context'
import type { DialogTriggerProps } from './types'

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
	({ asChild = false, className, onClick, ...props }, forwardedRef) => {
		const { open, setOpen, contentId, triggerRef } = useDialogContext('DialogTrigger')

		// `asChild` is reimplemented on the in-house `Slot` from A.6 rather than dropped:
		// it is in shipping use at `apps/www/src/app/(pages)/account/update-profile/
		// index.tsx`, where it puts these attributes onto a Cadence `<Button>`.
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

DialogTrigger.displayName = 'DialogTrigger'

export { DialogTrigger }
