import 'server-only'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { Resend } from 'resend'
import type { Subscriber } from '../types'

const SUBSCRIBERS_TAG = 'admin:subscribers'

async function fetchSubscribersRaw(): Promise<Subscriber[]> {
	const apiKey = process.env.RESEND_API_KEY
	const audienceId = process.env.RESEND_DEFAULT_AUDIENCE_ID
	if (!apiKey || !audienceId) return []

	const resend = new Resend(apiKey)
	const { data, error } = await resend.contacts.list({ audienceId })
	if (error || !data) return []

	return data.data.map((c) => ({
		id: c.id,
		email: c.email,
		firstName: c.first_name ?? null,
		lastName: c.last_name ?? null,
		unsubscribed: Boolean(c.unsubscribed),
		createdAt: c.created_at ? new Date(c.created_at) : null,
	}))
}

const cachedFetch = unstable_cache(fetchSubscribersRaw, ['admin', 'subscribers'], {
	tags: [SUBSCRIBERS_TAG],
	revalidate: 600,
})

export const listSubscribers = cache(async (): Promise<Subscriber[]> => cachedFetch())

export const countSubscribers = cache(async (): Promise<number> => {
	const list = await cachedFetch()
	return list.filter((s) => !s.unsubscribed).length
})
