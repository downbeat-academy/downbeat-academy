import React from 'react'
import classnames from 'classnames'
import s from './data-table.module.css'

interface DataTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	isHeader?: boolean
	isClickable?: boolean
	isLoading?: boolean
}

const DataTableRow = React.forwardRef<HTMLTableRowElement, DataTableRowProps>(
	({ isHeader, isClickable, isLoading, className, children, ...props }, ref) => {
		const classes = classnames(
			isHeader ? s['data-table-header-row'] : s['data-table-row'],
			isClickable && s['data-table-row--clickable'],
			isLoading && s['data-table-row--loading'],
			className
		)

		return (
			<tr ref={ref} className={classes} {...props}>
				{children}
			</tr>
		)
	}
)

DataTableRow.displayName = 'DataTableRow'

export { DataTableRow }
