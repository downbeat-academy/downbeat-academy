import React from 'react'
import classnames from 'classnames'
import s from './helper-text.module.css'
import type { HelperTextProps } from './types'

const HelperText = ({ children, className }: HelperTextProps) => {
  const classes = classnames(s['root'], className)

  return <span className={classes}>{children}</span>
}

export { HelperText }