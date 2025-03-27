import * as React from 'react'
import classnames from 'classnames'
import s from './table-row.module.css'

interface TableRowProps {
	isHeader?: boolean
}

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement> & TableRowProps
>(({ className, isHeader = false, ...props }, ref) => {
	const classes = classnames([
		s['table-row'],
		[isHeader ? s['table-row--is_header'] : null],
		className,
	])

	return <tr ref={ref} className={classes} {...props} />
})

TableRow.displayName = 'TableRow'

export { TableRow }
