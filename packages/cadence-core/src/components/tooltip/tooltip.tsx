'use client'

import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>

const Tooltip = ({ delayDuration = 700, ...props }: TooltipProps) => (
  <TooltipPrimitive.Root
    delayDuration={delayDuration}
    {...props}
  />
)

Tooltip.displayName = 'Tooltip'

const TooltipProvider = TooltipPrimitive.Provider

const TooltipArrow = TooltipPrimitive.Arrow

export { Tooltip, TooltipProvider, TooltipArrow }