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
		s[`cds-text--${type}`],
		s[`cds-text--${type}--${size}`],
		s[`cds-text--color-${color}`],
		s[`cds-text--background-${background}`],
		s[`cds-text--align-${align}`],
		{[s[`cds-text--collapse`]]: collapse,},
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