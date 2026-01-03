import React from 'react'
import classnames from 'classnames'
import {
  CheckCircleOutline,
  AlertTriangleOutline,
  AlertCircleOutline,
} from 'cadence-icons'
import s from './validation-message.module.css'
import type { ValidationMessageProps } from './types'

type ValidationType = NonNullable<ValidationMessageProps['type']>

const typeStyles: Record<ValidationType, string> = {
  success: s.success,
  warning: s.warning,
  error: s.error,
}

const ValidationMessage = ({
  type = 'success',
  children,
  className,
  ...restProps
}: ValidationMessageProps) => {
  const classes = classnames(
    s.root,
    typeStyles[type],
    className
  )

  const getTypeIcon = (type: ValidationType) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutline width="16" />
      case 'warning':
        return <AlertTriangleOutline width="16" />
      case 'error':
        return <AlertCircleOutline width="16" />
      default:
        return null
    }
  }

  return (
    <span className={classes} {...restProps}>
      <i className={s.icon}>{getTypeIcon(type)}</i>
      {children}
    </span>
  )
}

export { ValidationMessage }