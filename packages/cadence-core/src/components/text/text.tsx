import React from 'react'
import classnames from 'classnames'
import s from './text.module.css'

import type { TextProps } from './types'

const Text = ({
	align = 'left',
	background,
	children,
	className,
	collapse,
	color = 'primary',
	isFluid = false,
	size = 'body-base',
	tag = 'div',
	type = 'productive-body',
	dataCy,
}: TextProps) => {
	const classes = classnames(
		s[`type--${type}`],
		s[`type--${type}-size--${size}`],
		s[`color--${color}`],
		s[`background--${background}`],
		s[align],
		{
			[s.collapse]: collapse,
		},
		className
	)

	// Turn the tag in to a function that renders a div by default
	const Tag = tag

	return (
		// @ts-ignore
		<Tag className={classes} data-cy={dataCy}>
			{children}
		</Tag>
	)
}

export { Text }
