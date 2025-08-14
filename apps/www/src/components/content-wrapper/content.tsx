import classnames from 'classnames'
import s from './content.module.css'

import type { ContentProps } from './types'

const Content = ({ children, isFullBleed, className }: ContentProps) => {
	const classes = classnames(
		s['content-wrapper'],
		isFullBleed && s['is-full-bleed'],
		className
	)

	return <div className={classes}>{children}</div>
}

export { Content }
export type { ContentProps } from './types'
