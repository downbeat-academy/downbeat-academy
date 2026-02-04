import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, organization } from 'better-auth/plugins'
import { authDb } from '@/lib/db/drizzle'
import { authSchema } from '@/lib/db/schema'
import {
	ac,
	admin as adminRole,
	educator,
	student,
	superAdmin,
} from '@/lib/auth/permissions'

// This is a READ-ONLY configuration for session validation
// All auth operations (sign-in, sign-up, etc.) are handled by the auth service at auth.downbeatacademy.com
export function createAuth() {
	const isDev = process.env.NODE_ENV === 'development'
	const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3002'

	return betterAuth({
		appName: 'Downbeat Academy',
		secret: process.env.BETTER_AUTH_SECRET,
		baseUrl: authServiceUrl,

		// Cross-subdomain cookie configuration (must match auth service)
		// Only enable in production when we have proper domains
		advanced: {
			crossSubDomainCookies: isDev
				? { enabled: false }
				: {
					enabled: true,
					domain: '.downbeatacademy.com',
				},
			defaultCookieAttributes: {
				sameSite: 'lax',
				secure: !isDev,
				httpOnly: true,
			},
		},

		database: drizzleAdapter(authDb, {
			provider: 'pg',
			schema: authSchema,
		}),

		plugins: [
			admin({
				ac: ac,
				roles: {
					student,
					educator,
					admin: adminRole,
					superAdmin,
				},
				defaultRole: 'student',
			}),
			organization(),
			// nextCookies must be the last plugin in the array.
			nextCookies(),
		],
	})
}

// Lazy initialize auth
let authInstance: ReturnType<typeof betterAuth> | null = null

export function getAuth() {
	if (!authInstance) {
		authInstance = createAuth()
	}
	return authInstance
}

// For backward compatibility
export const auth = getAuth()
