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
import { Link } from '../components/link'

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
					<Text size="base" color="primary">
						<strong>
							<Link href={file} color="brand" download>
								{title}
							</Link>
						</strong>
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

const hr = {
	borderColor: '#323a5c',
	margin: '20px 0',
}

export default FileDownload
