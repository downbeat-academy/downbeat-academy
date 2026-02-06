'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import s from './dialog.module.css'
import type { DialogTitleProps } from './types'

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={classnames(s.title, className)}
    ref={ref}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

export { DialogTitle }
