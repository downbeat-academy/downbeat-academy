'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import s from './dialog.module.css'
import type { DialogOverlayProps } from './types'

const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={classnames(s.overlay, className)}
    ref={ref}
    {...props}
  />
))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export { DialogOverlay }
