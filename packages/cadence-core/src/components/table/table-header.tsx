import * as React from 'react'
import classnames from 'classnames'

import type { TableHeaderProps } from './types'

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
	({ className, ...props }, ref) => {
		const classes = classnames(className)

		return <thead ref={ref} className={classes || undefined} {...props} />
	}
)

TableHeader.displayName = 'TableHeader'

export { TableHeader }
