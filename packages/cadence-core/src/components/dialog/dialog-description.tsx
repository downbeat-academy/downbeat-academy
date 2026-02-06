'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classnames from 'classnames'
import s from './dialog.module.css'
import type { DialogDescriptionProps } from './types'

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={classnames(s.description, className)}
    ref={ref}
    {...props}
  />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export { DialogDescription }
