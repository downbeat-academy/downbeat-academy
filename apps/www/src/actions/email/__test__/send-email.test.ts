import { beforeEach, describe, expect, it, vi } from 'vitest'

const { emailsSend } = vi.hoisted(() => ({ emailsSend: vi.fn() }))

vi.mock('resend', () => ({
	Resend: vi.fn(function () {
		return { emails: { send: emailsSend } }
	}),
}))
// The email template renders React Email components; stub it so importing the
// action under test never pulls in the real rendering dependencies.
vi.mock('../../../../../packages/email/emails/contact-form', () => ({
	default: vi.fn(() => null),
}))

import { sendEmail } from '../send-email'

const payload = {
	name: 'Ada',
	email: 'ada@example.com',
	message: 'Hello!',
}

describe('sendEmail', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'log').mockImplementation(() => {})
	})

	it('sends the contact email with the expected envelope', async () => {
		emailsSend.mockResolvedValueOnce({ data: { id: 'e1' } })
		await sendEmail(payload)
		expect(emailsSend).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
				to: 'jory@downbeatacademy.com',
				subject:
					'Ada sent you a message from the Downbeat Academy contact form',
				replyTo: 'ada@example.com',
			})
		)
	})

	it('throws when sending fails', async () => {
		emailsSend.mockRejectedValueOnce(new Error('api down'))
		await expect(sendEmail(payload)).rejects.toThrow('Failed to send email')
	})
})
