import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getSession, headers } = vi.hoisted(() => ({
	getSession: vi.fn(),
	headers: vi.fn(async () => new Headers()),
}))

vi.mock('@/lib/auth/auth', () => ({ auth: { api: { getSession } } }))
vi.mock('next/headers', () => ({ headers }))

import { getProfile } from '../get-profile'

describe('getProfile', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('throws when there is no session', async () => {
		getSession.mockResolvedValueOnce(null)
		await expect(getProfile()).rejects.toThrow('Not authenticated')
	})

	it('returns the user from the session', async () => {
		const user = { id: 'u1', name: 'Ada', email: 'ada@example.com' }
		getSession.mockResolvedValueOnce({ session: { id: 's1' }, user })
		await expect(getProfile()).resolves.toEqual({ user })
	})
})
