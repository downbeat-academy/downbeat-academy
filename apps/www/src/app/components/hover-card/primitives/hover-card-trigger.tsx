'use client'

import { forwardRef } from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import s from "../hover-card.module.scss"

const HoverCardTrigger = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <HoverCardPrimitive.Trigger
      ref={ref}
      className={s.trigger}
      {...props}
    />
  )
})

HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName

export { HoverCardTrigger }