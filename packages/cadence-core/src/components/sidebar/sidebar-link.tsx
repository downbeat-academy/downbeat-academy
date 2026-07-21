'use client'

import React, { forwardRef } from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import classnames from 'classnames'
import s from './sidebar.module.css'
import { Tooltip } from '../tooltip/tooltip'
import { TooltipTrigger } from '../tooltip/tooltip-trigger'
import { TooltipContent } from '../tooltip/tooltip-content'
import { useSidebar } from './sidebar-context'
import type { SidebarLinkProps } from './types'

const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(
	(
		{
			isActive = false,
			leadingIcon,
			trailingIcon,
			badge,
			asChild = false,
			className,
			children,
			...rest
		},
		ref
	) => {
		const { collapsed } = useSidebar()
		const Comp: any = asChild ? Slot : 'a'

		const linkClasses = classnames(
			s.link,
			isActive && s.linkActive,
			className
		)

		// When `asChild` is set, the consumer's element (e.g. a Next.js <Link>) is the
		// real DOM root. Slottable tells Radix Slot to promote it, then inject our
		// icon/badge spans around the consumer's original label text.
		//
		// IMPORTANT: children must be spread as siblings (not wrapped in a Fragment) —
		// Slot's SlotClone uses React.cloneElement on the children prop, and a Fragment
		// would swallow className/aria-* etc. because Fragments only accept key/children.
		const label = asChild ? (
			<Slottable>{children}</Slottable>
		) : (
			<span className={s.linkLabel}>{children}</span>
		)

		const linkElement = (
			<Comp
				ref={ref}
				className={linkClasses}
				aria-current={isActive ? 'page' : undefined}
				{...rest}
			>
				{leadingIcon && (
					<span className={s.linkLeading} aria-hidden="true">
						{leadingIcon}
					</span>
				)}
				{label}
				{badge && <span className={s.linkBadge}>{badge}</span>}
				{trailingIcon && (
					<span className={s.linkTrailing} aria-hidden="true">
						{trailingIcon}
					</span>
				)}
			</Comp>
		)

		return (
			<li className={s.linkItem}>
				{collapsed ? (
					<Tooltip>
						<TooltipTrigger asChild>{linkElement}</TooltipTrigger>
						<TooltipContent side="right" sideOffset={8}>
							{children}
						</TooltipContent>
					</Tooltip>
				) : (
					linkElement
				)}
			</li>
		)
	}
)

SidebarLink.displayName = 'SidebarLink'

export { SidebarLink }
