'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import classnames from 'classnames'
import s from './tooltip.module.css'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipArrow = TooltipPrimitive.Arrow

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
	const classes = classnames([s.content])

	return (
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={classes}
			{...props}
		/>
	)
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
	TooltipArrow,
}
