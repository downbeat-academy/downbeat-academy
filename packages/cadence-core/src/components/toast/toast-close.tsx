'use client'

import React, { forwardRef } from 'react'
import { X } from 'cadence-icons'
import * as ToastPrimitive from '@radix-ui/react-toast'
import type { ToastCloseProps } from './types'
import s from './toast.module.css'

const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    toast-close=""
    className={s['toast--close']}
    {...props}
  >
    <X width={16} />
  </ToastPrimitive.Close>
))

ToastClose.displayName = 'ToastClose'

export { ToastClose }
