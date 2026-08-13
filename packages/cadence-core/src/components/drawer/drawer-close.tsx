'use client'

import React, { forwardRef } from 'react'
import { ModalClose } from '../modal'
import type { DrawerCloseProps } from './types'

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
	(props, ref) => <ModalClose ref={ref} {...props} />
)

DrawerClose.displayName = 'DrawerClose'

export { DrawerClose }
