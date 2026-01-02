import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/lib/db/drizzle'
import * as authSchema from '@/lib/db/schema/auth'

// Parse allowed emails from environment variable
const ALLOWED_EMAILS = (process.env.ALLOWED_EMAILS || '')
	.split(',')
	.map((e) => e.trim().toLowerCase())
	.filter(Boolean)

export const auth = betterAuth({
	appName: 'Cadence Links',
	secret: process.env.BETTER_AUTH_SECRET,
	baseUrl: process.env.NEXT_PUBLIC_APP_URL,
	trustedOrigins: [
		'https://links.downbeatacademy.services',
		'https://dwnbe.at',
		'https://downbeatacademy.services',
		'https://downbeatacade.my',
	],
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: authSchema,
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: false,
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					// Check if email is in the allowlist
					const email = user.email.toLowerCase()
					if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(email)) {
						throw new Error('Email not allowed. Contact an administrator for access.')
					}
					return { data: user }
				},
			},
		},
	},
	plugins: [nextCookies()],
})
