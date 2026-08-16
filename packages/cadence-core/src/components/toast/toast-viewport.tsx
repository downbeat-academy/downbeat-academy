'use client'

import React, { forwardRef, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { useToastProvider } from './toast-context'
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

const ToastViewport = forwardRef<HTMLOListElement, ToastViewportProps>(
	({ className, children, ...props }, ref) => {
		const { label, setViewportElement } = useToastProvider()
		const listRef = useRef<HTMLOListElement | null>(null)
		const regionRef = useRef<HTMLDivElement | null>(null)

		/**
		 * The viewport is promoted into the top layer as a manual popover.
		 *
		 * This keeps toasts above ordinary stacked page content, whatever `z-index` that
		 * content claims, and it is covered by a passing spec.
		 *
		 * **It does not put a toast above a modal `<dialog>`, despite what task B.1b
		 * concluded.** A modal dialog paints above a manual popover regardless of insertion
		 * order — opening one makes everything outside it inert, and an inert top-layer
		 * element renders below the modal. Re-asserting on `cds-dialog-open` cannot beat
		 * that; measured directly in Chromium, WebKit and Firefox in C.1, which wrote the
		 * first test that checked. Recorded in `docs/adr/0002-known-gaps.md`; do not delete
		 * that entry on the strength of this code existing.
		 *
		 * The `cds-dialog-open` listener is kept because it costs nothing and is the hook a
		 * real fix would use. `popover="manual"` rather than `"auto"`: an auto popover joins
		 * the light-dismiss group and would close on any outside click, taking the toasts
		 * with it.
		 */
		useEffect(() => {
			const el = listRef.current
			// Feature-detected: a no-op under jsdom and below the floor in ADR-0003. There
			// the viewport stays an ordinary inline element, which is what it already was.
			if (!el || typeof el.showPopover !== 'function') return

			// Set here rather than rendered in JSX. A `[popover]` element is `display: none`
			// until shown, so an engine that parses the attribute without implementing the
			// API — jsdom does exactly this — would hide the viewport permanently and take
			// every toast with it.
			el.setAttribute('popover', 'manual')

			const raise = () => {
				try {
					// Re-showing an open popover throws, so drop it first to re-enter the top
					// layer above anything opened since.
					if (el.matches(':popover-open')) el.hidePopover()
					el.showPopover()
				} catch {
					// A popover cannot be shown while disconnected or transitioning. Losing
					// the promotion is a stacking issue, never a reason to take the page down.
				}
			}

			raise()
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

		/**
		 * F8 moves focus to the notifications region.
		 *
		 * The shortcut is named in the region's own accessible label, so it has to exist —
		 * a label promising a hotkey that does nothing is worse than no hotkey.
		 */
		useEffect(() => {
			const onKeyDown = (event: KeyboardEvent) => {
				if (event.key !== 'F8') return
				const region = regionRef.current
				if (!region) return
				event.preventDefault()
				region.focus()
			}
			document.addEventListener('keydown', onKeyDown)
			return () => document.removeEventListener('keydown', onKeyDown)
		}, [])

		return (
			<div
				ref={regionRef}
				role="region"
				aria-label={label}
				// Focusable only programmatically: F8 and the close/action buttons are the
				// ways in, and putting the whole region in the tab order would make every
				// keyboard user tab through it on every page.
				tabIndex={-1}
			>
				<ol
					ref={composeRefs(ref, listRef, setViewportElement)}
					className={classnames(s['toast--viewport'], className)}
					{...props}
				>
					{children}
				</ol>
			</div>
		)
	}
)

ToastViewport.displayName = 'ToastViewport'

export { ToastViewport }
