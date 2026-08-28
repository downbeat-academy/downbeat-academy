'use client'

import React, { forwardRef, useCallback } from 'react'
import { X } from 'cadence-icons'
import classnames from 'classnames'
import { useToastItem } from './toast-context'
import type { ToastCloseProps } from './types'
import s from './toast.module.css'

const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(
	({ className, onClick, ...props }, ref) => {
		const { close } = useToastItem('ToastClose')

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event)
				if (!event.defaultPrevented) close()
			},
			[onClick, close]
		)

		return (
			<button
				ref={ref}
				type="button"
				// The stylesheet targets this attribute rather than the hashed class, and
				// the 0.3 backfill pinned it. Kept as a bare attribute, not the
				// `data-radix-*` one it sat beside.
				toast-close=""
				// Regression guard: this button once contained only `<X />`, which then
				// rendered `role="img"` with an undefined `aria-labelledby` and left both the
				// svg and the button nameless. Third instance of the defect after `dialog`
				// and `drawer`. `cadence-icons` is now `aria-hidden` unless named, so the
				// icon can no longer supply a name at all — this attribute is the only thing
				// naming the button.
				aria-label="Close"
				className={classnames(s['toast--close'], className)}
				onClick={handleClick}
				{...props}
			>
				<X width={16} aria-hidden="true" />
			</button>
		)
	}
)

ToastClose.displayName = 'ToastClose'

export { ToastClose }
