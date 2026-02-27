import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export type DrawerSide = 'right' | 'left'

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: DrawerSide
}

export interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

export interface DrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export interface DrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export interface DrawerTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

export interface DrawerCloseProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {}

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}
