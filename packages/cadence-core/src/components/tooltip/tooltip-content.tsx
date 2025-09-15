'use client'

import React, { forwardRef } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import classnames from 'classnames'
import s from './tooltip.module.css'

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={classnames(s.content, className)}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </TooltipPrimitive.Portal>
))

TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { TooltipContent }