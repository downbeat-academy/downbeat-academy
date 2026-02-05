'use client'

import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type DialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

const Dialog = (props: DialogProps) => (
  <DialogPrimitive.Root {...props} />
)

Dialog.displayName = 'Dialog'

const DialogPortal = DialogPrimitive.Portal

export { Dialog, DialogPortal }
