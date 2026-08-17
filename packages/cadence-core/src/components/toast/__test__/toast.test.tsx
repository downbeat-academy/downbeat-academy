import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import {
	render,
	screen,
	act,
	cleanup,
	within,
	fireEvent,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
	Toast,
	ToastProvider,
	ToastViewport,
	ToastTitle,
	ToastDescription,
	ToastClose,
	ToastAction,
	Toaster,
	useToast,
	toast,
} from '../index'
import s from '../toast.module.css'

/**
 * The regression contract for `Toast`, written against the **current Radix implementation**
 * so a C.1 rewrite has something to satisfy.
 *
 * **`use-toast.ts` keeps its state in a module-level singleton**, so anything routed
 * through `toast()` survives `cleanup()` and leaks into the next test in this file — that
 * was measured, not assumed. Two consequences shape this suite:
 *
 * 1. Everything that can be tested without the singleton is, by rendering the parts
 *    directly with an `open` prop. The reducer's state machine is covered separately and
 *    purely in `use-toast.test.ts`.
 * 2. The `Toaster` integration block drains the singleton in `afterEach` — dismiss
 *    everything, then run the removal queue out with fake timers. Without that, later
 *    tests see earlier tests' toasts.
 *
 * Radix renders the viewport as `region[aria-label="Notifications (F8)"] > ol`, each toast
 * as an `li`, and a separate visually-hidden `span[role="status"]` announcer outside the
 * region. Queries below target roles rather than that structure wherever possible.
 */

// Mirrors TOAST_REMOVE_DELAY in use-toast.ts, which does not export it.
const TOAST_REMOVE_DELAY = 1000000

/**
 * Queries that look for a toast's own text are scoped to the list with `within`.
 *
 * The rebuild announces through a persistent live region in the provider, which holds a
 * copy of the title and description for a second after the toast opens — the same
 * duplication Radix had. A bare `getByText` therefore matches twice. Scoping is the more
 * precise query in any case: a test about the title's class should not depend on what the
 * live region happens to be saying.
 */
const inList = () => within(screen.getByRole('list'))

const Static = ({ children, ...props }: React.ComponentProps<typeof Toast>) => (
	<ToastProvider>
		<Toast open {...props}>
			{children}
		</Toast>
		<ToastViewport />
	</ToastProvider>
)

