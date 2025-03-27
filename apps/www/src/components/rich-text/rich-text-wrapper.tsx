import classnames from 'classnames'
import s from './wrapper.module.css'

import type { RichTextWrapperProps } from './types'

const RichTextWrapper = ({ children, className }: RichTextWrapperProps) => {
	const classes = classnames([s.root, className])

	return <div className={classes}>{children}</div>
}

export { RichTextWrapper }
export type { RichTextWrapperProps }
