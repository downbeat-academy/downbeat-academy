import { UnsubscribeForm } from './unsubscribe-form'
import { Text } from '@components/text'
import s from './unsubscribe.module.scss'

export default function UnsubscribePage() {
	return (
		<section className={s['unsubscribe--wrapper']}>
			<div className={s['unsubscribe--wrapper-inner']}>
				<Text type="expressive-headline" size="h4" tag="h1" color="brand">
					Unsubscribe from our newsletter
				</Text>
				<Text type="expressive-body" size="body-base" color="primary">
					We&apos;re sorry to see you go. Please enter your email address to
					unsubscribe from our newsletter.
				</Text>
				<UnsubscribeForm />
			</div>
		</section>
	)
}
