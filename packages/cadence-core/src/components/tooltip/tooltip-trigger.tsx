'use client'

import React, { forwardRef } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export interface TooltipTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {}

const TooltipTrigger = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    className={className}
    ref={ref}
    {...props}
  />
))

TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

export { TooltipTrigger }