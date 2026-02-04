import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, organization } from 'better-auth/plugins'
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
import VerifyEmail from '../../../../../packages/email/emails/verify-email'
import ResetPasswordEmail from '../../../../../packages/email/emails/reset-password'

// Security: Validate redirect URIs to prevent open redirect attacks
const TRUSTED_DOMAINS = [
	'downbeatacademy.com',
	'www.downbeatacademy.com',
	'auth.downbeatacademy.com',
]

export function validateRedirectUri(uri?: string): string | null {
	if (!uri) return null

	try {
		const url = new URL(uri)
		const hostname = url.hostname.toLowerCase()

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
		baseUrl: authServiceUrl,

		// CRITICAL: Trusted origins for cross-origin requests
		trustedOrigins: [
			'https://downbeatacademy.com',
			'https://www.downbeatacademy.com',
			'https://auth.downbeatacademy.com',
			// Add localhost for development
			...(isDev
				? ['http://localhost:3000', 'http://localhost:3002']
				: []),
		],

		// Cross-subdomain cookie configuration
		// Only enable in production when we have proper domains
		advanced: {
			crossSubDomainCookies: isDev
				? { enabled: false }
				: {
					enabled: true,
					domain: '.downbeatacademy.com', // Leading dot for all subdomains
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
