'use client'

import React, { useCallback, useId, useMemo, useRef, useState } from 'react'
import { DialogContext } from './dialog-context'

import type { DialogProps } from './types'

const Dialog = ({
	children,
	open,
	defaultOpen = false,
	onOpenChange,
}: DialogProps) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
	const [titleCount, setTitleCount] = useState(0)
	const [descriptionCount, setDescriptionCount] = useState(0)
	const triggerRef = useRef<HTMLElement | null>(null)
	const baseId = useId()

	// Controlled when `open` is supplied. The internal state is never written in that
	// mode, so a controlled dialog whose owner ignores `onOpenChange` stays exactly where
	// the owner put it rather than closing itself and snapping back on re-render.
	const isControlled = open !== undefined
	const isOpen = isControlled ? open : uncontrolledOpen

	const setOpen = useCallback(
		(next: boolean) => {
			if (!isControlled) setUncontrolledOpen(next)
			onOpenChange?.(next)
		},
		[isControlled, onOpenChange]
	)

	// Counters rather than booleans: two descriptions is a consumer error, but the second
	// one unmounting should not clear the flag while the first is still there.
	const registerTitle = useCallback(() => {
		setTitleCount((count) => count + 1)
		return () => setTitleCount((count) => count - 1)
	}, [])

	const registerDescription = useCallback(() => {
		setDescriptionCount((count) => count + 1)
		return () => setDescriptionCount((count) => count - 1)
	}, [])

	const context = useMemo(
		() => ({
			open: isOpen,
			setOpen,
			contentId: `${baseId}-content`,
			titleId: `${baseId}-title`,
			descriptionId: `${baseId}-description`,
			hasTitle: titleCount > 0,
			hasDescription: descriptionCount > 0,
			registerTitle,
			registerDescription,
			triggerRef,
		}),
		[
			isOpen,
			setOpen,
			baseId,
			titleCount,
			descriptionCount,
			registerTitle,
			registerDescription,
		]
	)

	// The root renders no element of its own — it never did. The `<dialog>` lives in the
	// top layer, so there is nothing for a wrapper to position or contain.
	return <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
}

Dialog.displayName = 'Dialog'

export { Dialog }
