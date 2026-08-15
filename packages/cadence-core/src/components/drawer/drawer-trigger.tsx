'use client'

import React, { forwardRef } from 'react'
import { ModalTrigger } from '../modal'
import type { DrawerTriggerProps } from './types'

const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
	(props, ref) => <ModalTrigger ref={ref} {...props} />
)

DrawerTrigger.displayName = 'DrawerTrigger'

export { DrawerTrigger }
