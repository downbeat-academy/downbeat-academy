import classnames from 'classnames'
import s from './input.module.scss'

import type { InputProps } from "../types";

const Input = ({
  type = 'text',
  name,
  placeholder,
  disabled,
  readonly,
  required,
  value,
  id,
  className,
  register,
  isInvalid,
}: InputProps) => {

  const classes = classnames(
    s['cds-input--root'],
    isInvalid ? s['cds-input--is-invalid'] : null,
    className,
  )

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      value={value}
      id={id}
      className={classes}
      {...register && { ...register(name) }}
    />
  )
}

export { Input }