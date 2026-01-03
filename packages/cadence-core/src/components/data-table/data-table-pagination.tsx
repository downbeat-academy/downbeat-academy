'use client'

import React from 'react'
import classnames from 'classnames'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'cadence-icons'
import s from './data-table-pagination.module.css'
import type { DataTablePaginationProps } from './types'

function DataTablePagination({
	pageIndex,
	pageCount,
	pageSize,
	totalRows,
	pageSizeOptions,
	canPreviousPage,
	canNextPage,
	previousPage,
	nextPage,
	firstPage,
	lastPage,
	setPageSize,
	showPageSizeSelector = true,
	className,
}: DataTablePaginationProps) {
	const classes = classnames(s.pagination, className)

	const startRow = pageIndex * pageSize + 1
	const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

	return (
		<div className={classes}>
			<div className={s['pagination-info']}>
				Showing {startRow} to {endRow} of {totalRows} results
			</div>

			<div className={s['pagination-controls']}>
				{showPageSizeSelector && (
					<div className={s['pagination-page-size']}>
						<label htmlFor="page-size" className={s['pagination-page-size-label']}>
							Rows per page:
						</label>
						<select
							id="page-size"
							className={s['pagination-page-size-select']}
							value={pageSize}
							onChange={(e) => setPageSize(Number(e.target.value))}
						>
							{pageSizeOptions.map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
					</div>
				)}

				<div className={s['pagination-nav']}>
					<button
						type="button"
						className={s['pagination-button']}
						onClick={firstPage}
						disabled={!canPreviousPage}
						aria-label="Go to first page"
					>
						<ChevronsLeft width={16} height={16} aria-hidden="true" />
					</button>
					<button
						type="button"
						className={s['pagination-button']}
						onClick={previousPage}
						disabled={!canPreviousPage}
						aria-label="Go to previous page"
					>
						<ChevronLeft width={16} height={16} aria-hidden="true" />
					</button>
					<button
						type="button"
						className={s['pagination-button']}
						onClick={nextPage}
						disabled={!canNextPage}
						aria-label="Go to next page"
					>
						<ChevronRight width={16} height={16} aria-hidden="true" />
					</button>
					<button
						type="button"
						className={s['pagination-button']}
						onClick={lastPage}
						disabled={!canNextPage}
						aria-label="Go to last page"
					>
						<ChevronsRight width={16} height={16} aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	)
}

DataTablePagination.displayName = 'DataTablePagination'

export { DataTablePagination }
