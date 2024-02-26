import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'cadence-icons'
import s from '../dialog.module.scss'

import { DialogPortal } from '../dialog'
import { DialogOverlay } from './overlay'

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={s.content}
      ref={ref}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className={s.close}>
        <X width={24} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))

DialogContent.displayName = DialogPrimitive.Content.displayName

export { DialogContent }