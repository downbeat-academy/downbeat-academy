'use client'

import React from 'react'
import classnames from 'classnames'
import { flexRender, type Header } from '@tanstack/react-table'
import { ChevronUp, ChevronDown, ArrowsSort } from 'cadence-icons'
import s from './data-table.module.css'
import type { DataTableAlignment } from './types'

interface DataTableColumnHeaderProps<TData, TValue> {
	header: Header<TData, TValue>
	sortingEnabled?: boolean
	className?: string
}

function DataTableColumnHeader<TData, TValue>({
	header,
	sortingEnabled = false,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	const canSort = sortingEnabled && header.column.getCanSort()
	const isSorted = header.column.getIsSorted()
	const alignment = (header.column.columnDef.meta?.alignment ?? 'start') as DataTableAlignment

	const classes = classnames(
		s['data-table-head'],
		s[`data-table-head--alignment-${alignment}`],
		canSort && s['data-table-head--sortable'],
		className
	)

	const getSortIcon = () => {
		if (!canSort) return null

		if (isSorted === 'asc') {
			return (
				<span className={classnames(s['data-table-sort-indicator'], s['data-table-sort-indicator--active'])}>
					<ChevronUp width={14} height={14} aria-hidden="true" />
				</span>
			)
		}

		if (isSorted === 'desc') {
			return (
				<span className={classnames(s['data-table-sort-indicator'], s['data-table-sort-indicator--active'])}>
					<ChevronDown width={14} height={14} aria-hidden="true" />
				</span>
			)
		}

		return (
			<span className={s['data-table-sort-indicator']}>
				<ArrowsSort width={14} height={14} aria-hidden="true" />
			</span>
		)
	}

	const getAriaSort = (): 'ascending' | 'descending' | 'none' | undefined => {
		if (!canSort) return undefined
		if (isSorted === 'asc') return 'ascending'
		if (isSorted === 'desc') return 'descending'
		return 'none'
	}

	const headerContent = header.isPlaceholder
		? null
		: flexRender(header.column.columnDef.header, header.getContext())

	if (canSort) {
		return (
			<th
				className={classes}
				scope="col"
				aria-sort={getAriaSort()}
				style={{ cursor: 'pointer' }}
			>
				<button
					type="button"
					className={s['data-table-sort-button']}
					onClick={header.column.getToggleSortingHandler()}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault()
							header.column.getToggleSortingHandler()?.(e)
						}
					}}
				>
					{headerContent}
					{getSortIcon()}
				</button>
			</th>
		)
	}

	return (
		<th className={classes} scope="col">
			{headerContent}
		</th>
	)
}

DataTableColumnHeader.displayName = 'DataTableColumnHeader'

export { DataTableColumnHeader }
