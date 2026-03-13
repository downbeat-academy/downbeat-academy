import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from './auth'

/**
 * Require authentication for a page. If not authenticated, redirects to
 * the local sign-in page which triggers the OAuth flow with the auth service.
 * @param currentPath The current path to redirect back to after authentication
 * @returns The session if authenticated
 */
export async function requireAuth(currentPath: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		const callbackUrl = encodeURIComponent(currentPath)
		redirect(`/sign-in?callbackURL=${callbackUrl}`)
	}

	return session
}

/**
 * Get the current session without requiring authentication.
 * Returns null if not authenticated.
 */
export async function getOptionalSession() {
	return auth.api.getSession({
		headers: await headers(),
	})
}
