import React from 'react'
import classnames from 'classnames'
import s from './flex.module.css'

import type { FlexProps } from './types'

const directionMap = {
	row: s.directionRow,
	column: s.directionColumn,
} as const

const gapMap = {
	none: s.gapNone,
	'2x-small': s.gap2xSmall,
	'x-small': s.gapXSmall,
	small: s.gapSmall,
	medium: s.gapMedium,
	large: s.gapLarge,
	'x-large': s.gapXLarge,
	'2x-large': s.gap2xLarge,
	'3x-large': s.gap3xLarge,
} as const

const paddingMap = {
	none: s.paddingNone,
	'2x-small': s.padding2xSmall,
	'x-small': s.paddingXSmall,
	small: s.paddingSmall,
	medium: s.paddingMedium,
	large: s.paddingLarge,
	'x-large': s.paddingXLarge,
	'2x-large': s.padding2xLarge,
	'3x-large': s.padding3xLarge,
} as const

const alignItemsMap = {
	stretch: s.alignItemsStretch,
	start: s.alignItemsStart,
	center: s.alignItemsCenter,
	end: s.alignItemsEnd,
} as const

const alignContentMap = {
	stretch: s.alignContentStretch,
	start: s.alignContentStart,
	center: s.alignContentCenter,
	end: s.alignContentEnd,
} as const

const justifyContentMap = {
	start: s.justifyStart,
	center: s.justifyCenter,
	end: s.justifyEnd,
	'space-between': s.justifySpaceBetween,
	'space-around': s.justifySpaceAround,
	'space-evenly': s.justifySpaceEvenly,
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

const Flex = ({
	children,
	tag = 'div',
	gap = 'none',
	padding = 'none',
	direction = 'column',
	className,
	alignItems,
	alignContent,
	justifyItems,
	justifyContent,
	background,
	wrap,
}: FlexProps) => {
	const classes = classnames(
		s.root,
		gapMap[gap],
		paddingMap[padding],
		directionMap[direction],
		alignItems && alignItemsMap[alignItems],
		alignContent && alignContentMap[alignContent],
		justifyContent && justifyContentMap[justifyContent],
		background && backgroundMap[background],
		wrap && s.wrap,
		className,
	)

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

export { Flex }
export type { FlexProps }
