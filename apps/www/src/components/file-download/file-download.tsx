import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'
import classnames from 'classnames'
import { Text } from 'cadence-core'
import { getSanityUrl } from '@utils/getSanityUrl'
import { Link } from '@components/link'
import { Button } from '@components/button'

import { FileDownloadForm } from './file-download-form'
import s from './file-download.module.scss'

import type { FileDownloadProps } from './types'

const FileDownload = async ({
	title,
	description,
	file,
}: FileDownloadProps) => {

	const session = await auth.api.getSession({
    headers: await headers()
  })
	const fileUrl = getSanityUrl(file.asset._ref)

	const classes = classnames([s['file_download--root']])

	return (
		<section className={classes}>
			<Text size="h5" tag="h5" type="expressive-headline" collapse>
				Download the resources for this article
			</Text>
			<Text size="body-base" tag="p" type="expressive-body" collapse>
				{description}
			</Text>
			<Text size="body-base" tag="p" type="expressive-body" collapse>
				<strong>Title: </strong>
				{title}
			</Text>
			{!session ? (
				<>
					<FileDownloadForm fileUrl={fileUrl} title={title} />
					<Text
						size="body-small"
						tag="p"
						type="expressive-body"
						color="faint"
						collapse
					>
						<Link href="/login">Login or create a free account</Link> to
						download the files directly.
					</Text>
				</>
			) : (
				<Button href={fileUrl} text="Download" variant="primary" />
			)}
		</section>
	)
}
export { FileDownload }

