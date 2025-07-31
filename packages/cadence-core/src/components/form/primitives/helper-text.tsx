import React from 'react'
import classnames from 'classnames'
import s from './helper-text.module.css'
import type { HelperTextProps } from '../types'

const HelperText = ({ children, className }: HelperTextProps) => {
  const classes = classnames(s['cds-helper-text--root'], className)

  return <span className={classes}>{children}</span>
}

export { HelperText }
export type { HelperTextProps }