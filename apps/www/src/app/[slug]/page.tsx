import { sanityClient } from '@lib/sanity.client'
import { pagesBySlugQuery, pageSlugsQuery } from './queries'
import { PagePayload } from './types'

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = (await sanityClient.fetch<string[]>(pageSlugsQuery)) || []

  return slugs.map((slug) => ({ slug }))
}

export async function getPage({ slug }): Promise<PagePayload | undefined> {
  const page = await sanityClient?.fetch(
    pagesBySlugQuery,
    { slug, next: { revalidate: 60 } }
  )

  return page
}

export default async function Page({ params }) {
  const data = await getPage({ slug: params.slug })

  const {
    title,
    slug,
  } = data || {}

  return <h1>{title}</h1>
}