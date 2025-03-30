import * as React from 'react'
import {
	Head,
	Html,
	Preview,
	Hr,
	Section,
} from '@react-email/components'
import { Text } from '../components/text'
import { Heading } from '../components/heading'
import { Body } from '../components/body'
import { Container } from '../components/container'

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
			<Body>
				<Container background="primary" borderColor="primary" padding="medium">
					<Heading level="h1" color="brand">
						Downbeat Academy contact form submission
					</Heading>
					<Text size="base" color="primary">
						<strong>
							<a href={`mailto:${email}`} style={{ color: '#2723d8', textDecoration: 'none' }}>
								{name}
							</a>{' '}</strong>
							sent you a message through the Downbeat Academy contact form.
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
