'use client'

import React from 'react'
import classnames from 'classnames'
import s from './drawer.module.css'
import type { DrawerBodyProps } from './types'

const DrawerBody = ({ className, ...props }: DrawerBodyProps) => (
  <div className={classnames(s.body, className)} {...props} />
)

DrawerBody.displayName = 'DrawerBody'

export { DrawerBody }
