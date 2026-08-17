'use client'

import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'
import { ToastItemContext, useToastProvider } from './toast-context'
import type { ToastProps } from './types'
import s from './toast.module.css'

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') ref(node)
			else if (ref) (ref as React.MutableRefObject<T | null>).current = node
		})
	}
}

/**
 * Text a screen reader should hear.
 *
 * Title and description only — never the close button, which is why the announcement is
 * built from named parts rather than from `root.textContent`. An action's `altText` is
 * appended, because it describes how to do the same thing without the button.
 */
function announcementText(root: HTMLElement): string {
	const parts: string[] = []
	root
		.querySelectorAll<HTMLElement>(
			`.${s['toast--title']}, .${s['toast--description']}`
		)
		.forEach((el) => {
			const text = el.textContent?.trim()
			if (text) parts.push(text)
		})
	root.querySelectorAll<HTMLElement>('[data-toast-alt-text]').forEach((el) => {
		const alt = el.getAttribute('data-toast-alt-text')?.trim()
		if (alt) parts.push(alt)
	})
	return parts.join('. ')
}

const Toast = forwardRef<HTMLLIElement, ToastProps>(
	(
		{
			variant = 'default',
			direction = 'from-bottom',
			className,
			open = true,
			onOpenChange,
			duration: durationProp,
			type = 'background',
			children,
			style,
			onPointerDown,
			onPointerMove,
			onPointerUp,
			...rest
		},
		ref
	) => {
		const provider = useToastProvider()
		const duration = durationProp ?? provider.duration

		const itemRef = useRef<HTMLLIElement | null>(null)
		const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
		const remaining = useRef(duration)
		const startedAt = useRef(0)
		const [swipeDelta, setSwipeDelta] = useState(0)
		const swipeStart = useRef<number | null>(null)

		const close = useCallback(() => {
			onOpenChange?.(false)
		}, [onOpenChange])

		const clearTimer = useCallback(() => {
			if (timer.current) clearTimeout(timer.current)
			timer.current = null
		}, [])

		const resume = useCallback(() => {
			clearTimer()
			// `Infinity` is the documented way to pin a toast open — an error the user has
			// to acknowledge should not evaporate on its own.
			if (!open || duration === Infinity || duration <= 0) return
			startedAt.current = Date.now()
			timer.current = setTimeout(close, remaining.current)
		}, [clearTimer, close, duration, open])

		const pause = useCallback(() => {
			if (!timer.current) return
			clearTimer()
			// Bank the time already served, so hovering does not silently restart the
			// countdown each time the pointer crosses the toast.
			remaining.current = Math.max(
				0,
				remaining.current - (Date.now() - startedAt.current)
			)
		}, [clearTimer])

		// Restart cleanly whenever the toast reopens or its duration changes.
		useEffect(() => {
			remaining.current = duration
			resume()
			return clearTimer
		}, [duration, open, resume, clearTimer])

		/**
		 * A toast that times out while the tab is hidden is a message the user never saw.
		 *
		 * `visibilitychange` only — deliberately not `window` blur/focus. Blur fires when
		 * another *application* takes focus, and the toast is still on screen then, so
		 * pausing is over-eager. It also made the component untestable in CI, where a
		 * headless browser window is frequently unfocused: the countdown paused on a blur
		 * that never had a matching focus, and a 300ms toast was still on screen five
		 * seconds later. Tab visibility is the condition that actually means "not seen".
		 */
		useEffect(() => {
			const onVisibility = () => {
				if (document.visibilityState === 'hidden') pause()
				else resume()
			}
			document.addEventListener('visibilitychange', onVisibility)
			return () => {
				document.removeEventListener('visibilitychange', onVisibility)
			}
		}, [pause, resume])

		// Publish to the shared live region once, on open, reading from the rendered DOM so
		// whatever the consumer composed is what gets announced.
		useEffect(() => {
			if (!open) return
			const el = itemRef.current
			if (!el) return
			// `foreground` interrupts, `background` waits for a pause. A destructive-action
			// confirmation and a "saved" acknowledgement should not be announced the same way.
			provider.announce(
				announcementText(el),
				type === 'foreground' ? 'assertive' : 'polite'
			)
			// Deliberately not depending on `provider`: the callback is stable, and
			// including the whole context value would re-announce on any provider re-render.
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [open, type])

		const horizontal =
			provider.swipeDirection === 'left' || provider.swipeDirection === 'right'

		const handlePointerDown = useCallback(
			(event: React.PointerEvent<HTMLLIElement>) => {
				onPointerDown?.(event)
				// Touch and pen only. Dragging with a mouse is not a dismiss gesture, and
				// treating it as one makes text selection impossible.
				if (event.pointerType === 'mouse') return
				swipeStart.current = horizontal ? event.clientX : event.clientY
			},
			[onPointerDown, horizontal]
		)

		const handlePointerMove = useCallback(
			(event: React.PointerEvent<HTMLLIElement>) => {
				onPointerMove?.(event)
				if (swipeStart.current === null) return
				const current = horizontal ? event.clientX : event.clientY
				const delta = current - swipeStart.current
				const forward =
					provider.swipeDirection === 'right' ||
					provider.swipeDirection === 'down'
				// Only track movement in the dismiss direction, so the toast cannot be
				// dragged away from where it will leave.
				setSwipeDelta(forward ? Math.max(0, delta) : Math.min(0, delta))
			},
			[onPointerMove, horizontal, provider.swipeDirection]
		)

		const handlePointerUp = useCallback(
			(event: React.PointerEvent<HTMLLIElement>) => {
				onPointerUp?.(event)
				if (swipeStart.current === null) return
				swipeStart.current = null
				if (Math.abs(swipeDelta) >= provider.swipeThreshold) close()
				else setSwipeDelta(0)
			},
			[onPointerUp, swipeDelta, provider.swipeThreshold, close]
		)

		// Declared with every other hook, above the `open` early return — a hook after it
		// would run conditionally.
		const itemValue = useMemo(() => ({ close }), [close])

		if (!open) return null

		const classes = classnames([
			s['toast--base'],
			s['toast--variant-' + variant],
			s['toast--direction-' + direction],
			className,
		])

		const item = (
			<li
				ref={composeRefs(ref, itemRef)}
				// Implicit `listitem` role is kept rather than overridden with
				// `role="status"`: the viewport is a real list, and the live region is a
				// separate persistent node in the provider. Putting `role="status"` here
				// would silently remove this from the list.
				tabIndex={0}
				data-state="open"
				data-variant={variant}
				data-swiping={swipeStart.current !== null ? '' : undefined}
				className={classes}
				style={{
					...style,
					...(swipeDelta !== 0
						? {
								transform: horizontal
									? `translateX(${swipeDelta}px)`
									: `translateY(${swipeDelta}px)`,
								transition: 'none',
							}
						: null),
				}}
				// Pause on hover and on focus. A toast that expires while being read, or
				// while the user is tabbing towards its action, is a bug rather than a
				// timing preference.
				onPointerEnter={pause}
				onPointerLeave={resume}
				onFocus={pause}
				onBlur={resume}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerUp}
				{...rest}
			>
				<ToastItemContext.Provider value={itemValue}>
					{children}
				</ToastItemContext.Provider>
			</li>
		)

		// Portalled into the viewport's `<ol>`, because the documented composition puts
		// `<Toast>` as a sibling of `<ToastViewport>` rather than inside it. Rendering in
		// place would leave a bare `<li>` outside any list: invalid HTML, an axe
		// `listitem` violation, and no list semantics at all.
		//
		// Before the viewport has mounted there is nowhere to portal to, so the toast
		// renders in place for that one commit rather than disappearing.
		return provider.viewportElement
			? createPortal(item, provider.viewportElement)
			: item
	}
)

Toast.displayName = 'Toast'

export { Toast }
