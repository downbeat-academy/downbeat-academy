'use client'

import React from 'react'
import classnames from 'classnames'
import s from './drawer.module.css'
import type { DrawerHeaderProps } from './types'

const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div className={classnames(s.header, className)} {...props} />
)

DrawerHeader.displayName = 'DrawerHeader'

export { DrawerHeader }
