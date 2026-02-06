'use client'

import React from 'react'
import classnames from 'classnames'
import s from './dialog.module.css'
import type { DialogFooterProps } from './types'

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div className={classnames(s.footer, className)} {...props} />
)

DialogFooter.displayName = 'DialogFooter'

export { DialogFooter }
