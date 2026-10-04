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
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('throws when no segment id is available', async () => {
		vi.stubEnv('RESEND_SEGMENT_ID', '')
		await expect(createContact(contact)).rejects.toThrow(
			'No segment ID provided and RESEND_SEGMENT_ID not configured'
		)
		expect(contactsCreate).not.toHaveBeenCalled()
	})

	it('uses the explicit segment id when provided', async () => {
		contactsCreate.mockResolvedValueOnce({ data: { id: 'c1' }, error: null })
		await createContact({ ...contact, segmentId: 'explicit_seg' })
		expect(contactsCreate).toHaveBeenCalledWith({
			email: 'ada@example.com',
			firstName: 'Ada',
			lastName: 'Lovelace',
			unsubscribed: false,
			segments: [{ id: 'explicit_seg' }],
		})
	})

	it('falls back to the default segment id from env', async () => {
		vi.stubEnv('RESEND_SEGMENT_ID', 'default_seg')
		contactsCreate.mockResolvedValueOnce({ data: { id: 'c1' }, error: null })
		await createContact(contact)
		expect(contactsCreate).toHaveBeenCalledWith(
			expect.objectContaining({ segments: [{ id: 'default_seg' }] })
		)
	})

	it('throws a friendly error when creation rejects', async () => {
		contactsCreate.mockRejectedValueOnce(new Error('api down'))
		await expect(
			createContact({ ...contact, segmentId: 'explicit_seg' })
		).rejects.toThrow('Failed to create contact')
	})

	it('throws when the API returns an error instead of rejecting', async () => {
		const apiError = { name: 'validation_error', message: 'Invalid segment' }
		contactsCreate.mockResolvedValueOnce({ data: null, error: apiError })
		await expect(
			createContact({ ...contact, segmentId: 'explicit_seg' })
		).rejects.toThrow('Failed to create contact')
		expect(console.error).toHaveBeenCalledWith(expect.any(String), apiError)
	})
})
