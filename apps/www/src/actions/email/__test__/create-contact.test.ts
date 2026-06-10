import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { contactsCreate } = vi.hoisted(() => ({ contactsCreate: vi.fn() }))

vi.mock('resend', () => ({
	Resend: vi.fn(function () {
		return { contacts: { create: contactsCreate } }
	}),
}))

import { createContact } from '../create-contact'

const contact = {
	firstName: 'Ada',
	lastName: 'Lovelace',
	email: 'ada@example.com',
}

describe('createContact', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'log').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('throws when no audience id is available', async () => {
		vi.stubEnv('RESEND_DEFAULT_AUDIENCE_ID', '')
		await expect(createContact(contact)).rejects.toThrow(
			'No audience ID provided and RESEND_DEFAULT_AUDIENCE_ID not configured'
		)
	})

	it('uses the explicit audience id when provided', async () => {
		contactsCreate.mockResolvedValueOnce({ data: { id: 'c1' } })
		await createContact({ ...contact, audienceId: 'explicit_aud' })
		expect(contactsCreate).toHaveBeenCalledWith({
			email: 'ada@example.com',
			audienceId: 'explicit_aud',
			firstName: 'Ada',
			lastName: 'Lovelace',
			unsubscribed: false,
		})
	})

	it('falls back to the default audience id from env', async () => {
		vi.stubEnv('RESEND_DEFAULT_AUDIENCE_ID', 'default_aud')
		contactsCreate.mockResolvedValueOnce({ data: { id: 'c1' } })
		await createContact(contact)
		expect(contactsCreate).toHaveBeenCalledWith(
			expect.objectContaining({ audienceId: 'default_aud' })
		)
	})

	it('throws a friendly error when creation fails', async () => {
		contactsCreate.mockRejectedValueOnce(new Error('api down'))
		await expect(
			createContact({ ...contact, audienceId: 'explicit_aud' })
		).rejects.toThrow('Failed to create contact')
	})
})
