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
	const classes = classnames(s.empty, className)

	if (render) {
		return <div className={classes}>{render()}</div>
	}

	return (
		<div className={classes}>
			<p className={s.emptyTitle}>{title}</p>
			{description && <p className={s.emptyDescription}>{description}</p>}
		</div>
	)
}

DataTableEmpty.displayName = 'DataTableEmpty'

export { DataTableEmpty }
