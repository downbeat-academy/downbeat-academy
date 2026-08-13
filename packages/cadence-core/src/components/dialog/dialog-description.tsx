'use client'

import React, { forwardRef, useEffect } from 'react'
import classnames from 'classnames'
import s from './dialog.module.css'
import { useDialogContext } from './dialog-context'
import type { DialogDescriptionProps } from './types'

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
	({ className, ...props }, ref) => {
		const { descriptionId, registerDescription } =
			useDialogContext('DialogDescription')

		// See `dialog-title.tsx` — this is what makes `aria-describedby` conditional.
		// Radix emitted it unconditionally, so a dialog with no description pointed at a
		// nonexistent element. Axe does not flag that; it is still a dangling IDREF.
		useEffect(() => registerDescription(), [registerDescription])

		return (
			<p
				id={descriptionId}
				className={classnames(s.description, className)}
				ref={ref}
				{...props}
			/>
		)
	}
)

DialogDescription.displayName = 'DialogDescription'

export { DialogDescription }
