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

type FileDownloadProps = {
	file: string
	title: string
}

const FileDownload = ({ file, title }: FileDownloadProps) => {
	const previewText = `Your download for ${title} from Downbeat Academy is here!`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={{ backgroundColor: '#ffffff', margin: '0 auto' }}>
				<Container style={{ padding: '20px', margin: '0 auto' }}>
					<Heading level="h1" color="primary">
						Your download is here!
					</Heading>
					<Hr style={{ margin: '24px 0', borderColor: '#E5E7EB' }} />
					<Text size="base" color="primary">
						<strong>
							<a href={file} download style={{ color: '#4F46E5', textDecoration: 'none' }}>
								{title}
							</a>
						</strong>
					</Text>
				</Container>
			</Body>
		</Html>
	)
}

export default FileDownload
