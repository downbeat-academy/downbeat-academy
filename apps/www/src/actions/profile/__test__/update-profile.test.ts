import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getSession, updateUser, headers } = vi.hoisted(() => ({
	getSession: vi.fn(),
	updateUser: vi.fn(),
	headers: vi.fn(async () => new Headers()),
}))

vi.mock('@/lib/auth/auth', () => ({
	auth: { api: { getSession, updateUser } },
}))
vi.mock('next/headers', () => ({ headers }))

import { updateProfile } from '../update-profile'

describe('updateProfile', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('throws when there is no session', async () => {
		getSession.mockResolvedValueOnce(null)
		await expect(updateProfile({ name: 'Ada' })).rejects.toThrow(
			'Not authenticated'
		)
		expect(updateUser).not.toHaveBeenCalled()
	})

	it('updates the user name and returns success', async () => {
		getSession.mockResolvedValueOnce({ session: { id: 's1' } })
		const result = await updateProfile({ name: 'Ada Lovelace' })
		expect(updateUser).toHaveBeenCalledWith({
			headers: expect.any(Headers),
			body: { name: 'Ada Lovelace' },
		})
		expect(result).toEqual({ success: true })
	})

	it('rethrows update failures', async () => {
		getSession.mockResolvedValueOnce({ session: { id: 's1' } })
		updateUser.mockRejectedValueOnce(new Error('update failed'))
		await expect(updateProfile({ name: 'Ada' })).rejects.toThrow('update failed')
	})
})
