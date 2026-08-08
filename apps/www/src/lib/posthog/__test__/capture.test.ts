import { beforeEach, describe, expect, it, vi } from 'vitest'

const { posthogCapture } = vi.hoisted(() => ({ posthogCapture: vi.fn() }))

vi.mock('posthog-js', () => ({ default: { capture: posthogCapture } }))

const { capture } = await import('../capture')

describe('capture', () => {
	beforeEach(() => {
		posthogCapture.mockClear()
	})

	it('forwards an event with no properties', () => {
		capture('contact_form_submitted')

		expect(posthogCapture).toHaveBeenCalledWith(
			'contact_form_submitted',
			undefined
		)
	})

	it('forwards an event with its properties', () => {
		capture('newsletter_subscribed', { source: 'newsletter_page' })

		expect(posthogCapture).toHaveBeenCalledWith('newsletter_subscribed', {
			source: 'newsletter_page',
		})
	})

	it('does not mutate or drop properties', () => {
		capture('article_read', {
			slug: 'swing-feel',
			title: 'Swing Feel',
			reading_time_minutes: 7,
		})

		expect(posthogCapture).toHaveBeenCalledWith('article_read', {
			slug: 'swing-feel',
			title: 'Swing Feel',
			reading_time_minutes: 7,
		})
	})
})
