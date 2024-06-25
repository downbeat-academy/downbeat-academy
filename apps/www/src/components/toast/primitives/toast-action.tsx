import { forwardRef } from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'

const ToastAction = forwardRef<
	React.ElementRef<typeof ToastPrimitives.Action>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Action ref={ref} {...props} />
))

ToastAction.displayName = ToastPrimitives.Action.displayName

type ToastActionElement = React.ReactElement<typeof ToastAction>

export { ToastAction, type ToastActionElement }
