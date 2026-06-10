import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
	})

	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('throws when no audience id is available', async () => {
		vi.stubEnv('RESEND_DEFAULT_AUDIENCE_ID', '')
		await expect(
			deleteContact({ email: 'user@example.com' })
		).rejects.toThrow(
			'No audience ID provided and RESEND_DEFAULT_AUDIENCE_ID not configured'
		)
		expect(contactsRemove).not.toHaveBeenCalled()
	})

	it('removes the contact from the given audience', async () => {
		contactsRemove.mockResolvedValueOnce({ data: { deleted: true } })
		await deleteContact({ email: 'user@example.com', audienceId: 'aud_1' })
		expect(contactsRemove).toHaveBeenCalledWith({
			email: 'user@example.com',
			audienceId: 'aud_1',
		})
	})

	it('throws a friendly error when removal fails', async () => {
		contactsRemove.mockRejectedValueOnce(new Error('api down'))
		await expect(
			deleteContact({ email: 'user@example.com', audienceId: 'aud_1' })
		).rejects.toThrow('Failed to delete contact')
	})
})
