import React from 'react'
import classnames from 'classnames'
import s from './banner.module.css'

import type { BannerProps } from './types'

const Banner = ({ children, className, type }: BannerProps) => {
	const classes = classnames([
		s[`root`],
		s[type ? `type-${type}` : ''],
		className,
	])

	return <div className={classes}>{children}</div>
}

Banner.displayName = 'Banner'

const Root = Banner

export { Banner, Root }
export type { BannerProps }