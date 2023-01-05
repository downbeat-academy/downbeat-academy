import DefaultHead from '@app/defaultHead'
import { getContributor } from './page'

export default async function Head({ params }) {
  const contributor = await getContributor({ slug: params.slug })

  const {
    name
  } = contributor || {}

  return (
    <>
      <DefaultHead />
      <title>{`${name} | Downbeat Academy`}</title>
    </>
  )
}