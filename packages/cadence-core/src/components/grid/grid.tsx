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

const gapMap = {
	none: s.gapNone,
	'2x-small': s.gap2xSmall,
	'x-small': s.gapXSmall,
	small: s.gapSmall,
	medium: s.gapMedium,
	large: s.gapLarge,
	'x-large': s.gapXLarge,
	'2x-large': s.gap2xLarge,
	'3x-large': s.gap3xLarge,
} as const

const Grid = ({
	children,
	tag = 'div',
	columns,
	gap = 'none',
	minColumnWidth,
	className,
	style,
	...restProps
}: GridProps) => {
	const classes = classnames(
		s.root,
		columns && columnsMap[columns],
		gapMap[gap],
		className
	)

	const Tag = tag

	const styles = minColumnWidth
		? ({
				...style,
				'--cds-grid-min-column-width': minColumnWidth,
			} as React.CSSProperties)
		: style

	return (
		<Tag className={classes} style={styles} {...restProps}>
			{children}
		</Tag>
	)
}

export { Grid }
export type { GridProps }
