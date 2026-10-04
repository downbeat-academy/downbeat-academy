import { beforeEach, describe, expect, it, vi } from 'vitest'

const { send, VerifyEmail } = vi.hoisted(() => ({
	send: vi.fn(),
	VerifyEmail: vi.fn(),
}))

vi.mock('resend', () => ({
	Resend: class {
		emails = { send }
	},
}))

vi.mock('email/emails/index', () => ({ VerifyEmail }))

import { sendVerificationEmail } from '../send-verification-email'

// Shaped exactly as better-auth 1.6 builds it in
// `api/routes/email-verification`: `${ctx.context.baseURL}/verify-email?…`,
// where baseURL already carries the `/api/auth` base path.
const betterAuthUrl =
	'https://auth.downbeatacademy.services/api/auth/verify-email?token=abc.def&callbackURL=%2F'

describe('sendVerificationEmail', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		send.mockResolvedValue({ data: { id: 'email_1' } })
		vi.spyOn(console, 'log').mockImplementation(() => {})
	})

	it('puts better-auth’s link into the email unchanged', async () => {
		await sendVerificationEmail({
			user: { email: 'new@example.com', name: 'New User' },
			url: betterAuthUrl,
		})

		expect(VerifyEmail).toHaveBeenCalledWith({
			name: 'New User',
			verificationUrl: betterAuthUrl,
		})
	})

	it('links to a single absolute URL', async () => {
		// The DBA-414 regression: prefixing the auth service URL onto an
		// already-absolute `url` produced `…/api/authhttps://…`, which 404s.
		await sendVerificationEmail({
			user: { email: 'new@example.com', name: 'New User' },
			url: betterAuthUrl,
		})

		const { verificationUrl } = VerifyEmail.mock.calls[0][0]
		expect(verificationUrl.match(/:\/\//g)).toHaveLength(1)
		expect(new URL(verificationUrl).pathname).toBe('/api/auth/verify-email')
	})

	it('sends to the new user’s address', async () => {
		await sendVerificationEmail({
			user: { email: 'new@example.com', name: 'New User' },
			url: betterAuthUrl,
		})

		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				to: 'new@example.com',
				subject: 'Verify your Downbeat Academy email address',
			}),
		)
	})

	it('rethrows a send failure', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		send.mockRejectedValue(new Error('Resend is down'))

		await expect(
			sendVerificationEmail({
				user: { email: 'new@example.com', name: 'New User' },
				url: betterAuthUrl,
			}),
		).rejects.toThrow('Resend is down')
	})
})
