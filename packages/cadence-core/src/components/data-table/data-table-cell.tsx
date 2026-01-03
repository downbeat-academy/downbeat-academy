import React from 'react'
import classnames from 'classnames'
import s from './data-table.module.css'
import type { DataTableCellProps, DataTableAlignment } from './types'

const alignmentClassMap: Record<DataTableAlignment, string> = {
	start: s.cellAlignmentStart,
	center: s.cellAlignmentCenter,
	end: s.cellAlignmentEnd,
}

const DataTableCell = React.forwardRef<HTMLTableCellElement, DataTableCellProps>(
	({ alignment = 'start', className, children, ...props }, ref) => {
		const classes = classnames(
			s.cell,
			alignmentClassMap[alignment],
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
