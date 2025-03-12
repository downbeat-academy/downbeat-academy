import { redirect } from 'next/navigation'
import { readUserSession } from '@actions/supabase-auth/read-user-session'
import { Text } from 'cadence-core'
import * as Tabs from '@components/tabs'
import { Link } from '@components/link'
import s from './login.module.scss'

import type { Metadata } from 'next'

import { LoginForm } from './login-form'
import { SignUpForm } from './sign-up-form'

export const metadata: Metadata = {
	title: 'Login | Downbeat Academy',
	description: 'Login to your Downbeat Academy account.',
}

export default async function LoginPage() {
	const { data } = await readUserSession()

	if (data?.user) {
		redirect('/account')
	}

	return (
		<section className={s['login--wrapper']}>
			<div className={s['login--wrapper-inner']}>
				<Tabs.Root defaultValue="Login">
					<Tabs.List>
						<Tabs.Trigger value="Login">Login</Tabs.Trigger>
						<Tabs.Trigger value="Sign up">Sign up</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="Login" className={s['login--content']}>
						<Text type="expressive-headline" size="h4" tag="h1" color="brand">
							Login to your Downbeat Academy account
						</Text>
						<Text
							type="productive-body"
							size="body-base"
							tag="p"
							color="primary"
						>
							Forgot your password?{' '}
							<Link href="/reset-password">Reset it here</Link>
						</Text>
						<LoginForm />
					</Tabs.Content>
					<Tabs.Content value="Sign up" className={s['login--content']}>
						<Text type="expressive-headline" size="h4" tag="h1" color="brand">
							Sign up for a free Downbeat Academy account
						</Text>
						<SignUpForm />
					</Tabs.Content>
				</Tabs.Root>
			</div>
			<Link href="/">Back to home</Link>
		</section>
	)
}
