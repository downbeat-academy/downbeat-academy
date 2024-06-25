import * as React from 'react'
import classnames from 'classnames'
import s from './table-cell.module.scss'

interface TableCellProps {
	alignment?: 'start' | 'end'
}

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.HTMLAttributes<HTMLTableCellElement> & TableCellProps
>(({ className, alignment = 'start', ...props }, ref) => {
	const classes = classnames([
		s['table-cell'],
		s[`table-cell--alignment-${alignment}`],
		className,
	])

	return <td ref={ref} className={classes} {...props} />
})

TableCell.displayName = 'TableCell'

export { TableCell }
