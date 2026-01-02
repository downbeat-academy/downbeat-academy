import * as React from 'react'
import classnames from 'classnames'

import type { TableFooterProps } from './types'

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
	({ className, ...props }, ref) => {
		const classes = classnames(className)

		return <tfoot ref={ref} className={classes || undefined} {...props} />
	}
)

TableFooter.displayName = 'TableFooter'

export { TableFooter }
