'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import type { ToastDescriptionProps } from './types'
import s from './toast.module.css'

const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={classnames(s['toast--description'], className)}
			{...props}
		/>
	)
)

ToastDescription.displayName = 'ToastDescription'

export { ToastDescription }
