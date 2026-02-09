'use client'

import React from 'react'
import { Toast } from './toast'
import { ToastProvider } from './toast-provider'
import { ToastViewport } from './toast-viewport'
import { ToastClose } from './toast-close'
import { ToastTitle } from './toast-title'
import { ToastDescription } from './toast-description'
import { useToast } from './use-toast'

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
