'use client'

import { forwardRef } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { QuestionCircleOutline } from 'cadence-icons'
import s from '../hover-card.module.scss'

type HoverCardTriggerProps = {
	hasIcon?: boolean
}

const HoverCardTrigger = forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger> &
		HoverCardTriggerProps // Add 'HoverCardTriggerProps' to the type definition
>(({ className, hasIcon = false, ...props }, ref) => {
	return (
		<HoverCardPrimitive.Trigger ref={ref} className={s.trigger} {...props}>
			{props.children}
			{hasIcon && <QuestionCircleOutline width={16} />}
		</HoverCardPrimitive.Trigger>
	)
})

HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName

export { HoverCardTrigger }
