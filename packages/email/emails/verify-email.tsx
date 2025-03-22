import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Link,
  Hr,
  Button,
} from '@react-email/components'

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
      <Body style={{ backgroundColor: '#ffffff', margin: '0 auto' }}>
        <Container style={{ padding: '20px', margin: '0 auto' }}>
          <Heading as="h1" style={{ color: '#111827', fontSize: '24px', fontWeight: '600', textAlign: 'left', margin: '30px 0' }}>
            Welcome to Downbeat Academy!
          </Heading>
          <Text style={{ color: '#374151', fontSize: '16px', margin: '16px 0' }}>
            Hi {name}, thanks for signing up! Please verify your email address to get started.
          </Text>
          <Button 
            href={verificationUrl}
            style={{
              backgroundColor: '#4F46E5',
              borderRadius: '6px',
              color: '#ffffff',
              display: 'inline-block',
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '100%',
              padding: '12px 24px',
              textDecoration: 'none',
              textAlign: 'center',
              margin: '24px 0',
            }}
          >
            Verify Email Address
          </Button>
          <Text style={{ color: '#374151', fontSize: '14px', margin: '16px 0' }}>
            Or copy and paste this link into your browser:
          </Text>
          <Text style={{ color: '#4F46E5', fontSize: '14px', margin: '16px 0', wordBreak: 'break-all' }}>
            <Link href={verificationUrl} style={{ color: '#4F46E5', textDecoration: 'underline' }}>
              {verificationUrl}
            </Link>
          </Text>
          <Hr style={{ margin: '24px 0', borderColor: '#E5E7EB' }} />
          <Text style={{ color: '#6B7280', fontSize: '14px', margin: '16px 0' }}>
            This link will expire in 24 hours. If you didn't sign up for Downbeat Academy, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default VerifyEmail 