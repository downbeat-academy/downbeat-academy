import {
  Head,
  Hr,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import * as React from 'react';
import { Button } from '../components/button';
import { Text } from '../components/text';
import { Heading } from '../components/heading';
import { Container } from '../components/container';
import { Body } from '../components/body';

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
      <Body>
        <Container background="primary" borderColor="primary">
          <Heading level="h1" color="brand">
            Reset Your Password
          </Heading>
          <Text size="base" color="primary">
            Hi {name},
          </Text>
          <Text size="base" color="primary">
            We received a request to reset your password for your Downbeat Academy account. Click the button below to choose a new password:
          </Text>
          <Section style={buttonContainer}>
            <Button 
              href={resetUrl}
              type="primary"
              size="medium"
            >
              Reset Password
            </Button>
          </Section>
          <Text size="base" color="primary">
            If you didn't request this password reset, you can safely ignore this email.
          </Text>
          <Text size="base" color="primary">
            This link will expire in 1 hour for security reasons.
          </Text>
          <Hr style={hr} />
          <Text size="sm" color="muted">
            Downbeat Academy - Music Education for Everyone
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const buttonContainer = {
  margin: '24px 0',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}; 