import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import s from './form.module.scss'

import type { FormProps } from "../types"

const Form = ({
  children,
  name,
  rel,
  action,
  method,
  spacing = 'medium',
  maxWidth,
  className,
}: FormProps) => {

  const classes = classnames(
    s['cds-form--root'],
    s[`cds-form--spacing-${spacing}`],
    className,
  )

  return (
    <form
      name={name}
      rel={rel}
      action={action}
      method={method}
      className={classes}
    >
      {children}
    </form>
  )
}

export { Form }