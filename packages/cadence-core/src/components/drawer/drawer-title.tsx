'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import s from './drawer.module.css'
import type { DrawerTitleProps } from './types'

const DrawerTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={classnames(s.title, className)}
    ref={ref}
    {...props}
  />
))

DrawerTitle.displayName = 'DrawerTitle'

export { DrawerTitle }
