import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    {...props}
  />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export { DialogDescription }