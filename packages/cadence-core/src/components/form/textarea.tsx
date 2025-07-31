import React, { forwardRef } from 'react'
import classnames from 'classnames'
import s from './textarea.module.css'
import type { TextareaProps } from './types'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  name,
  placeholder,
  disabled,
  readOnly,
  required,
  value,
  id,
  rows = 5,
  className,
  register,
  ...props
}, ref) => {
  const classes = classnames(s['cds-textarea--root'], className)

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      id={id}
      rows={rows}
      className={classes}
      ref={ref}
      {...(register && { ...register(name) })}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
export type { TextareaProps }