import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import s from '../dialog.module.scss'

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={s.title}
    ref={ref}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

export { DialogTitle }