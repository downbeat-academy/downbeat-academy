'use client'

import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type DrawerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

const Drawer = (props: DrawerProps) => (
  <DialogPrimitive.Root {...props} />
)

Drawer.displayName = 'Drawer'

const DrawerPortal = DialogPrimitive.Portal

export { Drawer, DrawerPortal }
