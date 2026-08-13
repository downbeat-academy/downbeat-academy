'use client'

import React from 'react'
import { ModalRoot } from '../modal'
import type { DrawerProps } from './types'

const Drawer = (props: DrawerProps) => <ModalRoot {...props} />

Drawer.displayName = 'Drawer'

export { Drawer }
