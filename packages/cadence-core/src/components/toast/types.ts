import type React from 'react'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'
export type ToastDirection = 'from-right' | 'from-bottom'

/** How urgently a toast is announced. */
export type ToastType = 'foreground' | 'background'

export interface ToastProviderProps {
	children?: React.ReactNode
	/** Auto-dismiss duration in ms for every toast beneath this provider. @default 5000 */
	duration?: number
	/** Accessible name for the viewport region. @default 'Notifications (F8)' */
	label?: string
	/** Direction a swipe must travel to dismiss. @default 'right' */
	swipeDirection?: 'right' | 'left' | 'up' | 'down'
	/** Distance in px a swipe must travel to dismiss. @default 50 */
	swipeThreshold?: number
}

export interface ToastProps extends Omit<
	React.LiHTMLAttributes<HTMLLIElement>,
	'title'
> {
	variant?: ToastVariant
	direction?: ToastDirection
	/** Controlled visibility. @default true */
	open?: boolean
	onOpenChange?: (open: boolean) => void
	/**
	 * Milliseconds before this toast dismisses itself, overriding the provider.
	 * `Infinity` pins it open — for anything the user must acknowledge.
	 */
	duration?: number
	/**
	 * `foreground` interrupts a screen reader; `background` waits for a pause.
	 * @default 'background'
	 */
	type?: ToastType
}

export interface ToastViewportProps extends React.OlHTMLAttributes<HTMLOListElement> {}

export interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToastCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * How to achieve this action without the button, announced along with the toast.
	 * Radix required it; it is optional here, but omitting it leaves screen-reader users
	 * without the alternative.
	 */
	altText?: string
}

/**
 * An element usable as a toast's action.
 *
 * Was `React.ReactElement<typeof ToastPrimitive.Action>`, which was wrong on its own terms
 * — `typeof Component` is the component type, not its props — and was one of the Radix
 * types reaching the published `.d.ts`.
 */
export type ToastActionElement = React.ReactElement<ToastActionProps>
