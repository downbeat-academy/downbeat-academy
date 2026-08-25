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

import { createAuthMiddleware } from 'better-auth/api'

import {
	captureAuthEvent,
	resolveAuthMethod,
	resolveOAuthGrant,
} from '@/lib/analytics'

// Security: Validate redirect URIs to prevent open redirect attacks
const TRUSTED_DOMAINS = [
	'downbeatacademy.com',
	'www.downbeatacademy.com',
	'auth.downbeatacademy.services',
	'links.downbeatacademy.services',
]

/**
 * Reads one property off a value better-auth types as `unknown` (request bodies
 * and endpoint return values), without asserting a shape we do not control.
 */
function readField(source: unknown, key: string): unknown {
	if (typeof source !== 'object' || source === null) return undefined
	return (source as Record<string, unknown>)[key]
}

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

		// Cookie configuration
		// No cross-subdomain sharing needed — all consumer apps use OAuth
		advanced: {
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

		// Analytics for the authentication funnel.
		//
		// These hooks are the reason the funnel is measurable at all: sign-in
		// happens here, in the OAuth provider, not in the consumer apps. The
		// previous instrumentation lived in `apps/www` on its disabled
		// email-auth path and never fired once.
		//
		// Hooking the database rather than the route handlers means every entry
		// point is covered — email and OAuth alike — without having to find and
		// annotate each one.
		databaseHooks: {
			user: {
				create: {
					async after(user, context) {
						captureAuthEvent({
							distinctId: user.id,
							event: 'sign_up_completed',
							properties: {
								method: resolveAuthMethod(context?.path) ?? 'email',
							},
						})
					},
				},
			},
			session: {
				create: {
					async after(session, context) {
						const method = resolveAuthMethod(context?.path)

						// A session created by anything other than a recognised
						// sign-in entry point is not a sign-in — session refreshes
						// would otherwise inflate the count.
						if (!method) return

						captureAuthEvent({
							distinctId: session.userId,
							event: 'sign_in_completed',
							properties: { method },
						})
					},
				},
			},
		},

		// `oauth_authorization_granted` cannot hang off a database hook like the
		// events above: `databaseHooks` only cover better-auth's base models, and
		// the OAuth token row belongs to the provider plugin. The token endpoint
		// is the honest anchor anyway — it is where a consumer app stops being a
		// redirect and actually receives credentials for a user.
		hooks: {
			after: createAuthMiddleware(async (ctx) => {
				if (ctx.path !== '/oauth2/token') return

				const grantType = readField(ctx.body, 'grant_type')
				const idToken = readField(ctx.context.returned, 'id_token')

				const grant = resolveOAuthGrant({
					path: ctx.path,
					grantType,
					idToken,
				})

				if (grant) {
					captureAuthEvent({
						distinctId: grant.distinctId,
						event: 'oauth_authorization_granted',
						properties: { client_id: grant.client_id },
					})
					return
				}

				// A code exchange that produced no usable grant is either a
				// failed request or a shape this hook no longer understands.
				// Say so in the logs rather than going quiet: an analytics event
				// that stops firing without a word is the exact failure this
				// instrumentation exists to catch, and it would otherwise look
				// identical to nobody signing in.
				if (grantType === 'authorization_code') {
					console.warn(
						'[analytics] /oauth2/token succeeded but no OAuth grant could be resolved — oauth_authorization_granted was not captured',
					)
				}
			}),
		},

		emailAndPassword: {
			enabled: true,
			autoSignIn: true,
			requireEmailVerification: true,
			resetPasswordPath: '/update-password',
			forgetPasswordPath: '/api/auth/forget-password',
			// Fires only after the password has actually been changed, so the
			// pair of events gives the completion rate of the reset flow.
			// `password_reset_requested` alone cannot tell "reset it" apart from
			// "never opened the email".
			//
			// This is the token-based reset route only. `updatePasswordAction`
			// changes a password for an already signed-in user, which is a
			// different action and goes through the internal adapter rather than
			// this endpoint — deliberately not reported as a reset.
			onPasswordReset: async ({ user }) => {
				captureAuthEvent({
					distinctId: user.id,
					event: 'password_reset_completed',
				})
			},
			sendResetPassword: async ({ user, url, token }, request) => {
				captureAuthEvent({
					distinctId: user.id,
					event: 'password_reset_requested',
				})

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
				silenceWarnings: {
					oauthAuthServerConfig: true,
				},
				// Include role in ID token and userinfo for consumer apps
				customIdTokenClaims: ({ user }) => ({
					role: user.role,
				}),
				customUserInfoClaims: ({ user }) => ({
					role: user.role,
				}),
			}),
			admin({
				ac: ac as any,
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
