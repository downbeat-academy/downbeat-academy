import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

const { capture } = vi.hoisted(() => ({ capture: vi.fn() }))

vi.mock('@lib/posthog/capture', () => ({ capture }))

const { TrackContentView } = await import('../track-content-view')

describe('TrackContentView', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('captures the event once on mount', () => {
		render(
			<TrackContentView
				event="article_viewed"
				slug="swing-feel"
				title="Swing Feel"
			/>
		)

		expect(capture).toHaveBeenCalledTimes(1)
		expect(capture).toHaveBeenCalledWith('article_viewed', {
			slug: 'swing-feel',
			title: 'Swing Feel',
		})
	})

	it('does not re-capture when the component re-renders with the same content', () => {
		const { rerender } = render(
			<TrackContentView
				event="article_viewed"
				slug="swing-feel"
				title="Swing Feel"
			/>
		)

		rerender(
			<TrackContentView
				event="article_viewed"
				slug="swing-feel"
				title="Swing Feel"
			/>
		)

		expect(capture).toHaveBeenCalledTimes(1)
	})

	it('captures again when the reader navigates to different content', () => {
		// App Router reuses this component across navigations within the same
		// route, so a plain "already fired" boolean would silently swallow every
		// article after the first.
		const { rerender } = render(
			<TrackContentView
				event="article_viewed"
				slug="swing-feel"
				title="Swing Feel"
			/>
		)

		rerender(
			<TrackContentView
				event="article_viewed"
				slug="tritone-substitution"
				title="Tritone Substitution"
			/>
		)

		expect(capture).toHaveBeenCalledTimes(2)
		expect(capture).toHaveBeenLastCalledWith('article_viewed', {
			slug: 'tritone-substitution',
			title: 'Tritone Substitution',
		})
	})

	it('carries the event name it was given', () => {
		render(
			<TrackContentView
				event="lexicon_term_viewed"
				slug="ii-v-i"
				title="Miles Davis - Kind of Blue - So What"
			/>
		)

		expect(capture).toHaveBeenCalledWith('lexicon_term_viewed', {
			slug: 'ii-v-i',
			title: 'Miles Davis - Kind of Blue - So What',
		})
	})
})
