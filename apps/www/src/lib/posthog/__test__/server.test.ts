import { afterEach, describe, expect, it, vi } from 'vitest'

const { PostHogMock } = vi.hoisted(() => ({ PostHogMock: vi.fn() }))

vi.mock('posthog-node', () => ({ PostHog: PostHogMock }))

const { getDistinctIdFromCookie, getPostHogServer, resetPostHogServerForTests } =
	await import('../server')

const TOKEN = 'phc_test_token'

function phCookie(value: unknown): string {
	return `ph_${TOKEN}_posthog=${encodeURIComponent(JSON.stringify(value))}`
}

describe('getDistinctIdFromCookie', () => {
	it('reads the distinct id from the posthog-js cookie', () => {
		const header = `theme=dark; ${phCookie({ distinct_id: 'user_123' })}; other=1`

		expect(getDistinctIdFromCookie(header, TOKEN)).toBe('user_123')
	})

	it('ignores cookies set for a different project token', () => {
		const header = phCookie({ distinct_id: 'user_123' }).replace(
			TOKEN,
			'phc_other'
		)

		expect(getDistinctIdFromCookie(header, TOKEN)).toBeUndefined()
	})

	it('returns undefined for a missing header, token, or cookie', () => {
		expect(getDistinctIdFromCookie(undefined, TOKEN)).toBeUndefined()
		expect(
			getDistinctIdFromCookie(phCookie({ distinct_id: 'x' }), undefined)
		).toBeUndefined()
		expect(getDistinctIdFromCookie('theme=dark', TOKEN)).toBeUndefined()
	})

	it('returns undefined rather than throwing on a malformed cookie', () => {
		expect(
			getDistinctIdFromCookie(`ph_${TOKEN}_posthog=%7Bnot-json`, TOKEN)
		).toBeUndefined()
		expect(
			getDistinctIdFromCookie(phCookie({ distinct_id: 42 }), TOKEN)
		).toBeUndefined()
	})
})

describe('getPostHogServer', () => {
	afterEach(() => {
		vi.unstubAllEnvs()
		PostHogMock.mockClear()
		resetPostHogServerForTests()
	})

	it('creates a single client on the production host', () => {
		vi.stubEnv('NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN', TOKEN)
		vi.stubEnv('NEXT_PUBLIC_PROJECT_URL', 'https://downbeatacademy.com')

		const first = getPostHogServer()

		expect(first).not.toBeNull()
		expect(getPostHogServer()).toBe(first)
		expect(PostHogMock).toHaveBeenCalledTimes(1)
	})

	it('stays disabled locally', () => {
		vi.stubEnv('NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN', TOKEN)
		vi.stubEnv('NEXT_PUBLIC_PROJECT_URL', 'http://localhost:3000')
		vi.stubEnv('NEXT_PUBLIC_POSTHOG_DEBUG', '')

		expect(getPostHogServer()).toBeNull()
		expect(PostHogMock).not.toHaveBeenCalled()
	})
})
