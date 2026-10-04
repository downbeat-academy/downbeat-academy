import 'server-only'

/**
 * The PostHog project `www` reports into. Not a secret: it appears in every
 * PostHog app URL. Overridable for a staging project.
 */
const DEFAULT_PROJECT_ID = '513825'

/**
 * The private API lives on `us.posthog.com`, not the `us.i.posthog.com`
 * ingestion host that `NEXT_PUBLIC_POSTHOG_HOST` points at.
 */
const DEFAULT_API_HOST = 'https://us.posthog.com'

export type DeletePersonResult =
	| { status: 'deleted' }
	| { status: 'skipped'; reason: string }
	| { status: 'failed'; error: string }

/**
 * Deletes a user's PostHog person, and their past events, by distinct id.
 *
 * `distinctId` must be the better-auth `user.id`, which is what both `www` and
 * `auth` identify people by.
 *
 * Needs `POSTHOG_PERSONAL_API_KEY`, a personal API key with the `person:write`
 * scope (`apps/www/scripts/verify-posthog-person-delete.sh` checks one). Without
 * it this is skipped rather than failed, so local and preview environments work
 * without the key.
 *
 * Never throws. PostHog queues the deletion and processes it asynchronously, so
 * `deleted` means "accepted", not "already gone".
 */
export async function deletePostHogPerson(
	distinctId: string
): Promise<DeletePersonResult> {
	const apiKey = process.env.POSTHOG_PERSONAL_API_KEY
	if (!apiKey) {
		return { status: 'skipped', reason: 'POSTHOG_PERSONAL_API_KEY is not set' }
	}

	const host = process.env.POSTHOG_API_HOST ?? DEFAULT_API_HOST
	const projectId = process.env.POSTHOG_PROJECT_ID ?? DEFAULT_PROJECT_ID

	try {
		const res = await fetch(
			`${host}/api/environments/${projectId}/persons/bulk_delete/`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					distinct_ids: [distinctId],
					delete_events: true,
				}),
			}
		)

		if (!res.ok) {
			return { status: 'failed', error: `PostHog responded ${res.status}` }
		}

		return { status: 'deleted' }
	} catch (err) {
		return {
			status: 'failed',
			error: err instanceof Error ? err.message : 'PostHog request failed',
		}
	}
}
