import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import s from '../dialog.module.scss'

const DialogClose = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Close>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Close ref={ref} {...props} />
))

DialogClose.displayName = DialogPrimitive.Overlay.displayName

export { DialogClose }
