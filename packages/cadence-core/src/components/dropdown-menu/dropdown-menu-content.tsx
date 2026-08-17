'use client'

import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import s from './dropdown-menu.module.css'
import { useDropdownMenuContext } from './dropdown-menu-context'
import { useAnchoredOverlay } from '../overlay'

import type { DropdownMenuContentProps } from './types'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

/** Enabled items, read from the DOM rather than a registry. */
const itemsOf = (menu: HTMLElement) =>
	Array.from(
		menu.querySelectorAll<HTMLElement>(
			'[role="menuitem"]:not([aria-disabled="true"])'
		)
	)

const DropdownMenuContent = forwardRef<
	HTMLDivElement,
	DropdownMenuContentProps
>(
	(
		{
			className,
			sideOffset = 4,
			side: sideProp,
			align: alignProp,
			children,
			style,
			onKeyDown,
			...rest
		},
		ref
	) => {
		const {
			open,
			contentId,
			triggerId,
			anchorName,
			side: contextSide,
			align: contextAlign,
			getTriggerElement,
			openedByKeyboard,
			closeAndRefocus,
			setOpen,
		} = useDropdownMenuContext('DropdownMenuContent')

		const contentRef = useRef<HTMLDivElement | null>(null)
		const side = sideProp ?? contextSide
		const align = alignProp ?? contextAlign

		// Placement and top-layer promotion, shared with Tooltip and HoverCard.
		useAnchoredOverlay({
			ref: contentRef,
			open,
			getAnchorElement: getTriggerElement,
			side,
			align,
			sideOffset,
		})

		/**
		 * Roving tabindex, seeded on open.
		 *
		 * Only a keyboard-opened menu takes focus. Focusing the first item when a mouse
		 * user clicks the trigger puts a focus ring on something they did not ask for, and
		 * APG distinguishes the two.
		 */
		useEffect(() => {
			if (!open) return
			const menu = contentRef.current
			if (!menu) return
			const items = itemsOf(menu)
			if (!items.length) return

			items.forEach((item, i) => {
				item.tabIndex = i === 0 ? 0 : -1
			})
			if (openedByKeyboard) items[0].focus()
		}, [open, openedByKeyboard])

		/**
		 * Dismiss on an outside press.
		 *
		 * `pointerdown`, not `click`: a click fires after the press has already moved focus
		 * or scrolled, and a menu that survives until mouseup feels stuck. The trigger is
		 * excluded because it toggles — letting this handler close it first would make a
		 * click on the trigger close and immediately reopen.
		 */
		useEffect(() => {
			if (!open) return
			const onPointerDown = (event: PointerEvent) => {
				const menu = contentRef.current
				const trigger = getTriggerElement()
				const target = event.target as Node | null
				if (!menu || !target) return
				if (menu.contains(target)) return
				if (trigger?.contains(target)) return
				setOpen(false)
			}
			document.addEventListener('pointerdown', onPointerDown)
			return () => document.removeEventListener('pointerdown', onPointerDown)
		}, [open, getTriggerElement, setOpen])

		/** Typeahead: jump to the next item whose label starts with what was typed. */
		const search = useRef('')
		const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

		useEffect(
			() => () => {
				if (searchTimer.current) clearTimeout(searchTimer.current)
			},
			[]
		)

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				onKeyDown?.(event)
				if (event.defaultPrevented) return

				const menu = contentRef.current
				if (!menu) return
				const items = itemsOf(menu)
				if (!items.length) return

				const active = document.activeElement as HTMLElement | null
				const index = active ? items.indexOf(active) : -1

				const move = (next: HTMLElement) => {
					items.forEach((item) => {
						item.tabIndex = -1
					})
					next.tabIndex = 0
					next.focus()
				}

				switch (event.key) {
					case 'ArrowDown':
						event.preventDefault()
						// Wraps, per APG for menus.
						move(items[(index + 1) % items.length] ?? items[0])
						return
					case 'ArrowUp':
						event.preventDefault()
						move(items[(index - 1 + items.length) % items.length] ?? items[0])
						return
					case 'Home':
						event.preventDefault()
						move(items[0])
						return
					case 'End':
						event.preventDefault()
						move(items[items.length - 1])
						return
					case 'Escape':
						event.preventDefault()
						closeAndRefocus()
						return
					case 'Tab':
						// Tab dismisses rather than moving through the menu, and lets focus
						// continue past the trigger. Not prevented, so the browser performs
						// the move itself.
						setOpen(false)
						return
					default:
						break
				}

				// Printable single characters only — modifiers mean a shortcut, not a search.
				if (
					event.key.length !== 1 ||
					event.ctrlKey ||
					event.metaKey ||
					event.altKey
				) {
					return
				}

				event.preventDefault()
				search.current += event.key.toLowerCase()
				if (searchTimer.current) clearTimeout(searchTimer.current)
				searchTimer.current = setTimeout(() => {
					search.current = ''
				}, 500)

				// Repeating one character cycles through the items beginning with it, rather
				// than searching for "dd" and matching nothing. Standard typeahead, and the
				// behaviour anyone who has used a native menu expects.
				const buffer = search.current
				const repeated =
					buffer.length > 1 && buffer.split('').every((c) => c === buffer[0])
				const needle = repeated ? buffer[0] : buffer

				// Searching from the item *after* the current one is what makes the cycle
				// advance instead of re-matching where it already is.
				const ordered = [
					...items.slice(index + 1),
					...items.slice(0, Math.max(0, index + 1)),
				]
				const match = ordered.find((item) =>
					(item.textContent ?? '').trim().toLowerCase().startsWith(needle)
				)
				if (match) move(match)
			},
			[onKeyDown, closeAndRefocus, setOpen]
		)

		if (!open) return null

		return (
			<div
				ref={composeRefs(ref, contentRef)}
				id={contentId}
				role="menu"
				aria-labelledby={triggerId}
				aria-orientation="vertical"
				data-state="open"
				data-side={side}
				data-align={align}
				style={
					{
						...style,
						'--cds-dropdown-menu-anchor': anchorName,
						'--cds-dropdown-menu-offset': `${sideOffset}px`,
					} as React.CSSProperties
				}
				className={classnames(s.content, className)}
				onKeyDown={handleKeyDown}
				{...rest}
			>
				{children}
			</div>
		)
	}
)

DropdownMenuContent.displayName = 'DropdownMenuContent'

export { DropdownMenuContent }
