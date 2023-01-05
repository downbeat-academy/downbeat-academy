import { getCategory, getAllCategorySlugs } from './queries'

export const dynamicParams = true

export async function generateStaticParams() {
  return await getAllCategorySlugs()
}

export default async function Category({ params }) {

  const data = await getCategory({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}