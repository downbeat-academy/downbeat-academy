import React from 'react'
import classnames from 'classnames'
import s from './section-container.module.css'

import type { SectionContainerProps } from './types'

const SectionContainer = ({
	children,
	tag = 'div',
	background,
	borderColor = 'primary',
	className,
	...restProps
}: SectionContainerProps) => {
	const classes = classnames(
		s.root,
		s[`background--${background}`],
		s[`border-color--${borderColor}`],
		className
	)

	const Tag = tag

	return (
		<Tag className={classes} {...restProps}>
			{children}
		</Tag>
	)
}

SectionContainer.displayName = 'SectionContainer'

export { SectionContainer }
