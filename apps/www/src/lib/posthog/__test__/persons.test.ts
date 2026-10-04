import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('server-only', () => ({}))

import { deletePostHogPerson } from '../persons'

const fetchMock = vi.fn()

describe('deletePostHogPerson', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', fetchMock)
		fetchMock.mockReset()
	})

	afterEach(() => {
		vi.unstubAllEnvs()
		vi.unstubAllGlobals()
	})

	it('skips without a personal API key', async () => {
		vi.stubEnv('POSTHOG_PERSONAL_API_KEY', '')

		const result = await deletePostHogPerson('user-1')

		expect(result.status).toBe('skipped')
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('bulk-deletes the person and their events by distinct id', async () => {
		vi.stubEnv('POSTHOG_PERSONAL_API_KEY', 'phx_test')
		fetchMock.mockResolvedValueOnce(new Response(null, { status: 202 }))

		const result = await deletePostHogPerson('user-1')

		expect(result).toEqual({ status: 'deleted' })
		const [url, init] = fetchMock.mock.calls[0]
		expect(url).toBe('https://us.posthog.com/api/environments/513825/persons/bulk_delete/')
		expect(init.method).toBe('POST')
		expect(init.headers.Authorization).toBe('Bearer phx_test')
		expect(JSON.parse(init.body)).toEqual({ distinct_ids: ['user-1'], delete_events: true })
	})

	it('honours host and project overrides', async () => {
		vi.stubEnv('POSTHOG_PERSONAL_API_KEY', 'phx_test')
		vi.stubEnv('POSTHOG_API_HOST', 'https://eu.posthog.com')
		vi.stubEnv('POSTHOG_PROJECT_ID', '42')
		fetchMock.mockResolvedValueOnce(new Response(null, { status: 202 }))

		await deletePostHogPerson('user-1')

		expect(fetchMock.mock.calls[0][0]).toBe(
			'https://eu.posthog.com/api/environments/42/persons/bulk_delete/'
		)
	})

	it('reports a non-2xx response as failed', async () => {
		vi.stubEnv('POSTHOG_PERSONAL_API_KEY', 'phx_test')
		fetchMock.mockResolvedValueOnce(new Response(null, { status: 403 }))

		expect(await deletePostHogPerson('user-1')).toEqual({
			status: 'failed',
			error: 'PostHog responded 403',
		})
	})

	it('reports a network error as failed instead of throwing', async () => {
		vi.stubEnv('POSTHOG_PERSONAL_API_KEY', 'phx_test')
		fetchMock.mockRejectedValueOnce(new Error('ECONNRESET'))

		expect(await deletePostHogPerson('user-1')).toEqual({
			status: 'failed',
			error: 'ECONNRESET',
		})
	})
})
