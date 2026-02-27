'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { DrawerTriggerProps } from './types'

const DrawerTrigger = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DrawerTriggerProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Trigger
    className={className}
    ref={ref}
    {...props}
  />
))

DrawerTrigger.displayName = 'DrawerTrigger'

export { DrawerTrigger }
