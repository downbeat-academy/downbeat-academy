import { beforeEach, describe, expect, it, vi } from 'vitest'

const { requestPasswordReset } = vi.hoisted(() => ({
	requestPasswordReset: vi.fn(),
}))

vi.mock('@/lib/auth/auth', () => ({
	auth: { api: { requestPasswordReset } },
}))

import { forgotPasswordAction } from '../forgot-password'

describe('forgotPasswordAction', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('requests a password reset and returns success', async () => {
		const result = await forgotPasswordAction('user@example.com')
		expect(requestPasswordReset).toHaveBeenCalledWith({
			body: {
				email: 'user@example.com',
				redirectTo: '/account/update-password',
			},
		})
		expect(result).toEqual({ success: true })
	})

	it('returns a not-found message when the user does not exist', async () => {
		requestPasswordReset.mockRejectedValueOnce(new Error('User not found'))
		const result = await forgotPasswordAction('missing@example.com')
		expect(result).toEqual({
			error: 'No account found with this email address',
		})
	})

	it('returns a generic error for other failures', async () => {
		requestPasswordReset.mockRejectedValueOnce(new Error('smtp down'))
		const result = await forgotPasswordAction('user@example.com')
		expect(result).toEqual({
			error: 'Failed to send password reset email. Please try again.',
		})
	})
})
