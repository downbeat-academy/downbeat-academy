import DefaultHead from '@app/defaultHead'
import { getArticle } from './page'

export default async function Head({ params }) {

  const article = await getArticle({ slug: params.slug })

  const {
    title,
  } = article

  return (
    <>
      <DefaultHead />
      <title>{`${title} | Downbeat Academy`}</title>
    </>
  )
}