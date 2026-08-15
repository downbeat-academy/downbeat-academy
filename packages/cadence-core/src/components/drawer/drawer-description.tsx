'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ModalDescription } from '../modal'
import s from './drawer.module.css'
import type { DrawerDescriptionProps } from './types'

const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
	({ className, ...props }, ref) => (
		<ModalDescription
			ref={ref}
			className={classnames(s.description, className)}
			{...props}
		/>
	)
)

DrawerDescription.displayName = 'DrawerDescription'

export { DrawerDescription }
