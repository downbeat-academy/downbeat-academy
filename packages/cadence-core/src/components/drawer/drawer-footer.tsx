'use client'

import React from 'react'
import classnames from 'classnames'
import s from './drawer.module.css'
import type { DrawerFooterProps } from './types'

const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div className={classnames(s.footer, className)} {...props} />
)

DrawerFooter.displayName = 'DrawerFooter'

export { DrawerFooter }
