import React from 'react'
import classnames from 'classnames'
import s from './text.module.css'

import type { TextProps } from './types'

const typeMap = {
	'productive-body': s.productiveBody,
	'productive-headline': s.productiveHeadline,
	'expressive-body': s.expressiveBody,
	'expressive-headline': s.expressiveHeadline,
} as const

const typeSizeMap = {
	'productive-headline': {
		h1: s.productiveHeadlineH1,
		h2: s.productiveHeadlineH2,
		h3: s.productiveHeadlineH3,
		h4: s.productiveHeadlineH4,
		h5: s.productiveHeadlineH5,
		h6: s.productiveHeadlineH6,
	},
	'productive-body': {
		'body-large': s.productiveBodyBodyLarge,
		'body-base': s.productiveBodyBodyBase,
		'body-small': s.productiveBodyBodySmall,
		'body-x-small': s.productiveBodyBodyXSmall,
	},
	'expressive-headline': {
		mega: s.expressiveHeadlineMega,
		h1: s.expressiveHeadlineH1,
		h2: s.expressiveHeadlineH2,
		h3: s.expressiveHeadlineH3,
		h4: s.expressiveHeadlineH4,
		h5: s.expressiveHeadlineH5,
		h6: s.expressiveHeadlineH6,
	},
	'expressive-body': {
		'body-large': s.expressiveBodyBodyLarge,
		'body-base': s.expressiveBodyBodyBase,
		'body-small': s.expressiveBodyBodySmall,
		'body-x-small': s.expressiveBodyBodyXSmall,
	},
} as const

const colorMap = {
	primary: s.colorPrimary,
	strong: s.colorStrong,
	faint: s.colorFaint,
	disabled: s.colorDisabled,
	'high-contrast': s.colorHighContrast,
	warning: s.colorWarning,
	critical: s.colorCritical,
	interactive: s.colorInteractive,
	brand: s.colorBrand,
	success: s.colorSuccess,
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

const alignMap = {
	left: s.alignLeft,
	center: s.alignCenter,
	right: s.alignRight,
	justify: s.alignJustify,
} as const

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
	const typeSizeClasses = typeSizeMap[type] as Record<string, string>

	const classes = classnames(
		typeMap[type],
		typeSizeClasses?.[size],
		colorMap[color],
		background && backgroundMap[background],
		alignMap[align],
		collapse && s.collapse,
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
