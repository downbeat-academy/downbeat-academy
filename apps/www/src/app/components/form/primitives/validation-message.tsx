import classnames from 'classnames'
import {
  CheckCircleOutline,
} from 'cadence-icons'
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

  const getType = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutline width='16' />
      default:
        return null
    }
  }

  return (
    <span
      className={classes}
    >
      {getType(type)}
      {children}
    </span>
  )
}

export { ValidationMessage }