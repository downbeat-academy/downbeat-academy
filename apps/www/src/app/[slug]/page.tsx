import { getPage, getAllPageSlugs } from './queries'

export const dynamicParams = true

export async function generateStaticParams() {
  return await getAllPageSlugs()
}

export default async function Page({ params }) {
  const data = await getPage({ slug: params.slug })

  const {
    title,
    slug,
  } = data || {}

  return (
    <>
      <h1>{title}</h1>
    </>
  )
}