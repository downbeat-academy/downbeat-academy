import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'
import { Flex, Text } from 'cadence-core'
import type { NewsletterSignupProps } from './types'

import s from './newsletter-signup.module.css'
import { NewsletterSignupForm } from './newsletter-signup-form'

const NewsletterSignup = async ({
	title,
	description,
}: NewsletterSignupProps) => {
	const session = await auth.api.getSession({
		headers: headers(),
	})

	if (!session) {
		return (
			<section className={s['newsletter-signup']}>
				<Flex tag="div" direction="column" gap="small">
					<Text
						tag="h2"
						size="h5"
						type="expressive-headline"
						color="brand"
						collapse
					>
						{title}
					</Text>
					<Text
						tag="p"
						size="body-base"
						type="expressive-body"
						color="primary"
						collapse
					>
						{description}
					</Text>
				</Flex>
				<NewsletterSignupForm />
			</section>
		)
	} else return null
}

export { NewsletterSignup }
