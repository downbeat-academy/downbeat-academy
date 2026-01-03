import React from 'react'
import classnames from 'classnames'
import s from './form.module.css'
import type { FormProps } from './types'

const spacingClassMap: Record<string, string> = {
  none: s.spacingNone,
  small: s.spacingSmall,
  medium: s.spacingMedium,
  large: s.spacingLarge,
}

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
    s.root,
    spacingClassMap[spacing],
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
