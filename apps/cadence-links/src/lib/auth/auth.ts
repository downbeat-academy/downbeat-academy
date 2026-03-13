import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, organization, genericOAuth } from 'better-auth/plugins'
import { authDb } from '@/lib/db/drizzle'
import { authSchema } from '@/lib/db/schema'
import {
	ac,
	admin as adminRole,
	educator,
	student,
	superAdmin,
} from '@/lib/auth/permissions'

export function createAuth() {
	const isDev = process.env.NODE_ENV === 'development'
	const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3002'
	const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'

	return betterAuth({
		appName: 'Cadence Links',
		secret: process.env.BETTER_AUTH_SECRET,
		baseUrl: appUrl,

		advanced: {
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
			genericOAuth({
				config: [{
					providerId: 'downbeat-auth',
					clientId: process.env.OAUTH_CLIENT_ID!,
					clientSecret: process.env.OAUTH_CLIENT_SECRET!,
					discoveryUrl: `${authServiceUrl}/api/auth/.well-known/openid-configuration`,
					pkce: true,
					scopes: ['openid', 'profile', 'email'],
					redirectURI: `${appUrl}/api/auth/oauth2/callback/downbeat-auth`,
				}],
			}),
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
let authInstance: ReturnType<typeof createAuth> | null = null

export function getAuth() {
	if (!authInstance) {
		authInstance = createAuth()
	}
	return authInstance
}

// For backward compatibility
export const auth = getAuth()
