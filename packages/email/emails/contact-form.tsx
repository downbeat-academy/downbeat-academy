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
} from '@react-email/components';

type ContactFormEmailProps = {
  name: string;
  email: string;
  message: string;
};

const ContactFormEmail = ({ name, email, message }: ContactFormEmailProps) => {
  const previewText = `${name} sent you a message through your website`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body>
        <Container>
          <Heading as='h1'>Downbeat Academy contact form submission</Heading>
          <Hr />
          <Text>
            <strong><Link href={`mailto:${email}`}>{name}</Link> sent you a message through the Downbeat Academy contact form.</strong>
          </Text>
          <Text><strong>Message:</strong></Text>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;