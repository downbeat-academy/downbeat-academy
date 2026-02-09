'use client'

import React, { forwardRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import type { ToastActionProps } from './types'

const ToastAction = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action ref={ref} {...props} />
))

ToastAction.displayName = 'ToastAction'

export { ToastAction }
