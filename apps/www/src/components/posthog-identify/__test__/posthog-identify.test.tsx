import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

const { identify, useAnalyticsConsent } = vi.hoisted(() => ({
	identify: vi.fn(),
	useAnalyticsConsent: vi.fn(),
}))

vi.mock('posthog-js', () => ({ default: { identify } }))
vi.mock('@lib/consent', () => ({ useAnalyticsConsent }))

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
		useAnalyticsConsent.mockReturnValue('granted')
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

	describe('consent', () => {
		it.each([
			['pending', 'pending'],
			['denied', 'denied'],
			['not yet known (hydration)', undefined],
		])('does not identify when consent is %s', (_label, status) => {
			// Signing in is not consent. Identifying in cookieless mode would
			// attach a persistent id to a visitor who has not accepted one.
			useAnalyticsConsent.mockReturnValue(status)

			render(<PostHogIdentify {...props} />)

			expect(identify).not.toHaveBeenCalled()
		})

		it('identifies as soon as the visitor accepts', () => {
			useAnalyticsConsent.mockReturnValue('pending')
			const { rerender } = render(<PostHogIdentify {...props} />)
			expect(identify).not.toHaveBeenCalled()

			useAnalyticsConsent.mockReturnValue('granted')
			rerender(<PostHogIdentify {...props} />)

			expect(identify).toHaveBeenCalledTimes(1)
			expect(identify).toHaveBeenCalledWith('user_abc123', expect.any(Object))
		})
	})
})
