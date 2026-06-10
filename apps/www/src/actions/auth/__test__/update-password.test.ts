import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
	getSession,
	findAccountByUserId,
	updatePassword,
	verify,
	hash,
	headers,
} = vi.hoisted(() => ({
	getSession: vi.fn(),
	findAccountByUserId: vi.fn(),
	updatePassword: vi.fn(),
	verify: vi.fn(),
	hash: vi.fn(),
	headers: vi.fn(async () => new Headers()),
}))

vi.mock('@/lib/auth/auth', () => ({
	auth: {
		api: { getSession },
		$context: Promise.resolve({
			internalAdapter: { findAccountByUserId, updatePassword },
			password: { verify, hash },
		}),
	},
}))
vi.mock('next/headers', () => ({ headers }))

import { updatePasswordAction } from '../update-password'

const sessionUser = { user: { id: 'user-1' } }

describe('updatePasswordAction', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('errors when there is no session', async () => {
		getSession.mockResolvedValueOnce(null)
		const result = await updatePasswordAction({ newPassword: 'NewPass1!' })
		expect(result).toEqual({
			error: 'You must be signed in to update your password',
		})
	})

	it('errors when the user has no accounts', async () => {
		getSession.mockResolvedValueOnce(sessionUser)
		findAccountByUserId.mockResolvedValueOnce([])
		const result = await updatePasswordAction({ newPassword: 'NewPass1!' })
		expect(result).toEqual({
			error: 'No account found. Please try signing in again.',
		})
	})

	it('requires the current password when an account has one', async () => {
		getSession.mockResolvedValueOnce(sessionUser)
		findAccountByUserId.mockResolvedValueOnce([{ password: 'existing-hash' }])
		const result = await updatePasswordAction({ newPassword: 'NewPass1!' })
		expect(result).toEqual({ error: 'Current password is required' })
	})

	it('rejects an incorrect current password', async () => {
		getSession.mockResolvedValueOnce(sessionUser)
		findAccountByUserId.mockResolvedValueOnce([{ password: 'existing-hash' }])
		verify.mockResolvedValueOnce(false)
		const result = await updatePasswordAction({
			currentPassword: 'wrong',
			newPassword: 'NewPass1!',
		})
		expect(result).toEqual({ error: 'Current password is incorrect' })
	})

	it('updates the password on the happy path', async () => {
		getSession.mockResolvedValueOnce(sessionUser)
		findAccountByUserId.mockResolvedValueOnce([{ password: 'existing-hash' }])
		verify.mockResolvedValueOnce(true)
		hash.mockResolvedValueOnce('new-hash')
		const result = await updatePasswordAction({
			currentPassword: 'correct',
			newPassword: 'NewPass1!',
		})
		expect(hash).toHaveBeenCalledWith('NewPass1!')
		expect(updatePassword).toHaveBeenCalledWith('user-1', 'new-hash')
		expect(result).toEqual({ success: true })
	})

	it('skips verification for an account without a password', async () => {
		getSession.mockResolvedValueOnce(sessionUser)
		findAccountByUserId.mockResolvedValueOnce([{ password: null }])
		hash.mockResolvedValueOnce('new-hash')
		const result = await updatePasswordAction({ newPassword: 'NewPass1!' })
		expect(verify).not.toHaveBeenCalled()
		expect(updatePassword).toHaveBeenCalledWith('user-1', 'new-hash')
		expect(result).toEqual({ success: true })
	})
})
