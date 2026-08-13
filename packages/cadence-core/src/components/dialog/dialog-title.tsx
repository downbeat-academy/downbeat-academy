'use client'

import React, { forwardRef, useEffect } from 'react'
import classnames from 'classnames'
import s from './dialog.module.css'
import { useDialogContext } from './dialog-context'
import type { DialogTitleProps } from './types'

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
	({ className, ...props }, ref) => {
		const { titleId, registerTitle } = useDialogContext('DialogTitle')

		// Registers so `DialogContent` knows to emit `aria-labelledby`. Without this the
		// content would have to point at an id that may name nothing.
		useEffect(() => registerTitle(), [registerTitle])

		return (
			<h2
				id={titleId}
				className={classnames(s.title, className)}
				ref={ref}
				{...props}
			/>
		)
	}
)

DialogTitle.displayName = 'DialogTitle'

export { DialogTitle }
