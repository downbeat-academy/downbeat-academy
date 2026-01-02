import * as React from 'react'
import classnames from 'classnames'
import s from './table-row.module.css'

import type { TableRowProps } from './types'

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
	({ className, isHeader = false, ...props }, ref) => {
		const classes = classnames(
			s['table-row'],
			isHeader && s['table-row--is-header'],
			className
		)

		return <tr ref={ref} className={classes} {...props} />
	}
)

TableRow.displayName = 'TableRow'

export { TableRow }
