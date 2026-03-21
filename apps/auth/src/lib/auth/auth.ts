import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, organization, jwt } from 'better-auth/plugins'
import { oauthProvider } from '@better-auth/oauth-provider'
import { Resend } from 'resend'
import { authDb } from '@/lib/db/drizzle'
import * as authSchema from '@/lib/db/schema'
import {
	ac,
	admin as adminRole,
	educator,
	student,
	superAdmin,
} from '@/lib/auth/permissions'

// Email templates from shared package
import { VerifyEmail, ResetPasswordEmail } from 'email/emails/index'

// Security: Validate redirect URIs to prevent open redirect attacks
const TRUSTED_DOMAINS = [
	'downbeatacademy.com',
	'www.downbeatacademy.com',
	'auth.downbeatacademy.services',
	'links.downbeatacademy.services',
]

const isDevelopment = process.env.NODE_ENV === 'development'

export function validateRedirectUri(uri?: string): string | null {
	if (!uri) return null

	try {
		const url = new URL(uri)
		const hostname = url.hostname.toLowerCase()

		// In development, trust localhost on any port
		if (isDevelopment && hostname === 'localhost') {
			return uri
		}

		if (TRUSTED_DOMAINS.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))) {
			return uri
		}
	} catch {
		// Invalid URL
	}

	return null
}

export function createAuth() {
	const isDev = process.env.NODE_ENV === 'development'
	const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3002'
	const defaultRedirectUrl = process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000'

	return betterAuth({
		appName: 'Downbeat Academy',
		secret: process.env.BETTER_AUTH_SECRET,
		baseURL: authServiceUrl,

		// CRITICAL: Trusted origins for cross-origin requests
		trustedOrigins: [
			'https://downbeatacademy.com',
			'https://www.downbeatacademy.com',
			'https://auth.downbeatacademy.services',
			'https://links.downbeatacademy.services',
			// Add localhost for development
			...(isDev
				? ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
				: []),
		],

		// Cross-subdomain cookie configuration
		// In dev, set domain to localhost so cookies are shared across ports (3000, 3002)
		// In prod, use .downbeatacademy.com for all subdomains
		advanced: {
			crossSubDomainCookies: {
				enabled: true,
				domain: isDev ? 'localhost' : '.downbeatacademy.com',
			},
			defaultCookieAttributes: {
				sameSite: 'lax',
				secure: !isDev,
				httpOnly: true,
			},
			useSecureCookies: !isDev,
		},

		database: drizzleAdapter(authDb, {
			provider: 'pg',
			schema: authSchema,
		}),

		emailAndPassword: {
			enabled: true,
			autoSignIn: true,
			requireEmailVerification: true,
			resetPasswordPath: '/update-password',
			forgetPasswordPath: '/api/auth/forget-password',
			sendResetPassword: async ({ user, url, token }, request) => {
				try {
					const resend = new Resend(process.env.RESEND_API_KEY)
					const baseUrl = authServiceUrl.replace(/\/$/, '')
					const fullUrl = `${baseUrl}/update-password?token=${token}`

					const { data } = await resend.emails.send({
						from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
						to: user.email,
						subject: 'Reset your Downbeat Academy password',
						react: ResetPasswordEmail({
							name: user.name,
							resetUrl: fullUrl,
						}),
					})

					console.log('Password reset email sent:', data)
				} catch (error) {
					console.error('Failed to send password reset email:', error)
					throw error
				}
			},
		},

		emailVerification: {
			sendOnSignUp: true,
			autoSignInAfterVerification: true,
			redirectAfterVerification: defaultRedirectUrl,
			sendVerificationEmail: async ({ user, url, token }, request) => {
				try {
					const resend = new Resend(process.env.RESEND_API_KEY)
					const baseUrl = authServiceUrl.replace(/\/$/, '')
					const fullUrl = `${baseUrl}/api/auth${url}`

					const { data } = await resend.emails.send({
						from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
						to: user.email,
						subject: 'Verify your Downbeat Academy email address',
						react: VerifyEmail({
							name: user.name,
							verificationUrl: fullUrl,
						}),
					})

					console.log('Verification email sent:', data)
				} catch (error) {
					console.error('Failed to send verification email:', error)
					throw error
				}
			},
		},

		plugins: [
			jwt(),
			oauthProvider({
				loginPage: '/sign-in',
				consentPage: '/consent',
				accessTokenExpiresIn: 3600,
				refreshTokenExpiresIn: 30 * 24 * 3600,
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
