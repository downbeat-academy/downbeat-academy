'use client'

import React from 'react'
import classnames from 'classnames'
import s from './dialog.module.css'
import type { DialogHeaderProps } from './types'

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={classnames(s.header, className)} {...props} />
)

DialogHeader.displayName = 'DialogHeader'

export { DialogHeader }
