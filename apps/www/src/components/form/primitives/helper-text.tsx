import classnames from 'classnames'
import s from './helper-text.module.scss'

import type { HelperTextProps } from '../types'

const HelperText = ({ children, className }: HelperTextProps) => {
	const classes = classnames(s['cds-helper-text--root'], className)

	return <span className={classes}>{children}</span>
}

export { HelperText }
