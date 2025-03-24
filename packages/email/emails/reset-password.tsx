import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordEmailProps {
  name?: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({
  name = '',
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Downbeat Academy password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset Your Password</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            We received a request to reset your password for your Downbeat Academy account. Click the button below to choose a new password:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>
          <Text style={text}>
            If you didn't request this password reset, you can safely ignore this email.
          </Text>
          <Text style={text}>
            This link will expire in 1 hour for security reasons.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Downbeat Academy - Music Education for Everyone
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const text = {
  color: '#1a1a1a',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const buttonContainer = {
  margin: '24px 0',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '100%',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#898989',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '12px 0',
}; 