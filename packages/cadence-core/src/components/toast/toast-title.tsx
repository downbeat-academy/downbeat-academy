'use client'

import React, { forwardRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import classnames from 'classnames'
import type { ToastTitleProps } from './types'
import s from './toast.module.css'

const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={classnames(s['toast--title'], className)}
    {...props}
  />
))

ToastTitle.displayName = 'ToastTitle'

export { ToastTitle }
