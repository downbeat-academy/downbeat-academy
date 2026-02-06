'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { DialogCloseProps } from './types'

const DialogClose = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  DialogCloseProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    className={className}
    ref={ref}
    {...props}
  />
))

DialogClose.displayName = DialogPrimitive.Close.displayName

export { DialogClose }
