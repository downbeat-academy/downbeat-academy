'use client'

import React, { forwardRef, useEffect, useId, useRef, useState } from 'react'
import classnames from 'classnames'
import { ChevronDown } from 'cadence-icons'
import s from './sidebar.module.css'
import { useSidebar, SidebarListContext } from './sidebar-context'
import type { SidebarSectionProps } from './types'

/**
 * Replaces `@radix-ui/react-collapsible` with the WAI-ARIA disclosure pattern: a button
 * carrying `aria-expanded` and `aria-controls`, and a region it owns.
 *
 * `<details>`/`<summary>` was the first choice — it is what `summary/` uses in this
 * package — but two things rule it out here. Controlled mode (`open` + `onOpenChange`)
 * requires fighting the element's own toggling, and the exit animation would need
 * `::details-content` with `transition-behavior: allow-discrete`, which is not Baseline
 * and so sits below the floor in `docs/adr/0003-browser-support-floor.md`. Note `summary/`
 * animates only its chevron, never its content, so it is not a precedent for this.
 */
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
		const contentId = useId()
		const contentRef = useRef<HTMLDivElement>(null)

		const isControlled = open !== undefined
		const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
		const isOpen = isControlled ? open : uncontrolledOpen

		// Presence: the content stays in the DOM through its exit animation, then hides.
		const [isRendered, setIsRendered] = useState(isOpen)

		useEffect(() => {
			if (isOpen) {
				setIsRendered(true)
				return
			}

			const node = contentRef.current
			if (!node) {
				setIsRendered(false)
				return
			}

			// Only wait for an animation that will actually run. Under
			// `prefers-reduced-motion` the stylesheet sets `animation: none`, and
			// `animationend` would never fire — which would strand the content visible.
			const { animationName } = getComputedStyle(node)
			if (!animationName || animationName === 'none') {
				setIsRendered(false)
				return
			}

			const handleAnimationEnd = (event: AnimationEvent) => {
				if (event.target === node) setIsRendered(false)
			}
			node.addEventListener('animationend', handleAnimationEnd)
			return () => node.removeEventListener('animationend', handleAnimationEnd)
		}, [isOpen])

		const toggle = () => {
			const next = !isOpen
			if (!isControlled) setUncontrolledOpen(next)
			onOpenChange?.(next)
		}

		const list = (
			<ul className={s.linkList}>
				<SidebarListContext.Provider value={true}>
					{children}
				</SidebarListContext.Provider>
			</ul>
		)

		// When the whole sidebar is collapsed, force sections open (title is hidden;
		// links render as icons only, so there's nothing meaningful to toggle).
		if (collapsible && !sidebarCollapsed) {
			return (
				<div
					ref={ref}
					className={classnames(s.section, s.sectionCollapsible, className)}
					{...rest}
				>
					{title !== undefined && (
						<button
							type="button"
							className={s.sectionTrigger}
							aria-expanded={isOpen}
							aria-controls={contentId}
							// Retained as the styling hook the chevron rotation already keys off.
							data-state={isOpen ? 'open' : 'closed'}
							onClick={toggle}
						>
							<span className={s.sectionTitle}>{title}</span>
							<ChevronDown
								width={14}
								height={14}
								className={s.sectionChevron}
								aria-hidden="true"
							/>
						</button>
					)}
					{/* Kept mounted so `aria-controls` always resolves to a real element. */}
					<div
						ref={contentRef}
						id={contentId}
						className={s.sectionContent}
						data-state={isOpen ? 'open' : 'closed'}
						hidden={!isRendered}
					>
						{list}
					</div>
				</div>
			)
		}

		return (
			<div ref={ref} className={classnames(s.section, className)} {...rest}>
				{title !== undefined && !sidebarCollapsed && (
					<div className={s.sectionTitle}>{title}</div>
				)}
				{list}
			</div>
		)
	}
)

SidebarSection.displayName = 'SidebarSection'

export { SidebarSection }
