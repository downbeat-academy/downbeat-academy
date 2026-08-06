'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

interface PostHogIdentifyProps {
	userId: string
	name: string | null | undefined
	email: string | null | undefined
	role: string | null | undefined
	isAdmin: boolean
}

/**
 * Associates the current PostHog person with the signed-in user.
 *
 * `distinct_id` is the better-auth `user.id`, which is also what `apps/auth`
 * captures its funnel events against — that shared id is what stitches events
 * from the two apps onto one person. They sit on different domains
 * (`downbeatacademy.com` and `auth.downbeatacademy.services`), so there is no
 * shared cookie to rely on and no anonymous id in common.
 */
export function PostHogIdentify({
	userId,
	name,
	email,
	role,
	isAdmin,
}: PostHogIdentifyProps) {
	useEffect(() => {
		posthog.identify(userId, {
			name: name ?? undefined,
			email: email ?? undefined,
			role: role ?? undefined,
			// Without this there is no way to exclude staff traffic from product
			// metrics — a small team browsing its own site is a large fraction of
			// its own numbers.
			is_admin: isAdmin,
		})
	}, [userId, name, email, role, isAdmin])

	return null
}
