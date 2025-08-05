import React from 'react'
import classnames from 'classnames'
import s from './grid.module.css'

import { GridProps } from './types'

const Grid = ({ children, tag = 'div', columns, className }: GridProps) => {
	const classes = classnames(
		s[`root`],
		s[`columns--${columns}`],
		className
	)

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

export { Grid }
export type { GridProps }
