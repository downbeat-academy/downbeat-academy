import { forwardRef } from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import s from '../toast.module.scss'

const ToastViewport = forwardRef<
	React.ElementRef<typeof ToastPrimitives.Viewport>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Viewport
		ref={ref}
		className={s['toast--viewport']}
		{...props}
	/>
))

ToastViewport.displayName = ToastPrimitives.Viewport.displayName

export { ToastViewport }
