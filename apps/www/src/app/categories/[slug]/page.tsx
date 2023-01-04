import { sanityClient } from '@lib/sanity.client'
import { categoriesBySlugQuery, categorySlugsQuery } from './queries'
import { CategoryPayload } from './types'

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = (await sanityClient.fetch<string[]>(categorySlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

async function getCategory({ slug }): Promise<CategoryPayload | undefined> {
  const category = await sanityClient?.fetch(
    categoriesBySlugQuery,
    { slug }
  )

  return category
}

export default async function Category({ params }) {

  const data = await getCategory({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}