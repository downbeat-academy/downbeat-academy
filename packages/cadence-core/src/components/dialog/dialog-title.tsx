'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ModalTitle } from '../modal'
import s from './dialog.module.css'
import type { DialogTitleProps } from './types'

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
	({ className, ...props }, ref) => (
		<ModalTitle ref={ref} className={classnames(s.title, className)} {...props} />
	)
)

DialogTitle.displayName = 'DialogTitle'

export { DialogTitle }
