import classnames from 'classnames'

import type { AppFrameProps } from './types'
import s from './app-frame.module.css'

const AppFrame = ({ children }: AppFrameProps) => {
	const classes = classnames(s['app-frame--root'])

	return <div className={classes}>{children}</div>
}

export { AppFrame }
export type { AppFrameProps } from './types'
