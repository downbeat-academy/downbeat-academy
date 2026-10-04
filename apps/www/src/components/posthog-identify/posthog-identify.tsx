'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

import { useAnalyticsConsent } from '@lib/consent'

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
 *
 * Only once the visitor has accepted analytics cookies. Signing in is not
 * consent, and identifying in cookieless mode would attach a persistent id to
 * a visitor who declined one. If they accept later in the visit, this re-runs
 * and identifies then — after `instrumentation-client.ts` has already opted
 * PostHog in, because its listener was registered first.
 */
export function PostHogIdentify({
	userId,
	name,
	email,
	role,
	isAdmin,
}: PostHogIdentifyProps) {
	const consent = useAnalyticsConsent()

	useEffect(() => {
		if (consent !== 'granted') return

		posthog.identify(userId, {
			name: name ?? undefined,
			email: email ?? undefined,
			role: role ?? undefined,
			// Without this there is no way to exclude staff traffic from product
			// metrics — a small team browsing its own site is a large fraction of
			// its own numbers.
			is_admin: isAdmin,
		})
	}, [consent, userId, name, email, role, isAdmin])

	return null
}
