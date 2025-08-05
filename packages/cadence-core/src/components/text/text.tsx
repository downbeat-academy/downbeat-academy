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
	id,
}: TextProps) => {
	const classes = classnames(
		s[`root--${type}`],
		s[`root--${type}--${size}`],
		s[`root--color-${color}`],
		s[`root--background-${background}`],
		s[`root--align-${align}`],
		{[s[`root--collapse`]]: collapse,},
		className
	)

	// Turn the tag in to a function that renders a div by default
	const Tag = tag

	return (
		<Tag className={classes} id={id} data-cy={dataCy}>
			{children}
		</Tag>
	)
}

export { Text }
export type { TextProps }