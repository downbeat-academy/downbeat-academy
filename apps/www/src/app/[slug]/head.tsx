import { getPage } from "./queries"
import DefaultHead from '@app/defaultHead'

export default async function Head({ params }) {

  const page = await getPage({ slug: params.slug })

  const {
    title,
    description
  } = page.metadata || {}

  return (
    <>
      <DefaultHead />
      <title>{`${title} | Downbeat Academy`}</title>
      <meta name='description' content={description} />
    </>
  )
}