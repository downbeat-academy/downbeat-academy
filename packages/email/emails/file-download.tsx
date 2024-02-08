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

type FileDownloadProps = {
  file: string;
  title: string;
};

const FileDownload = ({ file, title, }: FileDownloadProps) => {
  const previewText = `🎼 Your download from Downbeat Academy is here!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body>
        <Container>
          <Heading as='h1'>Your download is here!</Heading>
          <Hr />
          <Text>
            <strong><Link href={file} download>{title}</Link></strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default FileDownload;