import classnames from 'classnames'
import s from './textarea.module.scss'

import type { TextareaProps } from "../types";

const Textarea = ({
  name,
  placeholder,
  disabled,
  readonly,
  required,
  value,
  id,
  rows = 5,
  className,
}: TextareaProps) => {

  const classes = classnames(
    s['cds-textarea--root'],
    className,
  )

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      value={value}
      id={id}
      rows={rows}
      className={classes}
    />
  )
}

export { Textarea }