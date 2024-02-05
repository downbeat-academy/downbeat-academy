"use client"

import { Toast } from "./toast"
import { ToastProvider } from "./primitives/toast-provider"
import { ToastViewport } from "./primitives/toast-viewport"
import { ToastClose } from "./primitives/toast-close"
import { ToastTitle } from "./primitives/toast-title"
import { ToastDescription } from "./primitives/toast-description"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}