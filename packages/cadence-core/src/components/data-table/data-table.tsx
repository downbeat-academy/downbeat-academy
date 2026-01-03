'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	type SortingState,
	type PaginationState,
} from '@tanstack/react-table'
import classnames from 'classnames'
import s from './data-table.module.css'
import { DataTableHeader } from './data-table-header'
import { DataTableBody } from './data-table-body'
import { DataTablePagination } from './data-table-pagination'
import { DataTableFilter } from './data-table-filter'
import { DataTableEmpty } from './data-table-empty'
import type { DataTableProps } from './types'

const backgroundClassMap = {
	primary: s.backgroundPrimary,
} as const

function DataTable<TData>({
	data,
	columns,
	isStriped = false,
	backgroundColor = 'none',
	sorting = false,
	pagination = false,
	filtering = false,
	emptyState,
	caption,
	onRowClick,
	loading = false,
	loadingRowCount = 5,
	contained = false,
	className,
	...props
}: DataTableProps<TData>) {
	// Sorting state
	const [sortingState, setSortingState] = useState<SortingState>(
		sorting && sorting.defaultSorting ? sorting.defaultSorting : []
	)

	// Pagination state
	const defaultPageSize = pagination ? (pagination.pageSize ?? 10) : data.length
	const [paginationState, setPaginationState] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: defaultPageSize,
	})

	// Filtering state
	const [globalFilter, setGlobalFilter] = useState('')

	// Handle sorting change (for manual mode)
	const handleSortingChange = useCallback(
		(updater: SortingState | ((old: SortingState) => SortingState)) => {
			const newSorting = typeof updater === 'function' ? updater(sortingState) : updater
			setSortingState(newSorting)
			if (sorting && sorting.manual && sorting.onSortingChange) {
				sorting.onSortingChange(newSorting)
			}
		},
		[sorting, sortingState]
	)

	// Handle pagination change (for manual mode)
	const handlePaginationChange = useCallback(
		(updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
			const newPagination = typeof updater === 'function' ? updater(paginationState) : updater
			setPaginationState(newPagination)
			if (pagination && pagination.manual && pagination.onPaginationChange) {
				pagination.onPaginationChange(newPagination)
			}
		},
		[pagination, paginationState]
	)

	// Handle filter change (for manual mode)
	const handleFilterChange = useCallback(
		(value: string) => {
			setGlobalFilter(value)
			if (filtering && filtering.manual && filtering.onFilterChange) {
				filtering.onFilterChange(value)
			}
		},
		[filtering]
	)

	// Table configuration
	const tableConfig = useMemo(
		() => ({
			data,
			columns,
			state: {
				sorting: sorting ? sortingState : undefined,
				pagination: pagination ? paginationState : undefined,
				globalFilter: filtering && !filtering.manual ? globalFilter : undefined,
			},
			onSortingChange: sorting ? handleSortingChange : undefined,
			onPaginationChange: pagination ? handlePaginationChange : undefined,
			onGlobalFilterChange: filtering && !filtering.manual ? setGlobalFilter : undefined,
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: sorting && !sorting.manual ? getSortedRowModel() : undefined,
			getPaginationRowModel: pagination && !pagination.manual ? getPaginationRowModel() : undefined,
			getFilteredRowModel: filtering && !filtering.manual ? getFilteredRowModel() : undefined,
			manualSorting: sorting ? sorting.manual : undefined,
			manualPagination: pagination ? pagination.manual : undefined,
			manualFiltering: filtering ? filtering.manual : undefined,
			pageCount: pagination && pagination.manual ? pagination.pageCount : undefined,
			enableMultiSort: sorting ? sorting.enableMultiSort : undefined,
		}),
		[
			data,
			columns,
			sorting,
			sortingState,
			pagination,
			paginationState,
			filtering,
			globalFilter,
			handleSortingChange,
			handlePaginationChange,
		]
	)

	const table = useReactTable(tableConfig)

	// Calculate pagination info
	const pageSizeOptions = pagination ? (pagination.pageSizeOptions ?? [10, 20, 30, 50]) : []
	const totalRows = pagination && pagination.manual
		? (pagination.pageCount ?? 1) * paginationState.pageSize
		: data.length

	const wrapperClasses = classnames(
		s.root,
		backgroundColor !== 'none' && backgroundClassMap[backgroundColor as keyof typeof backgroundClassMap],
		contained && s.isContained,
		className
	)

	// Empty state
	if (data.length === 0 && !loading) {
		return (
			<DataTableEmpty
				title={emptyState?.title}
				description={emptyState?.description}
				render={emptyState?.render}
			/>
		)
	}

	return (
		<div className={wrapperClasses} {...props}>
			{filtering && filtering.enabled && (
				<DataTableFilter
					value={globalFilter}
					onChange={handleFilterChange}
					placeholder={filtering.placeholder}
				/>
			)}
			<table className={s.table} role="table">
				{caption && <caption className={s.caption}>{caption}</caption>}
				<DataTableHeader
					table={table}
					sortingEnabled={sorting ? sorting.enabled : false}
				/>
				<DataTableBody
					table={table}
					onRowClick={onRowClick}
					loading={loading}
					loadingRowCount={loadingRowCount}
					isStriped={isStriped}
				/>
			</table>
			{pagination && pagination.enabled && (
				<DataTablePagination
					pageIndex={table.getState().pagination.pageIndex}
					pageCount={table.getPageCount()}
					pageSize={table.getState().pagination.pageSize}
					totalRows={totalRows}
					pageSizeOptions={pageSizeOptions}
					canPreviousPage={table.getCanPreviousPage()}
					canNextPage={table.getCanNextPage()}
					previousPage={table.previousPage}
					nextPage={table.nextPage}
					firstPage={() => table.setPageIndex(0)}
					lastPage={() => table.setPageIndex(table.getPageCount() - 1)}
					setPageSize={table.setPageSize}
					showPageSizeSelector={pagination.showPageSizeSelector}
				/>
			)}
		</div>
	)
}

DataTable.displayName = 'DataTable'

export { DataTable }
