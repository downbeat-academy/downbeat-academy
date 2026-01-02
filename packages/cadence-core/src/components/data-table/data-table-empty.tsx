import React from 'react'
import classnames from 'classnames'
import s from './data-table.module.css'
import type { DataTableEmptyProps } from './types'

function DataTableEmpty({
	title = 'No data',
	description,
	render,
	className,
}: DataTableEmptyProps) {
	const classes = classnames(s['data-table-empty'], className)

	if (render) {
		return <div className={classes}>{render()}</div>
	}

	return (
		<div className={classes}>
			<p className={s['data-table-empty-title']}>{title}</p>
			{description && <p className={s['data-table-empty-description']}>{description}</p>}
		</div>
	)
}

DataTableEmpty.displayName = 'DataTableEmpty'

export { DataTableEmpty }
