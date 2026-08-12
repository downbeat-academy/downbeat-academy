'use client'

import React, { forwardRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import classnames from 'classnames'
import type { ToastViewportProps } from './types'
import s from './toast.module.css'

const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={classnames(s['toast--viewport'], className)}
    {...props}
  />
))

ToastViewport.displayName = 'ToastViewport'

export { ToastViewport }
