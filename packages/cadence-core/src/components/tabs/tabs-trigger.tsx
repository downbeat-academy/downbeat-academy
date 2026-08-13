'use client'

import React from 'react'
import classnames from 'classnames'
import s from './tabs.module.css'
import {
	contentId,
	triggerId,
	useTabsContext,
	useTabsListContext,
} from './tabs-context'

import type { TabsTriggerProps } from './types'

const TabsTrigger = ({
	children,
	value,
	disabled,
	icon,
	className,
	'data-testid': dataTestId,
}: TabsTriggerProps) => {
	const {
		value: selectedValue,
		selectValue,
		orientation,
		dir,
		activationMode,
		baseId,
	} = useTabsContext('TabsTrigger')
	const { loop } = useTabsListContext()

	const isSelected = selectedValue === value
	const classes = classnames([s[`tabs--trigger`], className])

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		// Siblings are read from the DOM rather than a registration list. The tabs are
		// whatever ended up inside this tablist, however the consumer composed them —
		// a registry would only agree with the DOM as long as nobody wrapped a trigger.
		const list = event.currentTarget.closest('[role="tablist"]')
		if (!list) return

		const tabs = Array.from(
			list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
		)
		const index = tabs.indexOf(event.currentTarget)
		if (index === -1) return

		// Which arrow means "forward" depends on both orientation and writing direction.
		const horizontal = orientation === 'horizontal'
		const forwardKey = horizontal
			? dir === 'rtl'
				? 'ArrowLeft'
				: 'ArrowRight'
			: 'ArrowDown'
		const backKey = horizontal
			? dir === 'rtl'
				? 'ArrowRight'
				: 'ArrowLeft'
			: 'ArrowUp'

		let next: HTMLButtonElement | undefined
		switch (event.key) {
			case forwardKey:
				next = tabs[index + 1] ?? (loop ? tabs[0] : undefined)
				break
			case backKey:
				next = tabs[index - 1] ?? (loop ? tabs[tabs.length - 1] : undefined)
				break
			case 'Home':
				next = tabs[0]
				break
			case 'End':
				next = tabs[tabs.length - 1]
				break
			default:
				return
		}

		// Claimed even when `next` is undefined (`loop={false}` at an end), so the arrow
		// never falls through to scrolling the page.
		event.preventDefault()
		if (!next) return

		next.focus()

		// Automatic activation selects as focus moves; manual waits for Enter or Space,
		// which the native button turns into a click for us.
		if (activationMode === 'automatic') {
			const nextValue = next.dataset.value
			if (nextValue !== undefined) selectValue(nextValue)
		}
	}

	return (
		<button
			type="button"
			role="tab"
			id={triggerId(baseId, value)}
			aria-selected={isSelected}
			aria-controls={contentId(baseId, value)}
			// Plain APG roving tabindex: the selected tab is the single tab stop, from
			// first render. Radix instead left every tab at -1 and put the stop on the
			// tablist, handing off on the first keypress — keyboard entry works either
			// way, but a focusable tablist is not the specified shape.
			tabIndex={isSelected ? 0 : -1}
			// `data-state` is now this component's own attribute rather than Radix's.
			// It is kept because `tabs.module.css` styles the active trigger through it,
			// and because consumers may have done the same.
			data-state={isSelected ? 'active' : 'inactive'}
			// Read back by the keyboard handler above to select the tab it moved to.
			data-value={value}
			disabled={disabled}
			className={classes}
			data-testid={dataTestId}
			onClick={() => selectValue(value)}
			onKeyDown={handleKeyDown}
		>
			{icon}
			{children}
		</button>
	)
}

TabsTrigger.displayName = 'TabsTrigger'

export { TabsTrigger }
