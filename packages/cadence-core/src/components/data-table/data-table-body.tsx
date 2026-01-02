'use client'

import React from 'react'
import { flexRender, type Table } from '@tanstack/react-table'
import { DataTableRow } from './data-table-row'
import { DataTableCell } from './data-table-cell'
import s from './data-table.module.css'
import type { DataTableAlignment } from './types'

interface DataTableBodyProps<TData> {
	table: Table<TData>
	onRowClick?: (row: TData) => void
	loading?: boolean
	loadingRowCount?: number
	className?: string
}

function DataTableBody<TData>({
	table,
	onRowClick,
	loading = false,
	loadingRowCount = 5,
	className,
}: DataTableBodyProps<TData>) {
	const columns = table.getAllColumns()

	if (loading) {
		return (
			<tbody className={className}>
				{Array.from({ length: loadingRowCount }).map((_, rowIndex) => (
					<DataTableRow key={`loading-${rowIndex}`} isLoading>
						{columns.map((column, colIndex) => {
							const alignment = (column.columnDef.meta?.alignment ?? 'start') as DataTableAlignment
							return (
								<DataTableCell key={`loading-${rowIndex}-${colIndex}`} alignment={alignment}>
									<div className={s['data-table-skeleton-cell']} style={{ width: `${60 + Math.random() * 40}%` }} />
								</DataTableCell>
							)
						})}
					</DataTableRow>
				))}
			</tbody>
		)
	}

	return (
		<tbody className={className}>
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
