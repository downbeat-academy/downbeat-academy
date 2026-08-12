'use client'

import React, { forwardRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import classnames from 'classnames'
import type { ToastDescriptionProps } from './types'
import s from './toast.module.css'

const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={classnames(s['toast--description'], className)}
    {...props}
  />
))

ToastDescription.displayName = 'ToastDescription'

export { ToastDescription }
