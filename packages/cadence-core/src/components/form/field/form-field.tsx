import React from 'react'
import classnames from 'classnames'
import s from './form-field.module.css'
import type { FormFieldProps } from './types'

const FormField = ({
  orientation = 'vertical',
  children,
  className,
  ...restProps
}: FormFieldProps) => {
  const classes = classnames(
    s['cds-form-field--root'],
    s['cds-form-field--orientation-' + orientation],
    className
  )

  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  )
}

export { FormField }