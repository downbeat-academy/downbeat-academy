'use client'

import React, { forwardRef } from 'react'
import { ModalClose } from '../modal'
import type { DialogCloseProps } from './types'

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
	(props, ref) => <ModalClose ref={ref} {...props} />
)

DialogClose.displayName = 'DialogClose'

export { DialogClose }
