'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import type { ToastTitleProps } from './types'
import s from './toast.module.css'

const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={classnames(s['toast--title'], className)}
			{...props}
		/>
	)
)

ToastTitle.displayName = 'ToastTitle'

export { ToastTitle }
