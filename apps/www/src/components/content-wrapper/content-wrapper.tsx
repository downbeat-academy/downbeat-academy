import classnames from 'classnames'
import s from './content-wrapper.module.scss'

import type { ContentWrapperProps } from './types'

const ContentWrapper = ({ children, className }: ContentWrapperProps) => {
	const classes = classnames(s['content-wrapper--root'], [className])

	return <main className={classes}>{children}</main>
}

export { ContentWrapper }
