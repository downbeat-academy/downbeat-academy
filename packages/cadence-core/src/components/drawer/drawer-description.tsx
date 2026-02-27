'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import s from './drawer.module.css'
import type { DrawerDescriptionProps } from './types'

const DrawerDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={classnames(s.description, className)}
    ref={ref}
    {...props}
  />
))

DrawerDescription.displayName = 'DrawerDescription'

export { DrawerDescription }
