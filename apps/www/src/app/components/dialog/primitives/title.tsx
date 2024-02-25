import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

export { DialogTitle }