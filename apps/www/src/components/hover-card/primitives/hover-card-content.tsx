'use client'

import { forwardRef } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import s from '../hover-card.module.scss'

const HoverCardContent = forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
	<HoverCardPrimitive.Content
		className={s.content}
		ref={ref}
		align={align}
		sideOffset={sideOffset}
		{...props}
	/>
))

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCardContent }
