import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

const { capture } = vi.hoisted(() => ({ capture: vi.fn() }))

vi.mock('@lib/posthog/capture', () => ({ capture }))

const { TrackArticleRead } = await import('../track-article-read')

/**
 * jsdom has no IntersectionObserver. This stub records the callback so a test
 * can decide when the end of the article comes into view.
 */
let triggerIntersection: (isIntersecting: boolean) => void
let disconnected = false

class MockIntersectionObserver {
	constructor(callback: IntersectionObserverCallback) {
		triggerIntersection = (isIntersecting: boolean) => {
			callback(
				[{ isIntersecting } as IntersectionObserverEntry],
				this as unknown as IntersectionObserver
			)
		}
	}

	observe() {}
	disconnect() {
		disconnected = true
	}
	unobserve() {}
	takeRecords(): IntersectionObserverEntry[] {
		return []
	}
}

const props = {
	slug: 'swing-feel',
	title: 'Swing Feel',
	readingTimeMinutes: 7,
}

describe('TrackArticleRead', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		disconnected = false
		vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
	})

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	it('does not capture on mount', () => {
		render(<TrackArticleRead {...props} />)

		expect(capture).not.toHaveBeenCalled()
	})

	it('does not capture while the end of the article is out of view', () => {
		render(<TrackArticleRead {...props} />)

		triggerIntersection(false)

		expect(capture).not.toHaveBeenCalled()
	})

	it('captures once the end of the article comes into view', () => {
		render(<TrackArticleRead {...props} />)

		triggerIntersection(true)

		expect(capture).toHaveBeenCalledWith('article_read', {
			slug: 'swing-feel',
			title: 'Swing Feel',
			reading_time_minutes: 7,
		})
	})

	it('captures only once, and stops observing afterwards', () => {
		render(<TrackArticleRead {...props} />)

		triggerIntersection(true)
		triggerIntersection(true)

		expect(capture).toHaveBeenCalledTimes(1)
		expect(disconnected).toBe(true)
	})

	it('renders nothing visible', () => {
		const { container } = render(<TrackArticleRead {...props} />)

		expect(container.textContent).toBe('')
		expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(
			'true'
		)
	})

	it('captures nothing when IntersectionObserver is unavailable', () => {
		// Undercounting is the right failure — a fabricated completion would be
		// worse than a missing one.
		vi.stubGlobal('IntersectionObserver', undefined)

		expect(() => render(<TrackArticleRead {...props} />)).not.toThrow()
		expect(capture).not.toHaveBeenCalled()
	})
})
