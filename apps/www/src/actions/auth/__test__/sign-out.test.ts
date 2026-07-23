import { beforeEach, describe, expect, it, vi } from 'vitest'

const { signOut: signOutApi, redirect, revalidatePath, headers } = vi.hoisted(
	() => ({
		signOut: vi.fn(),
		redirect: vi.fn(() => {
			throw new Error('NEXT_REDIRECT')
		}),
		revalidatePath: vi.fn(),
		headers: vi.fn(async () => new Headers()),
	})
)

vi.mock('@/lib/auth/auth', () => ({ auth: { api: { signOut: signOutApi } } }))
vi.mock('next/navigation', () => ({ redirect }))
vi.mock('next/cache', () => ({ revalidatePath }))
vi.mock('next/headers', () => ({ headers }))

import { signOut } from '../sign-out'

describe('signOut', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('signs out, revalidates, and redirects home', async () => {
		await expect(signOut()).rejects.toThrow('NEXT_REDIRECT')
		expect(signOutApi).toHaveBeenCalledOnce()
		expect(revalidatePath).toHaveBeenCalledWith('/')
		expect(redirect).toHaveBeenCalledWith('/')
	})

	it('throws a friendly error when sign out fails', async () => {
		signOutApi.mockRejectedValueOnce(new Error('session error'))
		await expect(signOut()).rejects.toThrow('Failed to sign out')
		expect(redirect).not.toHaveBeenCalled()
	})
})
