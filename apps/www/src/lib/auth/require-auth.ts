import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from './auth'

const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3002'
const PROJECT_URL = process.env.NEXT_PUBLIC_PROJECT_URL || 'http://localhost:3000'

/**
 * Require authentication for a page. If not authenticated, redirects to auth service.
 * @param currentPath The current path to redirect back to after authentication
 * @returns The session if authenticated
 */
export async function requireAuth(currentPath: string) {
	const session = await auth.api.getSession({
		headers: await headers()
	})

	if (!session) {
		const redirectUrl = encodeURIComponent(`${PROJECT_URL}${currentPath}`)
		redirect(`${AUTH_SERVICE_URL}/sign-in?redirect_uri=${redirectUrl}`)
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

/**
 * Get the URL to redirect to the auth service sign-in page
 * @param returnPath The path to return to after authentication
 */
export function getSignInUrl(returnPath: string = '/') {
	const redirectUrl = encodeURIComponent(`${PROJECT_URL}${returnPath}`)
	return `${AUTH_SERVICE_URL}/sign-in?redirect_uri=${redirectUrl}`
}

/**
 * Get the URL to redirect to the auth service sign-up page
 * @param returnPath The path to return to after authentication
 */
export function getSignUpUrl(returnPath: string = '/') {
	const redirectUrl = encodeURIComponent(`${PROJECT_URL}${returnPath}`)
	return `${AUTH_SERVICE_URL}/sign-in?redirect_uri=${redirectUrl}`
}
