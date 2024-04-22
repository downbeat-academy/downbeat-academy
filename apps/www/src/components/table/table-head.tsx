import * as React from 'react'
import classnames from 'classnames'
import s from './table-head.module.scss'

interface TableHeadProps {
	alignment?: 'start' | 'end'
}

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement> & TableHeadProps
>(({ className, alignment = 'start', ...props }, ref) => {
	const classes = classnames([
		s['table-head'],
		s[`table-head--alignment-${alignment}`],
		className,
	])

	return <th ref={ref} className={classes} {...props} />
})

TableHead.displayName = 'TableHead'

export { TableHead }
