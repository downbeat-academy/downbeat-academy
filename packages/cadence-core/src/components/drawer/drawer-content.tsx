'use client'

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ModalSurface } from '../modal'
import s from './drawer.module.css'
import type { DrawerContentProps } from './types'

const DrawerContent = forwardRef<HTMLDialogElement, DrawerContentProps>(
	({ className, side = 'right', ...props }, ref) => (
		<ModalSurface
			ref={ref}
			className={classnames(
				s.content,
				side === 'right' ? s.contentRight : s.contentLeft,
				className
			)}
			closeClassName={s.close}
			{...props}
		/>
	)
)

DrawerContent.displayName = 'DrawerContent'

export { DrawerContent }
