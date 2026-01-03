import React from 'react'
import classnames from 'classnames'
import s from './badge.module.css'

import type { BadgeProps } from './types'

const styleTypeMap = {
	filled: {
		neutral: s.filledNeutral,
		info: s.filledInfo,
		success: s.filledSuccess,
		warning: s.filledWarning,
		error: s.filledError,
		highlight: s.filledHighlight,
	},
	outlined: {
		neutral: s.outlinedNeutral,
		info: s.outlinedInfo,
		success: s.outlinedSuccess,
		warning: s.outlinedWarning,
		error: s.outlinedError,
		highlight: s.outlinedHighlight,
	},
	light: {
		neutral: s.lightNeutral,
		info: s.lightInfo,
		success: s.lightSuccess,
		warning: s.lightWarning,
		error: s.lightError,
		highlight: s.lightHighlight,
	},
} as const

const Badge = ({
	text,
	type = 'neutral',
	size = 'medium',
	style = 'filled',
	icon,
	className,
}: BadgeProps) => {
	const classes = classnames(
		s.root,
		s[size],
		styleTypeMap[style][type],
		className,
	)

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
