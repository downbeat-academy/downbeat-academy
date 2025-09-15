'use client'

import React, { forwardRef } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import classnames from 'classnames'
import s from './hover-card.module.css'

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {}

const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      className={classnames(s.content, className)}
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  </HoverCardPrimitive.Portal>
))

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCardContent }