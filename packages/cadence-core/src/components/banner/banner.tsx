import React from 'react'
import classnames from 'classnames'
import s from './banner.module.css'

import type { BannerProps } from './types'

const typeMap = {
	primary: s.typePrimary,
	secondary: s.typeSecondary,
	tertiary: s.typeTertiary,
} as const

const Banner = ({ children, className, type }: BannerProps) => {
	const classes = classnames(
		s.root,
		type && typeMap[type],
		className,
	)

	return <div className={classes}>{children}</div>
}

Banner.displayName = 'Banner'

const Root = Banner

export { Banner, Root }
export type { BannerProps }