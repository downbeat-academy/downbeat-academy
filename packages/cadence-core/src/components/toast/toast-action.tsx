'use client'

import React, { forwardRef, useCallback } from 'react'
import { useToastItem } from './toast-context'
import type { ToastActionProps } from './types'

const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(
	({ className, onClick, altText, ...props }, ref) => {
		const { close } = useToastItem('ToastAction')

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event)
				// The action dismisses the toast it belongs to, unless the consumer
				// explicitly prevents it — a toast that survives its own action is a toast
				// the user has to dismiss twice.
				if (!event.defaultPrevented) close()
			},
			[onClick, close]
		)

		return (
			<button
				ref={ref}
				type="button"
				// Radix took `altText` to describe an alternative way to perform this action
				// for screen-reader users, and folded it into the announcement. It is
				// published here as a data attribute and collected by `Toast`'s announcement
				// pass, so the prop keeps the meaning consumers already give it rather than
				// becoming decorative.
				data-toast-alt-text={altText || undefined}
				className={className}
				onClick={handleClick}
				{...props}
			/>
		)
	}
)

ToastAction.displayName = 'ToastAction'

export { ToastAction }
