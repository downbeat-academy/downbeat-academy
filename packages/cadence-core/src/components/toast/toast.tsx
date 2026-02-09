'use client'

import React, { forwardRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import classnames from 'classnames'
import type { ToastProps } from './types'
import s from './toast.module.css'

const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ variant = 'default', direction = 'from-bottom', className, ...props }, ref) => {
  const classes = classnames([
    s['toast--base'],
    s['toast--variant-' + variant],
    s['toast--direction-' + direction],
    className,
  ])

  return <ToastPrimitive.Root ref={ref} className={classes} {...props} />
})

Toast.displayName = 'Toast'

export { Toast }
