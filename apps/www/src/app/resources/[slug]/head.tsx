import DefaultHead from '@app/defaultHead'
import { getResource } from './page'

export default async function Head({ params }) {
  const resource = await getResource({ slug: params.slug })

  const {
    title
  } = resource || {}

  return (
    <>
      <DefaultHead />
      <title>{`${title} | Downbeat Academy`}</title>
    </>
  )
}