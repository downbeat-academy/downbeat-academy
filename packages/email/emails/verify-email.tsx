import * as React from 'react'
import {
  Head,
  Html,
  Preview,
  Link,
  Hr,
} from '@react-email/components'
import { Button } from '../components/button'
import { Text } from '../components/text'
import { Heading } from '../components/heading'
import { Body } from '../components/body'
import { Container } from '../components/container'

type VerifyEmailProps = {
  name: string
  verificationUrl: string
}

const VerifyEmail = ({ name, verificationUrl }: VerifyEmailProps) => {
  const previewText = `Verify your email address for Downbeat Academy`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body>
        <Container background="primary" borderColor="primary" padding="medium">
          <Heading level="h1" color="brand">
            Welcome to Downbeat Academy!
          </Heading>
          <Text size="base" color="primary">
            Hi {name}, thanks for signing up! Please verify your email address to get started.
          </Text>
          <Button 
            href={verificationUrl}
            type="primary"
            size="medium"
          >
            Verify Email Address
          </Button>
          <Text size="base" color="primary">
            Or copy and paste this link into your browser:
          </Text>
          <Text size="base" color="brand" style={{ wordBreak: 'break-all' }}>
            <Link href={verificationUrl} style={{ color: '#2723d8', textDecoration: 'underline' }}>
              {verificationUrl}
            </Link>
          </Text>
          <Hr style={{ margin: '24px 0', borderColor: '#323a5c' }} />
          <Text size="sm" color="muted">
            This link will expire in 24 hours. If you didn't sign up for Downbeat Academy, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default VerifyEmail 