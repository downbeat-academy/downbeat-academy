import React from 'react'
import classnames from 'classnames'
import s from './data-table.module.css'
import type { DataTableCellProps } from './types'

const DataTableCell = React.forwardRef<HTMLTableCellElement, DataTableCellProps>(
	({ alignment = 'start', className, children, ...props }, ref) => {
		const classes = classnames(
			s['data-table-cell'],
			s[`data-table-cell--alignment-${alignment}`],
			className
		)

		return (
			<td ref={ref} className={classes} {...props}>
				{children}
			</td>
		)
	}
)

DataTableCell.displayName = 'DataTableCell'

export { DataTableCell }
