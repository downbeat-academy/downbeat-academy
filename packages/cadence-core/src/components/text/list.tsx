import React from 'react'
import classnames from 'classnames'
import s from './list.module.css'

import type { ListProps } from './types'

const List = ({ children, type, collapse, className }: ListProps) => {
	const classes = classnames(
		s.root,
		collapse && s.collapse,
		className
	)

	switch (type) {
		case 'ordered':
			return <ol className={classes}>{children}</ol>
		case 'unordered':
			return <ul className={classes}>{children}</ul>
		default:
			throw new Error('Unknown list type')
	}
}

export { List }
export type { ListProps }
