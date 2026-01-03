'use client'

import React from 'react'
import { flexRender, type Table } from '@tanstack/react-table'
import classnames from 'classnames'
import { DataTableRow } from './data-table-row'
import { DataTableCell } from './data-table-cell'
import s from './data-table.module.css'
import type { DataTableAlignment } from './types'

interface DataTableBodyProps<TData> {
	table: Table<TData>
	onRowClick?: (row: TData) => void
	loading?: boolean
	loadingRowCount?: number
	isStriped?: boolean
	className?: string
}

function DataTableBody<TData>({
	table,
	onRowClick,
	loading = false,
	loadingRowCount = 5,
	isStriped = false,
	className,
}: DataTableBodyProps<TData>) {
	const columns = table.getAllColumns()
	const bodyClasses = classnames(
		isStriped && s.bodyStriped,
		className
	)

	if (loading) {
		return (
			<tbody className={bodyClasses}>
				{Array.from({ length: loadingRowCount }).map((_, rowIndex) => (
					<DataTableRow key={`loading-${rowIndex}`} isLoading>
						{columns.map((column, colIndex) => {
							const alignment = (column.columnDef.meta?.alignment ?? 'start') as DataTableAlignment
							return (
								<DataTableCell key={`loading-${rowIndex}-${colIndex}`} alignment={alignment}>
									<div className={s.skeletonCell} style={{ width: `${60 + Math.random() * 40}%` }} />
								</DataTableCell>
							)
						})}
					</DataTableRow>
				))}
			</tbody>
		)
	}

	return (
		<tbody className={bodyClasses}>
			{table.getRowModel().rows.map((row) => (
				<DataTableRow
					key={row.id}
					isClickable={!!onRowClick}
					onClick={onRowClick ? () => onRowClick(row.original) : undefined}
				>
					{row.getVisibleCells().map((cell) => {
						const alignment = (cell.column.columnDef.meta?.alignment ?? 'start') as DataTableAlignment
						return (
							<DataTableCell key={cell.id} alignment={alignment}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</DataTableCell>
						)
					})}
				</DataTableRow>
			))}
		</tbody>
	)
}

DataTableBody.displayName = 'DataTableBody'

export { DataTableBody }
