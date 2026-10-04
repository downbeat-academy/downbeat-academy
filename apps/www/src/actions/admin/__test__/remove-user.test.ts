import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
	requireAdmin,
	removeUserApi,
	headers,
	updateTag,
	revalidatePath,
	deletePostHogPerson,
	captureServerEvent,
} = vi.hoisted(() => ({
	requireAdmin: vi.fn(),
	removeUserApi: vi.fn(),
	headers: vi.fn(async () => new Headers()),
	updateTag: vi.fn(),
	revalidatePath: vi.fn(),
	deletePostHogPerson: vi.fn(),
	captureServerEvent: vi.fn(),
}))

vi.mock('@/lib/auth/require-auth', () => ({ requireAdmin }))
vi.mock('@/lib/auth/auth', () => ({ auth: { api: { removeUser: removeUserApi } } }))
vi.mock('next/headers', () => ({ headers }))
vi.mock('next/cache', () => ({ updateTag, revalidatePath }))
vi.mock('@/lib/posthog/persons', () => ({ deletePostHogPerson }))
vi.mock('@/lib/posthog/server', () => ({ captureServerEvent }))

import { removeUser } from '../remove-user'

function sessionAs(role: string, id = 'actor-id') {
	return { user: { id, role } }
}

describe('removeUser', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
		deletePostHogPerson.mockResolvedValue({ status: 'deleted' })
	})

	it('refuses a plain admin without calling the API', async () => {
		requireAdmin.mockResolvedValueOnce(sessionAs('admin'))

		const result = await removeUser({ userId: 'target-id' })

		expect(result).toEqual({ ok: false, error: 'Only super admins can delete users.' })
		expect(removeUserApi).not.toHaveBeenCalled()
		expect(deletePostHogPerson).not.toHaveBeenCalled()
	})

	it('refuses to delete the signed-in superAdmin', async () => {
		requireAdmin.mockResolvedValueOnce(sessionAs('superAdmin', 'actor-id'))

		const result = await removeUser({ userId: 'actor-id' })

		expect(result).toEqual({ ok: false, error: 'You cannot delete your own account.' })
		expect(removeUserApi).not.toHaveBeenCalled()
	})

	it('deletes the user, their PostHog person, and records the audit event', async () => {
		requireAdmin.mockResolvedValueOnce(sessionAs('superAdmin'))

		const result = await removeUser({ userId: 'target-id' })

		expect(result).toEqual({ ok: true })
		expect(removeUserApi).toHaveBeenCalledWith({
			body: { userId: 'target-id' },
			headers: expect.any(Headers),
		})
		expect(deletePostHogPerson).toHaveBeenCalledWith('target-id')
		// On the actor, never the deleted user: an event on their id would recreate the person.
		expect(captureServerEvent).toHaveBeenCalledWith({
			distinctId: 'actor-id',
			event: 'account_deleted',
			properties: { method: 'admin', deleted_user_id: 'target-id' },
		})
		expect(updateTag).toHaveBeenCalledWith('admin:users')
		expect(revalidatePath).toHaveBeenCalledWith('/admin/users')
	})

	it('still succeeds when the PostHog cleanup fails', async () => {
		requireAdmin.mockResolvedValueOnce(sessionAs('superAdmin'))
		deletePostHogPerson.mockResolvedValueOnce({ status: 'failed', error: 'PostHog responded 500' })

		const result = await removeUser({ userId: 'target-id' })

		expect(result).toEqual({ ok: true })
		expect(console.error).toHaveBeenCalledWith(expect.stringContaining('PostHog responded 500'))
		expect(captureServerEvent).toHaveBeenCalled()
	})

	it('reports an API failure and skips the cleanup', async () => {
		requireAdmin.mockResolvedValueOnce(sessionAs('superAdmin'))
		removeUserApi.mockRejectedValueOnce(new Error('User not found'))

		const result = await removeUser({ userId: 'target-id' })

		expect(result).toEqual({
			ok: false,
			error: 'Could not delete this user. Try again, or check the server logs.',
		})
		expect(console.error).toHaveBeenCalledWith('removeUser failed:', expect.any(Error))
		expect(deletePostHogPerson).not.toHaveBeenCalled()
		expect(captureServerEvent).not.toHaveBeenCalled()
	})

	it('rejects an empty user id', async () => {
		requireAdmin.mockResolvedValueOnce(sessionAs('superAdmin'))

		const result = await removeUser({ userId: '' })

		expect(result.ok).toBe(false)
		expect(removeUserApi).not.toHaveBeenCalled()
	})
})
