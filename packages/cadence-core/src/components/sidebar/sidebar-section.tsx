'use client'

import React, { forwardRef } from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import classnames from 'classnames'
import { ChevronDown } from 'cadence-icons'
import s from './sidebar.module.css'
import { useSidebar, SidebarListContext } from './sidebar-context'
import type { SidebarSectionProps } from './types'

const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
	(
		{
			title,
			collapsible = false,
			defaultOpen = true,
			open,
			onOpenChange,
			className,
			children,
			...rest
		},
		ref
	) => {
		const { collapsed: sidebarCollapsed } = useSidebar()

		// When the whole sidebar is collapsed, force sections open (title is hidden;
		// links render as icons only, so there's nothing meaningful to toggle).
		if (collapsible && !sidebarCollapsed) {
			return (
				<CollapsiblePrimitive.Root
					defaultOpen={defaultOpen}
					open={open}
					onOpenChange={onOpenChange}
					className={classnames(s.section, s.sectionCollapsible, className)}
					ref={ref as React.Ref<HTMLDivElement>}
					{...rest}
				>
					{title !== undefined && (
						<CollapsiblePrimitive.Trigger className={s.sectionTrigger}>
							<span className={s.sectionTitle}>{title}</span>
							<ChevronDown
								width={14}
								height={14}
								className={s.sectionChevron}
								aria-hidden="true"
							/>
						</CollapsiblePrimitive.Trigger>
					)}
					<CollapsiblePrimitive.Content className={s.sectionContent}>
						<ul className={s.linkList}>
							<SidebarListContext.Provider value={true}>
								{children}
							</SidebarListContext.Provider>
						</ul>
					</CollapsiblePrimitive.Content>
				</CollapsiblePrimitive.Root>
			)
		}

		return (
			<div ref={ref} className={classnames(s.section, className)} {...rest}>
				{title !== undefined && !sidebarCollapsed && (
					<div className={s.sectionTitle}>{title}</div>
				)}
				<ul className={s.linkList}>
					<SidebarListContext.Provider value={true}>
						{children}
					</SidebarListContext.Provider>
				</ul>
			</div>
		)
	}
)

SidebarSection.displayName = 'SidebarSection'

export { SidebarSection }
