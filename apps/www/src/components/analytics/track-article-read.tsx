'use client'

import { useEffect, useRef } from 'react'
import { capture } from '@lib/posthog/capture'

export type TrackArticleReadProps = {
	slug: string
	title: string
	/** From `calculateReadingLength`, the same estimate shown by `ReadingLength`. */
	readingTimeMinutes: number
}

/**
 * Captures `article_read` when the reader reaches the end of the article.
 *
 * "Read" here means *reached the bottom* — a deliberately simple, explainable
 * definition. Paired with `article_viewed` it gives a completion rate, which is
 * the question actually worth asking of an education site: not how many people
 * landed on a lesson, but how many finished it.
 *
 * It is a proxy, not proof of reading. Someone who scrolls straight to the
 * bottom counts. That is an acceptable overcount; the alternatives (scroll-depth
 * sampling, time-on-page heuristics) are more code and no more honest.
 *
 * Renders a zero-height sentinel at the end of the article and watches it,
 * rather than measuring scroll position, so it stays correct regardless of page
 * length, zoom, or viewport.
 */
export function TrackArticleRead({
	slug,
	title,
	readingTimeMinutes,
}: TrackArticleReadProps) {
	const sentinelRef = useRef<HTMLDivElement>(null)
	const lastCaptured = useRef<string | null>(null)

	useEffect(() => {
		const sentinel = sentinelRef.current
		if (!sentinel) return

		// Older browsers without IntersectionObserver simply never fire the
		// event. Undercounting is the right failure here — a fabricated
		// completion would be worse than a missing one.
		if (typeof IntersectionObserver === 'undefined') return

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue

				const key = `article_read:${slug}`
				if (lastCaptured.current === key) return

				lastCaptured.current = key
				capture('article_read', {
					slug,
					title,
					reading_time_minutes: readingTimeMinutes,
				})

				observer.disconnect()
			}
		})

		observer.observe(sentinel)

		return () => observer.disconnect()
	}, [slug, title, readingTimeMinutes])

	return <div ref={sentinelRef} aria-hidden="true" />
}
