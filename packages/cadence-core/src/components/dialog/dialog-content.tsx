'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import { X } from 'cadence-icons'
import s from './dialog.module.css'
import { DialogPortal } from './dialog'
import { DialogOverlay } from './dialog-overlay'
import type { DialogContentProps } from './types'

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={classnames(s.content, className)}
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
