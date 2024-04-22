import React from 'react'
import classnames from 'classnames'
import s from './badge.scss'

import type { BadgeProps } from './types'

const Badge = ({
	text,
	type = 'neutral',
	size = 'medium',
	style = 'filled',
	icon,
	className,
}: BadgeProps) => {
	const classes = classnames([
		s.root,
		s[size],
		s[`${style}--${type}`],
		className,
	])

	const hasIcon = !!icon
	const hasText = !!text

	return (
		<div className={classes} data-cy="cds-badge">
			{hasIcon && (
				<span className={s.icon} data-cy="icon">
					{icon}
				</span>
			)}
			{hasText && (
				<span className={s.text} data-cy="text">
					{text}
				</span>
			)}
		</div>
	)
}

export { Badge }
export type { BadgeProps }
