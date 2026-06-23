import { beforeEach, describe, expect, it, vi } from 'vitest'

const { resetPassword } = vi.hoisted(() => ({ resetPassword: vi.fn() }))

vi.mock('@/lib/auth/auth', () => ({ auth: { api: { resetPassword } } }))

import { resetPasswordAction } from '../reset-password'

describe('resetPasswordAction', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('resets the password and returns success', async () => {
		const result = await resetPasswordAction({
			newPassword: 'NewPass1!',
			token: 'tok_123',
		})
		expect(resetPassword).toHaveBeenCalledWith({
			body: { newPassword: 'NewPass1!', token: 'tok_123' },
		})
		expect(result).toEqual({ success: true })
	})

	it('returns the error message when the reset fails', async () => {
		resetPassword.mockRejectedValueOnce(new Error('Token expired'))
		const result = await resetPasswordAction({
			newPassword: 'NewPass1!',
			token: 'tok_123',
		})
		expect(result).toEqual({ error: 'Token expired' })
	})

	it('falls back to a generic error when none is provided', async () => {
		resetPassword.mockRejectedValueOnce({})
		const result = await resetPasswordAction({
			newPassword: 'NewPass1!',
			token: 'tok_123',
		})
		expect(result).toEqual({
			error: 'Failed to reset password. Please try again.',
		})
	})
})
