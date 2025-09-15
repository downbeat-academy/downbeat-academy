'use client'

import React, { forwardRef } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>

const HoverCard = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Root>,
  HoverCardProps
>(({ openDelay = 300, closeDelay = 150, ...props }, ref) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    {...props}
  />
))

HoverCard.displayName = 'HoverCard'

const HoverCardArrow = HoverCardPrimitive.Arrow

export { HoverCard, HoverCardArrow }