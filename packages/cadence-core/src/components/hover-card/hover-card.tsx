'use client'

import React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>

const HoverCard = ({ openDelay = 300, closeDelay = 150, ...props }: HoverCardProps) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    {...props}
  />
)

HoverCard.displayName = 'HoverCard'

const HoverCardArrow = HoverCardPrimitive.Arrow

export { HoverCard, HoverCardArrow }