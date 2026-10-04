import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { contactsCreate } = vi.hoisted(() => ({ contactsCreate: vi.fn() }))

vi.mock('resend', () => ({
	Resend: vi.fn(function () {
		return { contacts: { create: contactsCreate } }
	}),
}))

import { subscribeToNewsletter } from '../newsletter-subscription'

describe('subscribeToNewsletter', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('throws when the segment is not configured', async () => {
		vi.stubEnv('RESEND_SEGMENT_ID', '')
		await expect(
			subscribeToNewsletter({ email: 'user@example.com' })
		).rejects.toThrow('RESEND_SEGMENT_ID not configured')
		expect(contactsCreate).not.toHaveBeenCalled()
	})

	it('creates a contact in the configured segment', async () => {
		vi.stubEnv('RESEND_SEGMENT_ID', 'seg_123')
		contactsCreate.mockResolvedValueOnce({ data: { id: 'c1' }, error: null })
		await subscribeToNewsletter({ email: 'user@example.com' })
		expect(contactsCreate).toHaveBeenCalledWith({
			email: 'user@example.com',
			unsubscribed: false,
			segments: [{ id: 'seg_123' }],
		})
	})

	it('throws a friendly error when the API call rejects', async () => {
		vi.stubEnv('RESEND_SEGMENT_ID', 'seg_123')
		contactsCreate.mockRejectedValueOnce(new Error('api down'))
		await expect(
			subscribeToNewsletter({ email: 'user@example.com' })
		).rejects.toThrow('Failed to subscribe to newsletter')
	})

	// Resend returns API errors instead of throwing; treating that as success would
	// show a success toast and fire `newsletter_subscribed` for a failed subscribe.
	it('throws when the API returns an error instead of rejecting', async () => {
		vi.stubEnv('RESEND_SEGMENT_ID', 'seg_123')
		const apiError = { name: 'validation_error', message: 'Invalid segment' }
		contactsCreate.mockResolvedValueOnce({ data: null, error: apiError })
		await expect(
			subscribeToNewsletter({ email: 'user@example.com' })
		).rejects.toThrow('Failed to subscribe to newsletter')
		expect(console.error).toHaveBeenCalledWith(expect.any(String), apiError)
	})
})
