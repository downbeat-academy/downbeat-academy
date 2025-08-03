import React from 'react'
import classnames from 'classnames'
import s from './card.module.css'

import type { CardProps } from './types'

const Card = ({ children, tag = 'div', borderColor, className }: CardProps) => {
	const classes = classnames(
		s['cds-card--root'],
		borderColor && s[`cds-card--border-${borderColor}`],
		className
	)

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

Card.displayName = 'Card'

const Root = Card

export { Card, Root }
export type { CardProps }