import classnames from 'classnames'
import s from './form-field.module.scss'

import type { FormFieldProps } from '../types'

const FormField = ({ children, className }: FormFieldProps) => {
	const classes = classnames(s['cds-form-field--root'], className)

	return <div className={classes}>{children}</div>
}

export { FormField }
