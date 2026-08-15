'use client'

import React, { forwardRef } from 'react'
import { ModalTrigger } from '../modal'
import type { DialogTriggerProps } from './types'

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
	(props, ref) => <ModalTrigger ref={ref} {...props} />
)

DialogTrigger.displayName = 'DialogTrigger'

export { DialogTrigger }
