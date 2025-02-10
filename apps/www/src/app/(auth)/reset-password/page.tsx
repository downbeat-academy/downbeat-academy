import { redirect } from 'next/navigation'
import { readUserSession } from '@actions/auth/read-user-session'
import { Text } from 'cadence-core'
import { ResetPasswordForm } from './send-password-reset'
import s from './reset-password-page.module.scss'

export default async function ResetPasswordPage() {
	// Read the user session
	const { data, error } = await readUserSession()
	// If the user session exists, redirect to the account page
	if (!!data?.user) {
		redirect('/account')
	}

	return (
		<section className={s.outer}>
			<article className={s.inner}>
				<Text tag="h1" size="h2" type="expressive-headline" color="brand">
					Reset your password
				</Text>
				<Text tag="p" size="body-base" color="primary" type="productive-body">
					Enter your email to recieve a reset password link.
				</Text>
				<ResetPasswordForm />
			</article>
		</section>
	)
}
