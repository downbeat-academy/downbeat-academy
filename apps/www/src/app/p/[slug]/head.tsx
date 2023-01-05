import DefaultHead from '@app/defaultHead'
import { getLandingPage } from './page'

export default async function Head({ params }) {
  const landingPage = await getLandingPage({ slug: params.slug })

  const {
    title
  } = landingPage || {}

  return (
    <>
      <DefaultHead />
      <title>{`${title} | Downbeat Academy`}</title>
    </>
  )
}