'use client'

import React from 'react'
import { ModalRoot } from '../modal'
import type { DialogProps } from './types'

const Dialog = (props: DialogProps) => <ModalRoot {...props} />

Dialog.displayName = 'Dialog'

export { Dialog }
