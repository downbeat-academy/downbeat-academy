'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ModalDescription } from '../modal'
import s from './dialog.module.css'
import type { DialogDescriptionProps } from './types'

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
	({ className, ...props }, ref) => (
		<ModalDescription
			ref={ref}
			className={classnames(s.description, className)}
			{...props}
		/>
	)
)

DialogDescription.displayName = 'DialogDescription'

export { DialogDescription }
