import type { BetterAuthOptions } from 'better-auth'
import { Resend } from 'resend'

import { VerifyEmail } from 'email/emails/index'

type BetterAuthVerificationArgs = Parameters<
	NonNullable<NonNullable<BetterAuthOptions['emailVerification']>['sendVerificationEmail']>
>[0]

interface SendVerificationEmailArgs {
	user: Pick<BetterAuthVerificationArgs['user'], 'email' | 'name'>
	/**
	 * The complete verification link, as better-auth builds it:
	 * `${baseURL}/verify-email?token=…&callbackURL=…`, where `baseURL` already
	 * includes `/api/auth`. It is absolute — use it as given. Prefixing the auth
	 * service URL onto it produced `…/api/authhttps://…`, a 404 (DBA-414).
	 */
	url: string
}

export async function sendVerificationEmail({ user, url }: SendVerificationEmailArgs) {
	try {
		const resend = new Resend(process.env.RESEND_API_KEY)

		const { data } = await resend.emails.send({
			from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
			to: user.email,
			subject: 'Verify your Downbeat Academy email address',
			react: VerifyEmail({
				name: user.name,
				verificationUrl: url,
			}),
		})

		console.log('Verification email sent:', data)
	} catch (error) {
		console.error('Failed to send verification email:', error)
		throw error
	}
}
