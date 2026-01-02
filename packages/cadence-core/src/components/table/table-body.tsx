import * as React from 'react'
import classnames from 'classnames'

import type { TableBodyProps } from './types'

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
	({ className, ...props }, ref) => {
		const classes = classnames(className)

		return <tbody ref={ref} className={classes || undefined} {...props} />
	}
)

TableBody.displayName = 'TableBody'

export { TableBody }
