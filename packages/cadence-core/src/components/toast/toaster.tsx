'use client'

import React from 'react'
import { Toast } from './toast'
import { ToastProvider } from './toast-provider'
import { ToastViewport } from './toast-viewport'
import { ToastClose } from './toast-close'
import { ToastTitle } from './toast-title'
import { ToastDescription } from './toast-description'
import { useToast } from './use-toast'

export function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{/*
			 * Reversed, and that is load-bearing rather than cosmetic.
			 *
			 * `use-toast.ts` *prepends*, so `toasts[0]` is the newest. Radix's Viewport
			 * reversed on render, which made DOM order oldest-first — so a screen reader and
			 * sequential keyboard navigation reach the oldest toast first while CSS positions
			 * the stack visually. Mapping the array straight through would silently flip that,
			 * which is exactly what the 0.3 backfill predicted a rewrite would get wrong.
			 *
			 * `toReversed()` is Baseline Newly Available and does not mutate the store's array.
			 */}
			{toasts.toReversed().map(function ({
				id,
				title,
				description,
				action,
				...props
			}) {
				return (
					<Toast key={id} {...props}>
						<div>
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				)
			})}
			<ToastViewport />
		</ToastProvider>
	)
}
