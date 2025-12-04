import * as React from 'react'
import {
	Head,
	Html,
	Preview,
	Hr,
	Section,
} from '@react-email/components'
import {
	Body,
	Container,
	Heading,
	Link,
	Text,
} from '../components'

type ContactFormEmailProps = {
	name: string
	email: string
	message: string
}

const ContactFormEmail = ({ name, email, message }: ContactFormEmailProps) => {
	const previewText: string = `${name} sent you a message through your website`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body>
				<Container background="primary" borderColor="primary" padding="medium">
					<Heading level="h1" color="brand">
						Downbeat Academy contact form submission
					</Heading>
					<Text size="base" color="primary">
						<strong>
							<Link href={`mailto:${email}`} color="brand">
								{name}
							</Link>{' '}
							sent you a message through the Downbeat Academy contact form.
						</strong>
					</Text>
					<Section style={messageContainer}>
						<Text size="base" color="primary">
							<strong>Message:</strong>
						</Text>
						<Text size="base" color="primary" style={{ whiteSpace: 'pre-wrap' }}>
							{message}
						</Text>
					</Section>
					<Hr style={hr} />
					<Text size="sm" color="muted">
						Downbeat Academy - Music Education for Everyone
					</Text>
				</Container>
			</Body>
		</Html>
	)
}

const messageContainer = {
	margin: '24px 0',
}

const hr = {
	borderColor: '#323a5c',
	margin: '20px 0',
}

export default ContactFormEmail
