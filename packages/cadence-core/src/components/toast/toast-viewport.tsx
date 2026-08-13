'use client'

import React, { forwardRef, useEffect, useRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import classnames from 'classnames'
import type { ToastViewportProps } from './types'
import s from './toast.module.css'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node
    })
  }
}

const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => {
  const viewportRef = useRef<HTMLElement | null>(null)

  /**
   * The viewport is promoted into the top layer as a manual popover.
   *
   * Without this, `Dialog` regresses toast entirely. A modal `<dialog>` paints in the top
   * layer and inerts everything behind it, but this viewport is rendered inline by
   * `Toaster` — so a toast raised while a dialog is open would render *behind* the
   * backdrop, unreachable and mostly invisible. That is not hypothetical: the failure
   * paths in `admin/users/_components/ban-user-dialog.tsx`, `role-change-dialog.tsx` and
   * `admin/subscribers/_components/remove-subscriber-dialog.tsx` all call `toast()` while
   * their dialog is still open, which is exactly when the user needs to read it.
   *
   * Top-layer ordering follows insertion, so a viewport shown here on mount would sit
   * *below* a dialog opened later. Re-showing it moves it to the top — hence the
   * re-assert below rather than a one-shot call.
   *
   * `popover="manual"` rather than `"auto"`: an auto popover is part of the light-dismiss
   * group and would close on any outside click, taking the toasts with it.
   */
  useEffect(() => {
    const el = viewportRef.current
    // Feature-detected: the Popover API is Baseline Widely Available, so this is a
    // no-op only under jsdom and engines below the floor in docs/adr/0003. There the
    // viewport stays an ordinary inline element, which is what it is today.
    if (!el || typeof el.showPopover !== 'function') return

    // The attribute is set here rather than rendered in JSX, and that matters twice
    // over. A `[popover]` element is `display: none` until shown, so an engine that
    // parses the attribute but cannot show it — jsdom does exactly this — would hide the
    // viewport permanently and take every toast with it. Setting it only where the API
    // exists keeps attribute and capability together. It also keeps the server-rendered
    // markup free of an attribute the client would otherwise have to match.
    el.setAttribute('popover', 'manual')

    const raise = () => {
      try {
        // Re-showing an open popover throws, so drop it first to re-enter the top layer
        // above anything opened since.
        if (el.matches(':popover-open')) el.hidePopover()
        el.showPopover()
      } catch {
        // A popover cannot be shown while the element is disconnected or already
        // transitioning. Losing the promotion is a cosmetic stacking issue, never a
        // reason to take the page down.
      }
    }

    raise()
    // A dialog entering the top layer after us would otherwise cover the viewport.
    document.addEventListener('cds-dialog-open', raise)
    return () => {
      document.removeEventListener('cds-dialog-open', raise)
      try {
        if (el.matches(':popover-open')) el.hidePopover()
      } catch {
        /* unmounting anyway */
      }
    }
  }, [])

  return (
    <ToastPrimitive.Viewport
      ref={composeRefs(ref, viewportRef)}
      className={classnames(s['toast--viewport'], className)}
      {...props}
    />
  )
})

ToastViewport.displayName = 'ToastViewport'

export { ToastViewport }
