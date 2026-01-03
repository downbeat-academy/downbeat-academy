import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './input.module.css'
import type { InputProps } from './types'

const Input = forwardRef<HTMLInputElement, InputProps>(({
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
}, ref) => {
  const classes = classnames(
    s.root,
    isInvalid && s.isInvalid,
    className
  )

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      id={id}
      className={classes}
      ref={ref}
      {...(register && { ...register(name) })}
      onChange={onChange}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }