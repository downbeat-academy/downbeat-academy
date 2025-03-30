import * as React from 'react'
import {
	Head,
	Html,
	Preview,
	Hr,
} from '@react-email/components'
import { Text } from '../components/text'
import { Heading } from '../components/heading'
import { Body } from '../components/body'
import { Container } from '../components/container'

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
			<Body>
				<Container background="primary" borderColor="primary" padding="medium">
					<Heading level="h1" color="brand">
						Your download is here!
					</Heading>
					<Hr style={{ margin: '24px 0', borderColor: '#323a5c' }} />
					<Text size="base" color="primary">
						<strong>
							<a href={file} download style={{ color: '#2723d8', textDecoration: 'none' }}>
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
