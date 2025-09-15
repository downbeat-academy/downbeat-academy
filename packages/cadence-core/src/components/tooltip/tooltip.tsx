'use client'

import React, { forwardRef } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>

const Tooltip = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  TooltipProps
>(({ delayDuration = 700, ...props }, ref) => (
  <TooltipPrimitive.Root
    delayDuration={delayDuration}
    {...props}
  />
))

Tooltip.displayName = 'Tooltip'

const TooltipProvider = TooltipPrimitive.Provider

const TooltipArrow = TooltipPrimitive.Arrow

export { Tooltip, TooltipProvider, TooltipArrow }