'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { DrawerCloseProps } from './types'

const DrawerClose = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  DrawerCloseProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    className={className}
    ref={ref}
    {...props}
  />
))

DrawerClose.displayName = 'DrawerClose'

export { DrawerClose }
