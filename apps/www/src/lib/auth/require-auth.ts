import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from './auth'

/**
 * Require authentication for a page. If not authenticated, redirects to sign-in.
 * @param currentPath The current path to redirect back to after authentication
 * @returns The session if authenticated
 */
export async function requireAuth(currentPath: string) {
	const session = await auth.api.getSession({
		headers: await headers()
	})

	if (!session) {
		const callbackURL = encodeURIComponent(currentPath)
		redirect(`/sign-in?callbackURL=${callbackURL}`)
	}

	return session
}

/**
 * Get the current session without requiring authentication.
 * Returns null if not authenticated.
 */
export async function getOptionalSession() {
	return auth.api.getSession({
		headers: await headers()
	})
}
