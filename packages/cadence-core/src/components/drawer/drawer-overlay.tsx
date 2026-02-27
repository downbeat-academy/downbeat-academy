'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import s from './drawer.module.css'
import type { DrawerOverlayProps } from './types'

const DrawerOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={classnames(s.overlay, className)}
    ref={ref}
    {...props}
  />
))

DrawerOverlay.displayName = 'DrawerOverlay'

export { DrawerOverlay }
