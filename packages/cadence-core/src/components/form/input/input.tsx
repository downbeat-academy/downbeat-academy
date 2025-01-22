import React from 'react'
import classnames from 'classnames'
import s from './input.module.css'

import type { InputProps } from './types'

const Input = ({
	type = 'text',
	name,
	placeholder,
	disabled,
	readOnly,
	value,
	id,
	className,
	register,
	isInvalid,
	onChange,
	...props
}: InputProps) => {
	const classes = classnames(
		s['cds-input--root'],
		isInvalid ? s['cds-input--is-invalid'] : null,
		className
	)

	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			disabled={disabled}
			// readonly={readOnly}
			value={value}
			id={id}
			className={classes}
			{...(register && { ...register(name) })}
			onChange={onChange}
			{...props}
		/>
	)
}

export { Input }
export type { InputProps }
