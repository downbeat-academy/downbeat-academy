'use client'

import React, { useState, useEffect, useCallback } from 'react'
import classnames from 'classnames'
import { X } from 'cadence-icons'
import { Input } from '../form/input'
import s from './data-table-filter.module.css'
import type { DataTableFilterProps } from './types'

function DataTableFilter({
	value,
	onChange,
	placeholder = 'Search...',
	className,
}: DataTableFilterProps) {
	const [localValue, setLocalValue] = useState(value)

	// Debounce the onChange callback
	useEffect(() => {
		const timer = setTimeout(() => {
			if (localValue !== value) {
				onChange(localValue)
			}
		}, 300)

		return () => clearTimeout(timer)
	}, [localValue, onChange, value])

	// Sync with external value changes
	useEffect(() => {
		setLocalValue(value)
	}, [value])

	const handleClear = useCallback(() => {
		setLocalValue('')
		onChange('')
	}, [onChange])

	const classes = classnames(s.filter, className)

	return (
		<div className={classes}>
			<div className={s['filter-input-wrapper']}>
				<Input
					type="text"
					placeholder={placeholder}
					value={localValue}
					onChange={(e) => setLocalValue(e.target.value)}
					aria-label={placeholder}
				/>
				<button
					type="button"
					className={classnames(
						s['filter-clear-button'],
						!localValue && s['filter-clear-button--hidden']
					)}
					onClick={handleClear}
					aria-label="Clear filter"
					tabIndex={localValue ? 0 : -1}
				>
					<X width={14} height={14} aria-hidden="true" />
				</button>
			</div>
		</div>
	)
}

DataTableFilter.displayName = 'DataTableFilter'

export { DataTableFilter }
