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
  Button,
  Container,
  Heading,
  Link,
  Text,
} from '../components'

type VerifyEmailProps = {
  name: string
  verificationUrl: string
}

const VerifyEmail = ({ name, verificationUrl }: VerifyEmailProps) => {
  const previewText: string = `Verify your email address for Downbeat Academy`

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
          <Section style={buttonContainer}>
            <Button 
              href={verificationUrl}
              type="primary"
              size="medium"
            >
              Verify Email Address
            </Button>
          </Section>
          <Text size="base" color="primary">
            Or copy and paste this link into your browser:
          </Text>
          <Text size="base" style={{ wordBreak: 'break-all' }}>
            <Link href={verificationUrl} color="brand">
              {verificationUrl}
            </Link>
          </Text>
          <Hr style={hr} />
          <Text size="sm" color="muted">
            Downbeat Academy - Music Education for Everyone
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const buttonContainer = {
  margin: '24px 0',
};

const hr = {
  borderColor: '#323a5c',
  margin: '20px 0',
};

export default VerifyEmail 