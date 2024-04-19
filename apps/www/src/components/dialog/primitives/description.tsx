import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import s from '../dialog.module.scss'

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={s.description}
    ref={ref}
    {...props}
  />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export { DialogDescription }