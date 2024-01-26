import classnames from 'classnames'
import s from './validation-message.module.scss'

import type { ValidationMessageProps } from "../types"

const ValidationMessage = ({
  type = 'success',
  children,
  className,
}: ValidationMessageProps) => {

  const classes = classnames(
    s['cds-validation-message--root'],
    s['cds-validation-message--type-' + type],
    className,
  )

  return (
    <span
      className={classes}
    >
      {children}
    </span>
  )
}

export { ValidationMessage }