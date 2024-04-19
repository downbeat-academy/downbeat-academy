import classnames from 'classnames'
import { Text } from 'components/text'
import { getSanityUrl } from 'utils/getSanityUrl'
import { readUserSession } from 'actions/auth/read-user-session'
import { Link } from 'components/link'
import { Button } from 'components/button'

import { FileDownloadForm } from './file-download-form'
import s from './file-download.module.scss'

import type { FileDownloadProps } from './types'

const FileDownload = async ({
  title,
  description,
  file
}: FileDownloadProps) => {

  const fileUrl = getSanityUrl(file.asset._ref)

  const classes = classnames([
    s['file_download--root']
  ])

  const { data } = await readUserSession()

  return (
    <section className={classes}>
      <Text size='h5' tag='h5' type='expressive-headline' collapse>Download the resources for this article</Text>
      <Text size='body-base' tag='p' type='expressive-body' collapse>{description}</Text>
      <Text size='body-base' tag='p' type='expressive-body' collapse><strong>Title: </strong>{title}</Text>
      {!data?.user ? (
        <>
          <FileDownloadForm fileUrl={fileUrl} title={title} />
          <Text size='body-small' tag='p' type='expressive-body' color='faint' collapse><Link href='/login'>Login or create a free account</Link> to download the files directly.</Text>
        </>
      ) : (
        <Button href={fileUrl} text='Download' variant='primary' />
      )}
    </section>
  )
}

export { FileDownload }