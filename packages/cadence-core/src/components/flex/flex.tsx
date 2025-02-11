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
		s[`flex`],
		s[`flex--gap--${gap}`],
		s[`flex--padding--${padding}`],
		s[`flex--direction--${direction}`],
		s[`flex--align-items--${alignItems}`],
		s[`flex--align-content--${alignContent}`],
		s[`flex--justify-items--${justifyItems}`],
		s[`flex--justify--${justifyContent}`],
		s[`flex--background--${background}`],
		{[s[`flex--wrap`]]: wrap},
		className,
	)

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

export { Flex }
export type { FlexProps }
