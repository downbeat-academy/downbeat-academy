'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { DialogTriggerProps } from './types'

const DialogTrigger = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Trigger
    className={className}
    ref={ref}
    {...props}
  />
))

DialogTrigger.displayName = DialogPrimitive.Trigger.displayName

export { DialogTrigger }
