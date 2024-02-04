import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import classnames from 'classnames'
import { XCircleOutline } from "cadence-icons"
import s from './toast.module.scss'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={s['toast--viewport']}
    {...props}
  />
))

ToastViewport.displayName = ToastPrimitives.Viewport.displayName

// Toast Base

// type TypeProps = {
//   type?: 'default' | 'success' | 'error' | 'warning'
// }

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({
  type = 'default',
  className,
  ...props
}, ref) => {

  const classes = classnames([
    s['toast--base'],
    s['toast--type-' + type],
    className,
  ])

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={classes}
      {...props}
    />
  )
})

Toast.displayName = ToastPrimitives.Root.displayName

// Action

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    {...props}
  />
))

ToastAction.displayName = ToastPrimitives.Action.displayName

// Close

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    toast-close=""
    {...props}
  >
    <XCircleOutline width={16} />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

// Title

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={s['toast--title']}
    {...props}
  />
))

ToastTitle.displayName = ToastPrimitives.Title.displayName

// Description

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={s['toast--description']}
    {...props}
  />
))

ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}