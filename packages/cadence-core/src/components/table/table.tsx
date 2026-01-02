import * as React from 'react'
import classnames from 'classnames'
import s from './table.module.css'

import type { TableProps } from './types'

const Table = React.forwardRef<HTMLTableElement, TableProps>(
	({ className, backgroundColor = 'none', ...props }, ref) => {
		const wrapperClasses = classnames(
			s['table-wrapper'],
			backgroundColor !== 'none' && s[`table-wrapper--background-${backgroundColor}`],
			className
		)

		return (
			<div className={wrapperClasses}>
				<table ref={ref} className={s['table']} {...props} />
			</div>
		)
	}
)

Table.displayName = 'Table'

export { Table }
