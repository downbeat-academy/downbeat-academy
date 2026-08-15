'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ModalTitle } from '../modal'
import s from './drawer.module.css'
import type { DrawerTitleProps } from './types'

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
	({ className, ...props }, ref) => (
		<ModalTitle ref={ref} className={classnames(s.title, className)} {...props} />
	)
)

DrawerTitle.displayName = 'DrawerTitle'

export { DrawerTitle }
