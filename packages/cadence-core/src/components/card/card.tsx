import React from 'react'
import classnames from 'classnames'
import s from './card.module.css'

import type { CardProps } from './types'

const borderColorMap = {
	primary: s.borderPrimary,
	faint: s.borderFaint,
	none: s.borderNone,
} as const

const radiusMap = {
	none: s.radiusNone,
	hard: s.radiusHard,
	medium: s.radiusMedium,
	soft: s.radiusSoft,
	'x-soft': s.radiusXSoft,
} as const

const backgroundMap = {
	primary: s.backgroundPrimary,
	faint: s.backgroundFaint,
	'high-contrast': s.backgroundHighContrast,
	brand: s.backgroundBrand,
	interactive: s.backgroundInteractive,
	success: s.backgroundSuccess,
	warning: s.backgroundWarning,
	critical: s.backgroundCritical,
} as const

const Card = ({
	children,
	tag = 'div',
	borderColor,
	radius = 'soft',
	background,
	className,
	...restProps
}: CardProps) => {
	const classes = classnames(
		s.root,
		borderColor && borderColorMap[borderColor],
		radiusMap[radius],
		background && backgroundMap[background],
		className
	)

	const Tag = tag

	return (
		<Tag className={classes} {...restProps}>
			{children}
		</Tag>
	)
}

Card.displayName = 'Card'

const Root = Card

export { Card, Root }
export type { CardProps }
