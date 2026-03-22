import type { Role, AdminRole } from './types'
import { ADMIN_ROLES } from './types'

type AuthInstance = {
	api: {
		getSession: (opts: { headers: Headers }) => Promise<any>
	}
}

type RedirectFn = (path: string) => never

type GuardOptions = {
	/** The auth instance from the app */
	auth: AuthInstance
	/** Next.js headers() function */
	getHeaders: () => Promise<Headers>
	/** Next.js redirect() function */
	redirect: RedirectFn
	/** Path to redirect unauthenticated users to (default: '/sign-in') */
	signInPath?: string
	/** Path to redirect unauthorized users to (default: '/') */
	unauthorizedPath?: string
}

/**
 * Creates role-based route guard functions bound to an app's auth instance.
 *
 * Usage:
 *   const { requireAuth, requireRole, requireAdmin } = createGuards({
 *     auth, getHeaders: () => headers(), redirect
 *   })
 *
 *   // In a server component:
 *   const session = await requireAdmin('/admin')
 */
export function createGuards(options: GuardOptions) {
	const {
		auth,
		getHeaders,
		redirect,
		signInPath = '/sign-in',
		unauthorizedPath = '/',
	} = options

	/**
	 * Require authentication. Redirects to sign-in if no session.
	 */
	async function requireAuth(currentPath: string) {
		const session = await auth.api.getSession({
			headers: await getHeaders(),
		})

		if (!session) {
			const callbackURL = encodeURIComponent(currentPath)
			redirect(`${signInPath}?callbackURL=${callbackURL}`)
		}

		return session
	}

	/**
	 * Require a specific role. Redirects if not authenticated or role mismatch.
	 */
	async function requireRole(currentPath: string, allowedRoles: Role[]) {
		const session = await requireAuth(currentPath)

		const userRole = session.user?.role as Role | undefined
		if (!userRole || !allowedRoles.includes(userRole)) {
			redirect(unauthorizedPath)
		}

		return session
	}

	/**
	 * Require admin or superAdmin role.
	 */
	async function requireAdmin(currentPath: string) {
		return requireRole(currentPath, [...ADMIN_ROLES])
	}

	return { requireAuth, requireRole, requireAdmin }
}