describe('Toast', () => {
	describe('composition and roles', () => {
		it('renders the viewport as a labelled region containing a list', () => {
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
				</Static>
			)

			expect(
				screen.getByRole('region', { name: /notifications/i })
			).toBeInTheDocument()
			expect(screen.getByRole('list')).toBeInTheDocument()
		})

		it('renders each toast as a list item', () => {
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
					<ToastDescription>Your profile was updated.</ToastDescription>
				</Static>
			)

			const item = screen.getByRole('listitem')
			expect(item).toHaveTextContent('Saved')
			expect(item).toHaveTextContent('Your profile was updated.')
		})

		it('provides a live region for announcements', () => {
			// Radix mounts a visually-hidden announcer outside the viewport. Without it
			// a toast appearing is invisible to a screen reader.
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
				</Static>
			)

			const status = screen.getByRole('status')
			expect(status).toHaveAttribute('aria-live')
		})

		it('makes each toast reachable by keyboard', () => {
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
				</Static>
			)

			expect(screen.getByRole('listitem')).toHaveAttribute('tabindex', '0')
		})

		it('renders nothing in the list when no toast is open', () => {
			render(
				<ToastProvider>
					<ToastViewport />
				</ToastProvider>
			)

			expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
		})
	})

	describe('the close button', () => {
		it('has an accessible name', () => {
			// Regression guard. This button shipped containing only `<X />`, which
			// renders `role="img"` with an undefined `aria-labelledby`, leaving both the
			// svg and the button nameless. Third instance of the same defect after
			// `dialog` and `drawer` (fixed in #312).
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
					<ToastClose />
				</Static>
			)

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
		})

		it('carries the toast-close hook the stylesheet targets', () => {
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
					<ToastClose />
				</Static>
			)

			expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
				'toast-close'
			)
		})

		it('is excluded from the announcement', () => {
			// Rewritten in C.1, not relocated. This asserted
			// `data-radix-toast-announce-exclude` — Radix's own marker, which cannot
			// survive the removal of Radix. The *behaviour* it protected is what matters:
			// a screen reader announcing the toast must not read the dismiss control as
			// part of the message.
			//
			// The rebuild gets there differently. The live region is built from the named
			// title and description parts rather than from the toast's `textContent`, so
			// the close button is excluded by construction and there is no marker to set.
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
					<ToastDescription>Your profile was updated.</ToastDescription>
					<ToastClose />
				</Static>
			)

			const announcement = screen.getByRole('status').textContent ?? ''
			expect(announcement).toContain('Saved')
			expect(announcement).toContain('Your profile was updated.')
			expect(announcement).not.toContain('Close')
		})
	})

	describe('the action', () => {
		it('renders as a button with its label', () => {
			render(
				<Static>
					<ToastTitle>Deleted</ToastTitle>
					<ToastAction altText="Undo the deletion">Undo</ToastAction>
				</Static>
			)

			expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
		})

		it('fires its click handler', async () => {
			const user = userEvent.setup()
			const onClick = vi.fn()
			render(
				<Static>
					<ToastTitle>Deleted</ToastTitle>
					<ToastAction altText="Undo the deletion" onClick={onClick}>
						Undo
					</ToastAction>
				</Static>
			)

			await user.click(screen.getByRole('button', { name: 'Undo' }))

			expect(onClick).toHaveBeenCalledOnce()
		})
	})

	describe('styling hooks', () => {
		// Asserted against the imported CSS-module binding, never a literal — class names
		// are hashed by `generateScopedName` in vite.config.ts.
		it('applies the base class', () => {
			render(
				<Static>
					<ToastTitle>T</ToastTitle>
				</Static>
			)

			expect(screen.getByRole('listitem')).toHaveClass(s['toast--base'])
		})

		it.each(['default', 'success', 'error', 'warning'] as const)(
			'maps variant=%s onto its modifier class',
			(variant) => {
				render(
					<Static variant={variant}>
						<ToastTitle>T</ToastTitle>
					</Static>
				)

				expect(screen.getByRole('listitem')).toHaveClass(
					s[`toast--variant-${variant}`]
				)
			}
		)

		it.each(['from-right', 'from-bottom'] as const)(
			'maps direction=%s onto its modifier class',
			(direction) => {
				render(
					<Static direction={direction}>
						<ToastTitle>T</ToastTitle>
					</Static>
				)

				expect(screen.getByRole('listitem')).toHaveClass(
					s[`toast--direction-${direction}`]
				)
			}
		)

		it('defaults to the default variant and from-bottom direction', () => {
			render(
				<Static>
					<ToastTitle>T</ToastTitle>
				</Static>
			)

			const item = screen.getByRole('listitem')
			expect(item).toHaveClass(s['toast--variant-default'])
			expect(item).toHaveClass(s['toast--direction-from-bottom'])
		})

		it('applies the part classes to title, description, close and viewport', () => {
			render(
				<Static>
					<ToastTitle>Saved</ToastTitle>
					<ToastDescription>Updated.</ToastDescription>
					<ToastClose />
				</Static>
			)

			expect(screen.getByText('Saved')).toHaveClass(s['toast--title'])
			expect(screen.getByText('Updated.')).toHaveClass(s['toast--description'])
			expect(screen.getByRole('button', { name: 'Close' })).toHaveClass(
				s['toast--close']
			)
			expect(screen.getByRole('list')).toHaveClass(s['toast--viewport'])
		})
	})

	describe('className passthrough', () => {
		// Every one of these except `Toast` silently dropped `className` until this
		// slice: each destructured the prop and then never applied it, while still
		// declaring it in the public type. Fixed alongside these tests.
		it('appends a custom className on Toast', () => {
			render(
				<Static className="toast-class">
					<ToastTitle>T</ToastTitle>
				</Static>
			)

			const item = screen.getByRole('listitem')
			expect(item).toHaveClass('toast-class')
			expect(item).toHaveClass(s['toast--base'])
		})

		it('appends a custom className on ToastViewport', () => {
			render(
				<ToastProvider>
					<Toast open>
						<ToastTitle>T</ToastTitle>
					</Toast>
					<ToastViewport className="viewport-class" />
				</ToastProvider>
			)

			const list = screen.getByRole('list')
			expect(list).toHaveClass('viewport-class')
			expect(list).toHaveClass(s['toast--viewport'])
		})

		it('appends a custom className on ToastTitle', () => {
			render(
				<Static>
					<ToastTitle className="title-class">Saved</ToastTitle>
				</Static>
			)

			const title = inList().getByText('Saved')
			expect(title).toHaveClass('title-class')
			expect(title).toHaveClass(s['toast--title'])
		})

		it('appends a custom className on ToastDescription', () => {
			render(
				<Static>
					<ToastTitle>T</ToastTitle>
					<ToastDescription className="desc-class">Updated.</ToastDescription>
				</Static>
			)

			const desc = inList().getByText('Updated.')
			expect(desc).toHaveClass('desc-class')
			expect(desc).toHaveClass(s['toast--description'])
		})

		it('appends a custom className on ToastClose', () => {
			render(
				<Static>
					<ToastTitle>T</ToastTitle>
					<ToastClose className="close-class" />
				</Static>
			)

			const close = screen.getByRole('button', { name: 'Close' })
			expect(close).toHaveClass('close-class')
			expect(close).toHaveClass(s['toast--close'])
		})

		it('applies a custom className on ToastAction', () => {
			render(
				<Static>
					<ToastTitle>T</ToastTitle>
					<ToastAction altText="Undo" className="action-class">
						Undo
					</ToastAction>
				</Static>
			)

			expect(screen.getByRole('button', { name: 'Undo' })).toHaveClass(
				'action-class'
			)
		})
	})

	describe('ref forwarding', () => {
		it('forwards a ref to the toast element', () => {
			const ref = React.createRef<HTMLLIElement>()
			render(
				<ToastProvider>
					<Toast open ref={ref}>
						<ToastTitle>T</ToastTitle>
					</Toast>
					<ToastViewport />
				</ToastProvider>
			)

			expect(ref.current).toBe(screen.getByRole('listitem'))
		})

		it('forwards a ref to the viewport, title, description and close', () => {
			const viewport = React.createRef<HTMLOListElement>()
			const title = React.createRef<HTMLDivElement>()
			const description = React.createRef<HTMLDivElement>()
			const close = React.createRef<HTMLButtonElement>()
			render(
				<ToastProvider>
					<Toast open>
						<ToastTitle ref={title}>Saved</ToastTitle>
						<ToastDescription ref={description}>Updated.</ToastDescription>
						<ToastClose ref={close} />
					</Toast>
					<ToastViewport ref={viewport} />
				</ToastProvider>
			)

			expect(viewport.current).toBe(screen.getByRole('list'))
			expect(title.current).toHaveTextContent('Saved')
			expect(description.current).toHaveTextContent('Updated.')
			expect(close.current).toBe(screen.getByRole('button', { name: 'Close' }))
		})
	})

	describe('display names', () => {
		// Set by hand already rather than copied off the Radix primitive, which is why
		// the 1.1.23 bump that emptied thirteen of those (fixed in #312) left toast
		// alone. Asserted so it stays that way.
		it.each([
			[Toast, 'Toast'],
			[ToastViewport, 'ToastViewport'],
			[ToastTitle, 'ToastTitle'],
			[ToastDescription, 'ToastDescription'],
			[ToastClose, 'ToastClose'],
			[ToastAction, 'ToastAction'],
		] as const)('is set on %o', (Component, expected) => {
			expect((Component as { displayName?: string }).displayName).toBe(expected)
		})
	})

	/**
	 * Everything below goes through the module singleton in `use-toast.ts`, so each test
	 * drains it afterwards. Titles are unique per test as a second line of defence.
	 */
	describe('Toaster and the toast() queue', () => {
		afterEach(() => {
			// Unmount first so no listener is left holding a reference, then dismiss
			// everything and run the removal queue out. Without this the module keeps
			// dismissed toasts for TOAST_REMOVE_DELAY and they surface in later tests.
			//
			// The capture below deliberately avoids `useEffect`: `useToast()` returns a
			// fresh `dismiss` identity on every render, so `useEffect(() => dismiss(),
			// [dismiss])` re-fires on the state change it causes and loops until the
			// worker dies. That is not hypothetical — it crashed the run.
			cleanup()
			let dismissAll: ((id?: string) => void) | null = null
			const Capture = () => {
				dismissAll = useToast().dismiss
				return null
			}
			const { unmount } = render(<Capture />)

			vi.useFakeTimers()
			act(() => {
				dismissAll?.()
			})
			act(() => {
				vi.advanceTimersByTime(TOAST_REMOVE_DELAY + 1)
			})
			vi.useRealTimers()
			unmount()
		})

		it('renders a toast pushed through toast()', () => {
			render(<Toaster />)

			act(() => {
				toast({ title: 'Profile saved', description: 'All good.' })
			})

			expect(screen.getByText('Profile saved')).toBeInTheDocument()
			expect(screen.getByText('All good.')).toBeInTheDocument()
		})

		it('starts empty', () => {
			// Guards the drain above. If this fails, the singleton is leaking and every
			// assertion in this block is suspect.
			render(<Toaster />)

			expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
		})

		it('gives each toast a close button', () => {
			render(<Toaster />)

			act(() => {
				toast({ title: 'Closable toast' })
			})

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
		})

		it('removes a toast from view when dismissed', () => {
			render(<Toaster />)
			let handle: { dismiss: () => void }
			act(() => {
				handle = toast({ title: 'Dismiss me' })
			})
			expect(inList().getByText('Dismiss me')).toBeInTheDocument()

			act(() => {
				handle.dismiss()
			})

			// The element unmounts outright rather than lingering as
			// `data-state="closed"`, because `Toaster` renders no `forceMount` and
			// dismissal sets `open: false`. The entry stays in the reducer's array for
			// TOAST_REMOVE_DELAY regardless — see `use-toast.test.ts`. A C.1 rewrite that
			// wants an exit animation has to keep the node mounted, which this does not.
			expect(inList().queryByText('Dismiss me')).not.toBeInTheDocument()
			expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
		})

		it('updates a toast in place through its handle', () => {
			render(<Toaster />)
			let handle: { id: string; update: (p: never) => void }
			act(() => {
				handle = toast({ title: 'Before update' })
			})

			act(() => {
				handle.update({ id: handle.id, title: 'After update' } as never)
			})

			expect(inList().getByText('After update')).toBeInTheDocument()
			expect(inList().queryByText('Before update')).not.toBeInTheDocument()
		})

		it('renders oldest-first in the DOM even though the queue is newest-first', () => {
			// The single most surprising thing about this component, and the one a
			// rewrite is most likely to get wrong.
			//
			// The reducer *prepends*, so `toasts[0]` is the newest — pinned in
			// `use-toast.test.ts`. `Toaster` maps that array straight through, newest
			// first. But Radix's Viewport reverses on render, so **DOM order is
			// oldest-first**. Screen readers and sequential keyboard navigation
			// therefore reach the oldest toast first, while CSS positions the stack
			// visually.
			//
			// Verified against the real markup, not inferred. A C.1 rewrite that simply
			// maps the array in order will silently flip this.
			render(<Toaster />)

			act(() => {
				toast({ title: 'Older notice' })
			})
			act(() => {
				toast({ title: 'Newer notice' })
			})

			const items = screen.getAllByRole('listitem')
			expect(items).toHaveLength(2)
			expect(items[0]).toHaveTextContent('Older notice')
			expect(items[1]).toHaveTextContent('Newer notice')
		})

		it('renders an action supplied through toast()', () => {
			render(<Toaster />)

			act(() => {
				toast({
					title: 'Deleted item',
					action: (
						<ToastAction altText="Undo the deletion">Undo it</ToastAction>
					) as never,
				})
			})

			expect(
				screen.getByRole('button', { name: 'Undo it' })
			).toBeInTheDocument()
		})
	})

	describe('auto-dismiss timing', () => {
		/**
		 * Timer behaviour lives here, in jsdom with fake timers, rather than in the browser
		 * project — deliberately, and against the usual instinct that "real clock" work belongs
		 * in a real browser.
		 *
		 * Two things forced it. Playwright's `hover` waits for the element to be visible,
		 * stable and receiving pointer events before dispatching anything, and under CI load
		 * that wait outlived the toast's own `duration`: the toast dismissed itself mid-wait,
		 * the locator went stale, and hover retried a detached node until the 15s timeout.
		 * Lengthening the duration only widens that race, because the wait is unbounded and the
		 * lifetime is not. Driving the events by hand instead was worse — a dispatched
		 * `pointerover` does not reach React's `onPointerEnter` through the portal, so the specs
		 * passed with `onPointerEnter` deleted from the component. Vacuous, and caught by
		 * mutating it.
		 *
		 * What is actually under test is our own timer arithmetic: plain React state and
		 * `setTimeout`. jsdom drives React's synthetic events reliably and fake timers make the
		 * clock exact, so the coverage is stronger here, not weaker. The browser project keeps
		 * what genuinely needs an engine — real-clock dismissal, focus, F8, the top layer.
		 */
		const Timed = ({ duration }: { duration?: number }) => {
			const [open, setOpen] = React.useState(true)
			return (
				<ToastProvider>
					<Toast open={open} duration={duration} onOpenChange={setOpen}>
						<ToastTitle>Saved</ToastTitle>
					</Toast>
					<ToastViewport />
				</ToastProvider>
			)
		}

		const item = () => screen.queryByRole('listitem')

		it('dismisses itself once its duration elapses', () => {
			vi.useFakeTimers()
			try {
				render(<Timed duration={1000} />)
				expect(item()).toBeInTheDocument()

				act(() => {
					vi.advanceTimersByTime(999)
				})
				expect(item()).toBeInTheDocument()

				act(() => {
					vi.advanceTimersByTime(1)
				})
				expect(item()).not.toBeInTheDocument()
			} finally {
				vi.useRealTimers()
			}
		})

		it('pauses while the pointer is over it', () => {
			vi.useFakeTimers()
			try {
				render(<Timed duration={1000} />)
				const toast = screen.getByRole('listitem')

				act(() => {
					vi.advanceTimersByTime(400)
				})
				fireEvent.pointerEnter(toast)

				// Well past the full duration. A toast that expires under the pointer is a
				// message the reader loses halfway through.
				act(() => {
					vi.advanceTimersByTime(5000)
				})
				expect(item()).toBeInTheDocument()
			} finally {
				vi.useRealTimers()
			}
		})

		it('resumes with the remaining time, not a fresh duration', () => {
			vi.useFakeTimers()
			try {
				render(<Timed duration={1000} />)
				const toast = screen.getByRole('listitem')

				act(() => {
					vi.advanceTimersByTime(700)
				})
				fireEvent.pointerEnter(toast)
				act(() => {
					vi.advanceTimersByTime(5000)
				})
				fireEvent.pointerLeave(toast)

				// 300ms was left when the pointer arrived, and 300ms is what should be left when
				// it goes. Restarting the full second here would be the easy bug to write.
				act(() => {
					vi.advanceTimersByTime(299)
				})
				expect(item()).toBeInTheDocument()

				act(() => {
					vi.advanceTimersByTime(1)
				})
				expect(item()).not.toBeInTheDocument()
			} finally {
				vi.useRealTimers()
			}
		})

		it('pauses while focus is inside it', () => {
			vi.useFakeTimers()
			try {
				render(<Timed duration={1000} />)
				fireEvent.focus(screen.getByRole('listitem'))

				act(() => {
					vi.advanceTimersByTime(5000)
				})
				expect(item()).toBeInTheDocument()
			} finally {
				vi.useRealTimers()
			}
		})

		it('never dismisses when the duration is Infinity', () => {
			vi.useFakeTimers()
			try {
				render(<Timed duration={Infinity} />)
				act(() => {
					vi.advanceTimersByTime(60_000)
				})
				expect(item()).toBeInTheDocument()
			} finally {
				vi.useRealTimers()
			}
		})
	})
})
