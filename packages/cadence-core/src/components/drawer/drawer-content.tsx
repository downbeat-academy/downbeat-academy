'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import { X } from 'cadence-icons'
import s from './drawer.module.css'
import { DrawerPortal } from './drawer'
import { DrawerOverlay } from './drawer-overlay'
import type { DrawerContentProps } from './types'

const DrawerContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, side = 'right', ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      className={classnames(
        s.content,
        side === 'right' ? s.contentRight : s.contentLeft,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className={s.close} aria-label="Close">
        <X width={24} aria-hidden="true" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DrawerPortal>
))

DrawerContent.displayName = 'DrawerContent'

export { DrawerContent }
