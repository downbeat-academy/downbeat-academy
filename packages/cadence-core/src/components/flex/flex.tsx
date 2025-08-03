import React from 'react'
import classnames from 'classnames'
import s from './flex.module.css'

import type { FlexProps } from './types'

const Flex = ({
	children,
	tag = 'div',
	gap = 'none',
	padding = 'none',
	direction = 'column',
	className,
	alignItems,
	alignContent,
	justifyItems,
	justifyContent,
	background,
	wrap,
}: FlexProps) => {
	const classes = classnames(
		s[`cds-flex`],
		s[`cds-flex--gap--${gap}`],
		s[`cds-flex--padding--${padding}`],
		s[`cds-flex--direction--${direction}`],
		s[`cds-flex--align-items--${alignItems}`],
		s[`cds-flex--align-content--${alignContent}`],
		s[`cds-flex--justify-items--${justifyItems}`],
		s[`cds-flex--justify--${justifyContent}`],
		s[`cds-flex--background--${background}`],
		{[s[`cds-flex--wrap`]]: wrap},
		className,
	)

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

export { Flex }
export type { FlexProps }
