'use client'

import React, { forwardRef, isValidElement } from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import classnames from 'classnames'
import s from './sidebar.module.css'
import { Tooltip } from '../tooltip/tooltip'
import { TooltipTrigger } from '../tooltip/tooltip-trigger'
import { TooltipContent } from '../tooltip/tooltip-content'
import { useSidebar, useSidebarList } from './sidebar-context'
import type { SidebarLinkProps } from './types'

/**
 * Best-effort plain text for the collapsed tooltip and accessible name. Handles the
 * two common shapes — `<SidebarLink>Label</SidebarLink>` and
 * `<SidebarLink asChild><Link href="…">Label</Link></SidebarLink>` — and falls back to
 * the explicit `label` prop for anything richer.
 */
function resolveLabel(
	label: string | undefined,
	children: React.ReactNode
): string | undefined {
	if (label) return label
	if (typeof children === 'string') return children
	if (isValidElement(children)) {
		const inner = (children.props as { children?: React.ReactNode }).children
		if (typeof inner === 'string') return inner
	}
	return undefined
}

/**
 * With `asChild`, Radix promotes the consumer's element to be the DOM root and injects
 * its original children as bare text — leaving nothing for the collapsed-state hide rule
 * to target. Re-wrap those children in the label span before promotion.
 */
function wrapAsChildLabel(children: React.ReactNode): React.ReactNode {
	if (!isValidElement(children)) return children
	const child = children as React.ReactElement<{ children?: React.ReactNode }>
	return React.cloneElement(
		child,
		undefined,
		<span className={s.linkLabel}>{child.props.children}</span>
	)
}

const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(
	(
		{
			isActive = false,
			leadingIcon,
			trailingIcon,
			badge,
			asChild = false,
			label,
			className,
			children,
			...rest
		},
		ref
	) => {
		const { collapsed } = useSidebar()
		const inList = useSidebarList()
		const Comp: any = asChild ? Slot : 'a'
		const labelText = resolveLabel(label, children)

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
		const labelNode = asChild ? (
			<Slottable>{wrapAsChildLabel(children)}</Slottable>
		) : (
			<span className={s.linkLabel}>{children}</span>
		)

		const linkElement = (
			<Comp
				ref={ref}
				className={linkClasses}
				aria-current={isActive ? 'page' : undefined}
				// The visible label is hidden in the collapsed rail and the leading icon is
				// aria-hidden, so the link would otherwise have no accessible name.
				aria-label={collapsed ? labelText : undefined}
				{...rest}
			>
				{leadingIcon && (
					<span className={s.linkLeading} aria-hidden="true">
						{leadingIcon}
					</span>
				)}
				{labelNode}
				{badge && <span className={s.linkBadge}>{badge}</span>}
				{trailingIcon && (
					<span className={s.linkTrailing} aria-hidden="true">
						{trailingIcon}
					</span>
				)}
			</Comp>
		)

		const content =
			collapsed && labelText ? (
				<Tooltip>
					<TooltipTrigger asChild>{linkElement}</TooltipTrigger>
					<TooltipContent side="right" sideOffset={8}>
						{labelText}
					</TooltipContent>
				</Tooltip>
			) : (
				linkElement
			)

		// Only `<SidebarSection>` renders the `<ul>`. Used standalone (directly under
		// `<Sidebar>`), an `<li>` wrapper would be invalid HTML and strip list semantics.
		return inList ? <li className={s.linkItem}>{content}</li> : content
	}
)

SidebarLink.displayName = 'SidebarLink'

export { SidebarLink }
