'use client'

import React, { forwardRef } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import classnames from 'classnames'
import { QuestionCircleOutline } from 'cadence-icons'
import s from './hover-card.module.css'

export interface HoverCardTriggerProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger> {
  hasIcon?: boolean
  iconAriaLabel?: string
}

const HoverCardTrigger = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  HoverCardTriggerProps
>(({ className, hasIcon = false, asChild = false, iconAriaLabel = 'More information available', children, ...props }, ref) => {
  return (
    <HoverCardPrimitive.Trigger
      ref={ref}
      className={classnames(s.trigger, className)}
      asChild={asChild}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          {hasIcon && <QuestionCircleOutline width={16} aria-label={iconAriaLabel} />}
        </>
      )}
    </HoverCardPrimitive.Trigger>
  )
})

HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName

export { HoverCardTrigger }