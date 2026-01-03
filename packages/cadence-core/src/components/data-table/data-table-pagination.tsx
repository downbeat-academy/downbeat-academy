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
	const classes = classnames(s.root, className)

	const startRow = pageIndex * pageSize + 1
	const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

	return (
		<div className={classes}>
			<div className={s.info}>
				Showing {startRow} to {endRow} of {totalRows} results
			</div>

			<div className={s.controls}>
				{showPageSizeSelector && (
					<div className={s.pageSize}>
						<label htmlFor="page-size" className={s.pageSizeLabel}>
							Rows per page:
						</label>
						<select
							id="page-size"
							className={s.pageSizeSelect}
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

				<div className={s.nav}>
					<button
						type="button"
						className={s.button}
						onClick={firstPage}
						disabled={!canPreviousPage}
						aria-label="Go to first page"
					>
						<ChevronsLeft width={16} height={16} aria-hidden="true" />
					</button>
					<button
						type="button"
						className={s.button}
						onClick={previousPage}
						disabled={!canPreviousPage}
						aria-label="Go to previous page"
					>
						<ChevronLeft width={16} height={16} aria-hidden="true" />
					</button>
					<button
						type="button"
						className={s.button}
						onClick={nextPage}
						disabled={!canNextPage}
						aria-label="Go to next page"
					>
						<ChevronRight width={16} height={16} aria-hidden="true" />
					</button>
					<button
						type="button"
						className={s.button}
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
