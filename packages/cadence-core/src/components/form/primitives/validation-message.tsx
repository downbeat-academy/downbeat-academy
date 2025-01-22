import React from 'react'
import classnames from 'classnames'
import {
	CheckCircleOutline,
	AlertTriangleOutline,
	AlertCircleOutline,
} from 'cadence-icons'
import s from './validation-message.module.scss'

import type { ValidationMessageProps } from './types'

const ValidationMessage = ({
	type = 'success',
	children,
	className,
}: ValidationMessageProps) => {
	const classes = classnames(
		s['cds-validation-message--root'],
		s['cds-validation-message--type-' + type],
		className
	)

	const getType = (type: ValidationMessageProps['type']): React.ReactNode => {
		switch (type) {
			case 'success':
				return <CheckCircleOutline width="16" />
			case 'warning':
				return <AlertTriangleOutline width="16" />
			case 'error':
				return <AlertCircleOutline width="16" />
			default:
				return null
		}
	}

	return (
		<span className={classes}>
			<i className={s['cds-validation-message--icon']}>{getType(type)}</i>
			{children}
		</span>
	)
}

export { ValidationMessage }
