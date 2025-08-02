import React from 'react'
import classnames from 'classnames'
import s from './field.module.css'
import type { FieldProps } from './types'

const Field = ({
  orientation = 'vertical',
  children,
  className,
  ...restProps
}: FieldProps) => {
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

export { Field }