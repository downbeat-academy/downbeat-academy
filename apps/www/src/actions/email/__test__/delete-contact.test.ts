import { beforeEach, describe, expect, it, vi } from 'vitest'

const { contactsRemove } = vi.hoisted(() => ({ contactsRemove: vi.fn() }))

vi.mock('resend', () => ({
	Resend: vi.fn(function () {
		return { contacts: { remove: contactsRemove } }
	}),
}))

import { deleteContact } from '../delete-contact'

describe('deleteContact', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('removes the contact by email, without needing a segment', async () => {
		contactsRemove.mockResolvedValueOnce({
			data: { deleted: true },
			error: null,
		})
		await deleteContact({ email: 'user@example.com' })
		expect(contactsRemove).toHaveBeenCalledWith({ email: 'user@example.com' })
	})

	it('throws a friendly error when removal rejects', async () => {
		contactsRemove.mockRejectedValueOnce(new Error('api down'))
		await expect(
			deleteContact({ email: 'user@example.com' })
		).rejects.toThrow('Failed to delete contact')
	})

	// Without this, the unsubscribe page would report success and fire
	// `newsletter_unsubscribed` while the contact stayed subscribed.
	it('throws when the API returns an error instead of rejecting', async () => {
		const apiError = { name: 'not_found', message: 'Contact not found' }
		contactsRemove.mockResolvedValueOnce({ data: null, error: apiError })
		await expect(
			deleteContact({ email: 'user@example.com' })
		).rejects.toThrow('Failed to delete contact')
		expect(console.error).toHaveBeenCalledWith(expect.any(String), apiError)
	})
})
