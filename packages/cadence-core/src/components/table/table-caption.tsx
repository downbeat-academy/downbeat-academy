import * as React from 'react'
import classnames from 'classnames'

import type { TableCaptionProps } from './types'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
	({ className, ...props }, ref) => {
		const classes = classnames(className)

		return <caption ref={ref} className={classes || undefined} {...props} />
	}
)

TableCaption.displayName = 'TableCaption'

export { TableCaption }
