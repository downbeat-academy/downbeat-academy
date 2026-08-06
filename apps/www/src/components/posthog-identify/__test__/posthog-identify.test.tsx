import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

const { identify } = vi.hoisted(() => ({ identify: vi.fn() }))

vi.mock('posthog-js', () => ({ default: { identify } }))

const { PostHogIdentify } = await import('../posthog-identify')

const props = {
	userId: 'user_abc123',
	name: 'Ella Fitzgerald',
	email: 'ella@example.com',
	role: 'user',
	isAdmin: false,
}

describe('PostHogIdentify', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('identifies by the better-auth user id', () => {
		// This id is what stitches `www` events to the auth-funnel events
		// captured in `apps/auth`. The two apps are on different domains, so
		// there is no shared cookie and no common anonymous id to fall back on.
		render(<PostHogIdentify {...props} />)

		expect(identify).toHaveBeenCalledWith('user_abc123', expect.any(Object))
	})

	it('sets the person properties', () => {
		render(<PostHogIdentify {...props} />)

		expect(identify).toHaveBeenCalledWith('user_abc123', {
			name: 'Ella Fitzgerald',
			email: 'ella@example.com',
			role: 'user',
			is_admin: false,
		})
	})

	it('flags admins so staff traffic can be excluded from product metrics', () => {
		render(<PostHogIdentify {...props} role="admin" isAdmin />)

		expect(identify).toHaveBeenCalledWith(
			'user_abc123',
			expect.objectContaining({ is_admin: true, role: 'admin' })
		)
	})

	it('sends undefined rather than null for missing fields', () => {
		// PostHog stores an explicit null as a value; undefined is omitted.
		render(
			<PostHogIdentify
				userId="user_abc123"
				name={null}
				email={null}
				role={null}
				isAdmin={false}
			/>
		)

		expect(identify).toHaveBeenCalledWith('user_abc123', {
			name: undefined,
			email: undefined,
			role: undefined,
			is_admin: false,
		})
	})
})
