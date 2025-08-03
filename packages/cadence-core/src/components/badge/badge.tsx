import React from 'react'
import classnames from 'classnames'
import s from './badge.module.css'

import type { BadgeProps } from './types'

const Badge = ({
	text,
	type = 'neutral',
	size = 'medium',
	style = 'filled',
	icon,
	className,
}: BadgeProps) => {
	const classes = classnames(
		s[`cds-badge--root`],
		s[`cds-badge--${size}`],
		s[`cds-badge--${style}--${type}`],
		className,
	)

	const hasIcon = !!icon
	const hasText = !!text

	return (
		<div className={classes} data-cy="cds-badge">
			{hasIcon && (
				<span className={s['cds-badge--icon']} data-cy="icon">
					{icon}
				</span>
			)}
			{hasText && (
				<span className={s['cds-badge--text']} data-cy="text">
					{text}
				</span>
			)}
		</div>
	)
}

export { Badge }
export type { BadgeProps }
