import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import s from '../dialog.module.scss'

const DialogOverlay = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay className={s.overlay} ref={ref} {...props} />
))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export { DialogOverlay }
