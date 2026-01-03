import React from 'react'
import classnames from 'classnames'
import s from './card.module.css'

import type { CardProps } from './types'

const borderColorMap = {
	primary: s.borderPrimary,
	faint: s.borderFaint,
	none: s.borderNone,
} as const

const Card = ({ children, tag = 'div', borderColor, className }: CardProps) => {
	const classes = classnames(
		s.root,
		borderColor && borderColorMap[borderColor],
		className
	)

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

Card.displayName = 'Card'

const Root = Card

export { Card, Root }
export type { CardProps }