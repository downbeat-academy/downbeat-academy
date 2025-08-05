import React from 'react'
import classnames from 'classnames'
import {
  CheckCircleOutline,
  AlertTriangleOutline,
  AlertCircleOutline,
} from 'cadence-icons'
import s from './validation-message.module.css'
import type { ValidationMessageProps } from './types'

const ValidationMessage = ({
  type = 'success',
  children,
  className,
  ...restProps
}: ValidationMessageProps) => {
  const classes = classnames(
    s['root'],
    s['type-' + type],
    className
  )

  const getTypeIcon = (type: 'success' | 'warning' | 'error') => {
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
      <i className={s['icon']}>{getTypeIcon(type)}</i>
      {children}
    </span>
  )
}

export { ValidationMessage }