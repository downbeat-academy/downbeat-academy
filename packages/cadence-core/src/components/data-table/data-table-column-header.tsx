'use client'

import React from 'react'
import classnames from 'classnames'
import { flexRender, type Header } from '@tanstack/react-table'
import { ChevronUp, ChevronDown, ArrowsSort } from 'cadence-icons'
import s from './data-table.module.css'
import type { DataTableAlignment } from './types'

const alignmentClassMap: Record<DataTableAlignment, string> = {
	start: s.headAlignmentStart,
	center: s.headAlignmentCenter,
	end: s.headAlignmentEnd,
}

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
		s.head,
		alignmentClassMap[alignment],
		canSort && s.headSortable,
		className
	)

	const getSortIcon = () => {
		if (!canSort) return null

		if (isSorted === 'asc') {
			return (
				<span className={classnames(s.sortIndicator, s.sortIndicatorActive)}>
					<ChevronUp width={14} height={14} aria-hidden="true" />
				</span>
			)
		}

		if (isSorted === 'desc') {
			return (
				<span className={classnames(s.sortIndicator, s.sortIndicatorActive)}>
					<ChevronDown width={14} height={14} aria-hidden="true" />
				</span>
			)
		}

		return (
			<span className={s.sortIndicator}>
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
					className={s.sortButton}
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
