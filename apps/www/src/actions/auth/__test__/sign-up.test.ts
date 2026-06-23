import { beforeEach, describe, expect, it, vi } from 'vitest'

const { signUpEmail, revalidatePath, headers } = vi.hoisted(() => ({
	signUpEmail: vi.fn(),
	revalidatePath: vi.fn(),
	headers: vi.fn(async () => new Headers()),
}))

vi.mock('@/lib/auth/auth', () => ({ auth: { api: { signUpEmail } } }))
vi.mock('next/cache', () => ({ revalidatePath }))
vi.mock('next/headers', () => ({ headers }))

import { signUp } from '../sign-up'

const formDataFor = (fields: Record<string, string>) => {
	const fd = new FormData()
	for (const [key, value] of Object.entries(fields)) fd.append(key, value)
	return fd
}

describe('signUp', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('throws when required fields are missing', async () => {
		await expect(signUp(formDataFor({ email: 'a@b.com' }))).rejects.toThrow(
			'Email, password, and name are required'
		)
		expect(signUpEmail).not.toHaveBeenCalled()
	})

	it('signs the user up, revalidates, and returns success', async () => {
		const fd = formDataFor({
			email: 'a@b.com',
			password: 'secret123',
			name: 'Ada',
		})
		const result = await signUp(fd)

		expect(signUpEmail).toHaveBeenCalledWith({
			headers: expect.any(Headers),
			body: { email: 'a@b.com', password: 'secret123', name: 'Ada' },
		})
		expect(revalidatePath).toHaveBeenCalledWith('/')
		expect(result).toEqual({ success: true, email: 'a@b.com' })
	})

	it('maps USER_ALREADY_EXISTS to a friendly error', async () => {
		signUpEmail.mockRejectedValueOnce({ body: { code: 'USER_ALREADY_EXISTS' } })
		await expect(
			signUp(formDataFor({ email: 'a@b.com', password: 'secret123', name: 'Ada' }))
		).rejects.toThrow('A user with this email already exists')
	})

	it('rethrows unexpected errors', async () => {
		signUpEmail.mockRejectedValueOnce(new Error('boom'))
		await expect(
			signUp(formDataFor({ email: 'a@b.com', password: 'secret123', name: 'Ada' }))
		).rejects.toThrow('boom')
	})
})
