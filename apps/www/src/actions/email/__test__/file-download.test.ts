import { beforeEach, describe, expect, it, vi } from 'vitest'

const { emailsSend } = vi.hoisted(() => ({ emailsSend: vi.fn() }))

vi.mock('resend', () => ({
	Resend: vi.fn(function () {
		return { emails: { send: emailsSend } }
	}),
}))
vi.mock('../../../../../packages/email/emails/file-download', () => ({
	default: vi.fn(() => null),
}))

import { sendFileDownload } from '../file-download'

const payload = {
	email: 'user@example.com',
	file: 'https://files.example.com/cheatsheet.pdf',
	title: 'Rhythm Cheatsheet',
}

describe('sendFileDownload', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'log').mockImplementation(() => {})
	})

	it('sends the download email to the requester', async () => {
		emailsSend.mockResolvedValueOnce({ data: { id: 'e1' } })
		await sendFileDownload(payload)
		expect(emailsSend).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
				to: 'user@example.com',
				subject: '🎼 Your download from Downbeat Academy is here!',
				replyTo: 'jory@downbeatacademy.com',
			})
		)
	})

	it('throws when sending fails', async () => {
		emailsSend.mockRejectedValueOnce(new Error('api down'))
		await expect(sendFileDownload(payload)).rejects.toThrow(
			'Failed to send email'
		)
	})
})
