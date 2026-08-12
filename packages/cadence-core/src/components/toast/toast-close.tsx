'use client'

import React, { forwardRef } from 'react'
import { X } from 'cadence-icons'
import * as ToastPrimitive from '@radix-ui/react-toast'
import classnames from 'classnames'
import type { ToastCloseProps } from './types'
import s from './toast.module.css'

const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    toast-close=""
    aria-label="Close"
    className={classnames(s['toast--close'], className)}
    {...props}
  >
    <X width={16} aria-hidden="true" />
  </ToastPrimitive.Close>
))

ToastClose.displayName = 'ToastClose'

export { ToastClose }
