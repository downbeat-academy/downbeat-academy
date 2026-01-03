'use client'

import React from 'react'
import type { Table } from '@tanstack/react-table'
import { DataTableRow } from './data-table-row'
import { DataTableColumnHeader } from './data-table-column-header'

interface DataTableHeaderProps<TData> {
	table: Table<TData>
	sortingEnabled?: boolean
	className?: string
}

function DataTableHeader<TData>({
	table,
	sortingEnabled = false,
	className,
}: DataTableHeaderProps<TData>) {
	return (
		<thead className={className}>
			{table.getHeaderGroups().map((headerGroup) => (
				<DataTableRow key={headerGroup.id} isHeader>
					{headerGroup.headers.map((header) => (
						<DataTableColumnHeader
							key={header.id}
							header={header}
							sortingEnabled={sortingEnabled}
						/>
					))}
				</DataTableRow>
			))}
		</thead>
	)
}

DataTableHeader.displayName = 'DataTableHeader'

export { DataTableHeader }
