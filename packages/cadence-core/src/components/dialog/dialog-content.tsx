'use client'

import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { X } from 'cadence-icons'
import s from './dialog.module.css'
import { composeRefs } from '../slot'
import { useDialogContext } from './dialog-context'
import type { DialogContentProps } from './types'

const DialogContent = forwardRef<HTMLDialogElement, DialogContentProps>(
	({ className, children, onClick, onCancel, onClose, ...props }, forwardedRef) => {
		const {
			open,
			setOpen,
			contentId,
			titleId,
			descriptionId,
			hasTitle,
			hasDescription,
			triggerRef,
		} = useDialogContext('DialogContent')

		const dialogRef = useRef<HTMLDialogElement | null>(null)
		const wasOpen = useRef(open)

		useEffect(() => {
			const el = dialogRef.current
			if (!el) return

			// `showModal()` is what puts the element in the top layer and brings focus
			// trapping, `Escape`, `::backdrop` and background inerting with it. The `open`
			// attribute alone does none of that — it renders a *non-modal* dialog — which
			// is also why `open` is never rendered as a JSX prop here: React writing it
			// would make the `showModal()` below throw `InvalidStateError`.
			//
			// The fallback is a real degradation path, not a test shim. Any engine without
			// `HTMLDialogElement` methods gets a visible non-modal dialog rather than an
			// invisible one, which is the right trade under the Baseline floor in
			// docs/adr/0003. In practice the only thing that takes it is jsdom, where it
			// keeps the DOM honest — `open` present means open — so the unit suite can
			// still tell the two states apart. Modality itself is unverifiable there and
			// is proven in `dialog.browser.test.tsx` instead.
			const supportsModal = typeof el.showModal === 'function'

			if (open) {
				if (supportsModal) {
					// Spec-mandated guard: `showModal()` on an already-open dialog throws
					// `InvalidStateError`, and `close()` on a shut one fires a spurious
					// `close` event. Kept deliberately although no test in the suite fails
					// without it — the effect only re-runs when `open` actually changes,
					// so nothing here reaches it today. It is one `useEffect` dependency
					// away from mattering.
					if (!el.open) el.showModal()
				} else {
					el.setAttribute('open', '')
				}
				// Top-layer ordering follows insertion, so anything already promoted —
				// notably the toast viewport — is now underneath this dialog. Announce the
				// entry so those elements can re-assert themselves above it. See
				// `toast/toast-viewport.tsx`.
				document.dispatchEvent(new Event('cds-dialog-open'))
			} else {
				if (supportsModal) {
					if (el.open) el.close()
				} else {
					el.removeAttribute('open')
				}
			}

			// Return focus to whatever opened the dialog. Browsers do this for a modal
			// `<dialog>` already, but only when focus is still inside it — restoring
			// explicitly also covers the fallback path and a consumer moving focus first.
			if (wasOpen.current && !open) triggerRef.current?.focus()
			wasOpen.current = open
		}, [open, triggerRef])

		const handleCancel = useCallback(
			(event: React.SyntheticEvent<HTMLDialogElement>) => {
				onCancel?.(event as React.SyntheticEvent<HTMLDialogElement, Event>)
				if (event.defaultPrevented) return

				// `preventDefault()` is load-bearing, not tidiness. Escape closes the
				// element itself, so without this a controlled dialog whose owner ignores
				// `onOpenChange` would vanish while React still believed it was open — and
				// since `open` never changed, the effect above would never reopen it.
				event.preventDefault()
				setOpen(false)
			},
			[onCancel, setOpen]
		)

		const handleClose = useCallback(
			(event: React.SyntheticEvent<HTMLDialogElement>) => {
				onClose?.(event as React.SyntheticEvent<HTMLDialogElement, Event>)
				// Safety net for any path that closed the element without going through
				// `setOpen` — a nested `<form method="dialog">`, say.
				if (open) setOpen(false)
			},
			[onClose, open, setOpen]
		)

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLDialogElement>) => {
				onClick?.(event)
				if (event.defaultPrevented) return

				// Anything that started on a descendant is content, not backdrop. This
				// also takes care of the (0, 0) click that keyboard activation and
				// implicit form submission synthesise: those originate on the control, so
				// they never reach the hit test below. A separate `event.detail === 0`
				// guard is the usual advice here and was written first — the mutation
				// check showed nothing could reach it, so it is gone rather than kept as
				// decoration.
				if (event.target !== event.currentTarget) return

				// `::backdrop` is not an element, so there is nothing to attach a handler
				// to — the click lands on the `<dialog>` either way. Comparing against the
				// box is what separates backdrop from content: `.content` carries padding,
				// so a click in the padding gutter also targets the dialog itself and the
				// naive `event.target === dialogRef.current` check would close on it.
				const rect = event.currentTarget.getBoundingClientRect()
				const inside =
					event.clientX >= rect.left &&
					event.clientX <= rect.right &&
					event.clientY >= rect.top &&
					event.clientY <= rect.bottom

				if (!inside) setOpen(false)
			},
			[onClick, setOpen]
		)

		return (
			<dialog
				ref={composeRefs(forwardedRef, dialogRef)}
				id={contentId}
				className={classnames(s.content, className)}
				tabIndex={-1}
				aria-labelledby={hasTitle ? titleId : undefined}
				aria-describedby={hasDescription ? descriptionId : undefined}
				onCancel={handleCancel}
				onClose={handleClose}
				onClick={handleClick}
				{...props}
			>
				{/*
				 * Children mount only while open. A native `<dialog>` stays in the DOM
				 * whether or not it is showing, and `admin/users/_components/
				 * user-actions-menu.tsx` mounts three of these per table row — rendering
				 * their forms and selects for every row would be a real cost that the
				 * portalled Radix version never paid.
				 */}
				{open ? (
					<>
						{children}
						<button
							type="button"
							className={s.close}
							aria-label="Close"
							onClick={() => setOpen(false)}
						>
							<X width={24} aria-hidden="true" />
						</button>
					</>
				) : null}
			</dialog>
		)
	}
)

DialogContent.displayName = 'DialogContent'

export { DialogContent }
