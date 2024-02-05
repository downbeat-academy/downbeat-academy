import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import classnames from 'classnames'
import s from './toast.module.scss'

type ToastVariant = 'default' | 'success' | 'error' | 'warning';

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
    variant?: ToastVariant
  }
>(({
  variant = 'default',
  className,
  ...props
}, ref) => {

  const classes = classnames([
    s['toast--base'],
    s['toast--variant-' + variant],
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

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

export { Toast, type ToastProps }