'use client'

import { useEffect, useRef } from 'react'
import { capture } from '@lib/posthog/capture'

/**
 * The events that describe "someone looked at a piece of content". All share
 * the same `{ slug, title }` shape, which is what lets one component serve
 * every content route.
 */
export type ContentViewEvent =
	| 'article_viewed'
	| 'handbook_page_viewed'
	| 'lexicon_term_viewed'
	| 'category_browsed'
	| 'contributor_viewed'

export type TrackContentViewProps = {
	event: ContentViewEvent
	slug: string
	title: string
}

/**
 * Captures a content-view event once per piece of content.
 *
 * Mounted from the server component that renders the content, so the slug and
 * title come from the same Sanity fetch that renders the page — no second
 * query, and no risk of the analytics disagreeing with what was displayed.
 *
 * PostHog's own `$pageview` already records that a URL was visited. This exists
 * because `$pageview` carries only the path: reporting on it means parsing
 * slugs out of URLs and joining back to Sanity for titles.
 */
export function TrackContentView({ event, slug, title }: TrackContentViewProps) {
	// Keyed on the content rather than a plain boolean: App Router reuses this
	// component across navigations within the same route, so a boolean would
	// suppress the event for every article after the first. The key also makes
	// this idempotent under StrictMode's double-invoked effects.
	const lastCaptured = useRef<string | null>(null)

	useEffect(() => {
		const key = `${event}:${slug}`
		if (lastCaptured.current === key) return

		lastCaptured.current = key
		capture(event, { slug, title })
	}, [event, slug, title])

	return null
}
