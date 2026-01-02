import * as React from 'react'
import classnames from 'classnames'
import s from './table-head.module.css'

import type { TableHeadProps } from './types'

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
	({ className, alignment = 'start', scope = 'col', ...props }, ref) => {
		const classes = classnames(
			s['table-head'],
			s[`table-head--alignment-${alignment}`],
			className
		)

		return <th ref={ref} className={classes} scope={scope} {...props} />
	}
)

TableHead.displayName = 'TableHead'

export { TableHead }
