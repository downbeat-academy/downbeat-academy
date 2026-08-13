'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ModalSurface } from '../modal'
import s from './dialog.module.css'
import type { DialogContentProps } from './types'

const DialogContent = forwardRef<HTMLDialogElement, DialogContentProps>(
	({ className, ...props }, ref) => (
		<ModalSurface
			ref={ref}
			className={classnames(s.content, className)}
			closeClassName={s.close}
			{...props}
		/>
	)
)

DialogContent.displayName = 'DialogContent'

export { DialogContent }
