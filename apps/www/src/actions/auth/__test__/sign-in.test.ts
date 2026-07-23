import { beforeEach, describe, expect, it, vi } from 'vitest'

const { signInEmail, redirect, headers } = vi.hoisted(() => ({
	signInEmail: vi.fn(),
	redirect: vi.fn(() => {
		// next/navigation's redirect signals control flow by throwing.
		throw new Error('NEXT_REDIRECT')
	}),
	headers: vi.fn(async () => new Headers()),
}))

vi.mock('@/lib/auth/auth', () => ({ auth: { api: { signInEmail } } }))
vi.mock('next/headers', () => ({ headers }))
vi.mock('next/navigation', () => ({ redirect }))

import { signIn } from '../sign-in'

const formDataFor = (fields: Record<string, string>) => {
	const fd = new FormData()
	for (const [key, value] of Object.entries(fields)) fd.append(key, value)
	return fd
}

const validForm = () =>
	formDataFor({ email: 'a@b.com', password: 'secret123' })

describe('signIn', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('throws when fields are missing', async () => {
		await expect(signIn(formDataFor({ email: 'a@b.com' }))).rejects.toThrow(
			'Email and password are required'
		)
	})

	it('redirects to /account after a successful sign in', async () => {
		await expect(signIn(validForm())).rejects.toThrow('NEXT_REDIRECT')
		expect(signInEmail).toHaveBeenCalledOnce()
		expect(redirect).toHaveBeenCalledWith('/account')
	})

	it('maps INVALID_CREDENTIALS', async () => {
		signInEmail.mockRejectedValueOnce({ body: { code: 'INVALID_CREDENTIALS' } })
		await expect(signIn(validForm())).rejects.toThrow('Invalid email or password')
		expect(redirect).not.toHaveBeenCalled()
	})

	it('maps USER_NOT_FOUND', async () => {
		signInEmail.mockRejectedValueOnce({ body: { code: 'USER_NOT_FOUND' } })
		await expect(signIn(validForm())).rejects.toThrow(
			'This email is not registered. Please create an account first.'
		)
	})

	it('maps EMAIL_NOT_VERIFIED', async () => {
		signInEmail.mockRejectedValueOnce({ body: { code: 'EMAIL_NOT_VERIFIED' } })
		await expect(signIn(validForm())).rejects.toThrow(
			'Please verify your email address.'
		)
	})

	it('rethrows unknown errors', async () => {
		signInEmail.mockRejectedValueOnce(new Error('network down'))
		await expect(signIn(validForm())).rejects.toThrow('network down')
	})
})
