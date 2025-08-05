import React from 'react'
import classnames from 'classnames'
import s from './form.module.css'
import type { FormProps } from './types'

const Form = ({
  children,
  name,
  rel,
  action,
  method,
  spacing = 'medium',
  maxWidth,
  className,
  onSubmit,
  ...restProps
}: FormProps) => {
  const maxWidthStyle = {
    maxWidth: maxWidth,
  }

  const classes = classnames(
    s['root'],
    s[`spacing-${spacing}`],
    className
  )

  return (
    <form
      name={name}
      rel={rel}
      action={action}
      method={method}
      className={classes}
      style={maxWidthStyle}
      onSubmit={onSubmit}
      {...restProps}
    >
      {children}
    </form>
  )
}

export { Form }