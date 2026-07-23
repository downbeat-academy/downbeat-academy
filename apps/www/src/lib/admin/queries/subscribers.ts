import 'server-only'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { Resend } from 'resend'
import type { Subscriber } from '../types'

const SUBSCRIBERS_TAG = 'admin:subscribers'

/** Resend caps `limit` at 100 per page. */
const PAGE_SIZE = 100
/** Safety valve so a pagination bug can't loop forever. */
const MAX_PAGES = 50

/**
 * Wire shape stored in the cache. `unstable_cache` serialises its result to JSON,
 * so Dates must be kept as ISO strings here and rehydrated after the cache read —
 * otherwise a cache hit returns strings where callers expect Date objects.
 */
type SubscriberRecord = Omit<Subscriber, 'createdAt'> & { createdAt: string | null }

export type SubscribersResult = {
	subscribers: Subscriber[]
	/** Non-null when the fetch failed, so the UI can distinguish "none" from "broken". */
	error: string | null
}

type CachedSubscribers = {
	subscribers: SubscriberRecord[]
	error: string | null
}

async function fetchSubscribersRaw(): Promise<CachedSubscribers> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) {
		return { subscribers: [], error: 'RESEND_API_KEY is not configured.' }
	}

	const resend = new Resend(apiKey)
	const subscribers: SubscriberRecord[] = []
	let after: string | undefined

	// `contacts.list({ audienceId })` is deprecated in resend v6 — it is remapped to
	// `segmentId` and requests `/segments/{id}/contacts`, which an audience ID does not
	// resolve against. List the account's contacts instead and page through them.
	for (let page = 0; page < MAX_PAGES; page++) {
		const { data, error } = await resend.contacts.list({ limit: PAGE_SIZE, after })

		if (error) {
			return {
				subscribers,
				error: error.message || 'Failed to load contacts from Resend.',
			}
		}
		if (!data) break

		for (const contact of data.data) {
			subscribers.push({
				id: contact.id,
				email: contact.email,
				firstName: contact.first_name ?? null,
				lastName: contact.last_name ?? null,
				unsubscribed: Boolean(contact.unsubscribed),
				createdAt: contact.created_at ?? null,
			})
		}

		if (!data.has_more || data.data.length === 0) break
		after = data.data[data.data.length - 1]?.id
		if (!after) break
	}

	return { subscribers, error: null }
}

const cachedFetch = unstable_cache(fetchSubscribersRaw, ['admin', 'subscribers'], {
	tags: [SUBSCRIBERS_TAG],
	revalidate: 600,
})

function hydrate(record: SubscriberRecord): Subscriber {
	return {
		...record,
		createdAt: record.createdAt ? new Date(record.createdAt) : null,
	}
}

export const listSubscribers = cache(async (): Promise<SubscribersResult> => {
	const { subscribers, error } = await cachedFetch()
	return { subscribers: subscribers.map(hydrate), error }
})

export const countSubscribers = cache(async (): Promise<number> => {
	const { subscribers } = await cachedFetch()
	return subscribers.filter((s) => !s.unsubscribed).length
})
