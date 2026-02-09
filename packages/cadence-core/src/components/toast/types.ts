import React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'
export type ToastDirection = 'from-right' | 'from-bottom'

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant
  direction?: ToastDirection
}

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {}

export interface ToastTitleProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {}

export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {}

export interface ToastCloseProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {}

export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {}

export type ToastActionElement = React.ReactElement<typeof ToastPrimitive.Action>
