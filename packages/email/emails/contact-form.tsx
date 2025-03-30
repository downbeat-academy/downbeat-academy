import * as React from 'react'
import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Hr,
} from '@react-email/components'
import { Text } from '../components/text'
import { Heading } from '../components/heading'

type ContactFormEmailProps = {
	name: string
	email: string
	message: string
}

const ContactFormEmail = ({ name, email, message }: ContactFormEmailProps) => {
	const previewText = `${name} sent you a message through your website`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={{ backgroundColor: '#ffffff', margin: '0 auto' }}>
				<Container style={{ padding: '20px', margin: '0 auto' }}>
					<Heading level="h1" color="brand">
						Downbeat Academy contact form submission
					</Heading>
					<Hr style={{ margin: '24px 0', borderColor: '#E5E7EB' }} />
					<Text size="base" color="primary">
						<strong>
							<a href={`mailto:${email}`} style={{ color: '#4F46E5', textDecoration: 'none' }}>
								{name}
							</a>{' '}
							sent you a message through the Downbeat Academy contact form.
						</strong>
					</Text>
					<Text size="base" color="primary">
						<strong>Message:</strong>
					</Text>
					<Text size="base" color="primary" style={{ whiteSpace: 'pre-wrap' }}>
						{message}
					</Text>
				</Container>
			</Body>
		</Html>
	)
}

export default ContactFormEmail
