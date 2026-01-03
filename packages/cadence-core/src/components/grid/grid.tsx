import React from 'react'
import classnames from 'classnames'
import s from './grid.module.css'

import { GridProps } from './types'

const columnsMap = {
	1: s.columns1,
	2: s.columns2,
	3: s.columns3,
	4: s.columns4,
	5: s.columns5,
	6: s.columns6,
	7: s.columns7,
	8: s.columns8,
	9: s.columns9,
	10: s.columns10,
	11: s.columns11,
	12: s.columns12,
} as const

const Grid = ({ children, tag = 'div', columns, className }: GridProps) => {
	const classes = classnames(
		s.root,
		columns && columnsMap[columns],
		className
	)

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

export { Grid }
export type { GridProps }
