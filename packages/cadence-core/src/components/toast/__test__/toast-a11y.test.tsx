import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
	Toast,
	ToastProvider,
	ToastViewport,
	ToastTitle,
	ToastDescription,
	ToastClose,
	ToastAction,
} from '../index'
import { axeViolations } from '../../../test-utils'

/**
 * Axe coverage for the current Radix implementation, so a C.1 rewrite has a baseline.
 *
 * **Every assertion passes `document.body`, never the `container` that `render()`
 * returns.** Radix portals the viewport, and mounts its visually-hidden `role="status"`
 * announcer outside it entirely — so a `container`-rooted axe call inspects almost none of
 * the component. That is the same trap the `dialog` slice measured, where `container`
 * reported zero violations on a dialog that had two.
 *
 * These tests are written against the composed parts rather than `Toaster`, because
 * `Toaster` routes through the module-level singleton in `use-toast.ts` and would leak
 * state between cases. `toast.test.tsx` covers that path with an explicit drain.
 *
 * `axeViolations` disables `color-contrast` permanently — jsdom has no layout engine, so
 * the rule can only false-pass. The variant colours are checked in the Storybook a11y
 * panel instead, which matters here: `error` and `warning` are the two most likely to fail
 * real contrast.
 */

describe('Toast accessibility', () => {
	it('has no axe violations with a title and description', async () => {
		render(
			<ToastProvider>
				<Toast open>
					<ToastTitle>Profile saved</ToastTitle>
					<ToastDescription>Your changes are live.</ToastDescription>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations with a title alone', async () => {
		render(
			<ToastProvider>
				<Toast open>
					<ToastTitle>Saved</ToastTitle>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations with an action', async () => {
		render(
			<ToastProvider>
				<Toast open>
					<ToastTitle>Item deleted</ToastTitle>
					<ToastDescription>The track was removed.</ToastDescription>
					<ToastAction altText="Undo deleting the track">Undo</ToastAction>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it.each(['default', 'success', 'error', 'warning'] as const)(
		'has no axe violations for variant=%s',
		async (variant) => {
			render(
				<ToastProvider>
					<Toast open variant={variant}>
						<ToastTitle>Notice</ToastTitle>
						<ToastDescription>Something happened.</ToastDescription>
						<ToastClose />
					</Toast>
					<ToastViewport />
				</ToastProvider>
			)

			expect(await axeViolations(document.body)).toEqual([])
		}
	)

	it('has no axe violations with several toasts stacked', async () => {
		render(
			<ToastProvider>
				<Toast open>
					<ToastTitle>First</ToastTitle>
					<ToastClose />
				</Toast>
				<Toast open>
					<ToastTitle>Second</ToastTitle>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('has no axe violations with an empty viewport', async () => {
		render(
			<ToastProvider>
				<ToastViewport />
			</ToastProvider>
		)

		expect(await axeViolations(document.body)).toEqual([])
	})

	it('gives the built-in close button an accessible name', async () => {
		// The regression this suite caught, and the third instance of the same defect
		// after `dialog` and `drawer` (both fixed in #312). `ToastClose` renders only
		// `<X />`, and `cadence-icons`' X sets `role="img"` with
		// `aria-labelledby={titleId}` — undefined unless a title is passed, so React
		// omits it. That left the svg nameless under `svg-img-alt` and the button
		// nameless under `button-name`, on all 24 toast consumer surfaces.
		render(
			<ToastProvider>
				<Toast open>
					<ToastTitle>Named close</ToastTitle>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		)

		expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
		expect(await axeViolations(document.body)).toEqual([])
	})
})
