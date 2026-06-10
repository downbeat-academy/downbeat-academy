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
	})

	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('throws when the default audience is not configured', async () => {
		vi.stubEnv('RESEND_DEFAULT_AUDIENCE_ID', '')
		await expect(
			subscribeToNewsletter({ email: 'user@example.com' })
		).rejects.toThrow('RESEND_DEFAULT_AUDIENCE_ID not configured')
		expect(contactsCreate).not.toHaveBeenCalled()
	})

	it('creates a contact in the configured audience', async () => {
		vi.stubEnv('RESEND_DEFAULT_AUDIENCE_ID', 'aud_123')
		contactsCreate.mockResolvedValueOnce({ data: { id: 'c1' } })
		await subscribeToNewsletter({ email: 'user@example.com' })
		expect(contactsCreate).toHaveBeenCalledWith({
			email: 'user@example.com',
			unsubscribed: false,
			audienceId: 'aud_123',
		})
	})

	it('throws a friendly error when the API call fails', async () => {
		vi.stubEnv('RESEND_DEFAULT_AUDIENCE_ID', 'aud_123')
		contactsCreate.mockRejectedValueOnce(new Error('api down'))
		await expect(
			subscribeToNewsletter({ email: 'user@example.com' })
		).rejects.toThrow('Failed to subscribe to newsletter')
	})
})
