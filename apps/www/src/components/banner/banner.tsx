import classnames from 'classnames'
import s from './banner.module.scss'

import type { BannerProps } from './types'

const Banner = ({ children, className, type }: BannerProps) => {
	const classes = classnames([
		s[`banner--root`],
		s[type ? `banner--type-${type}` : null],
		className,
	])

	return <div className={classes}>{children}</div>
}

Banner.displayName = 'Banner'

const Root = Banner

export { Banner, Root }
export type { BannerProps }
