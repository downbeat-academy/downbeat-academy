import { createClient } from 'next-sanity'

import { articlesBySlugQuery } from '@lib/sanity.queries'

import type { ArticlePayload } from '@types'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
})

export async function getArticleBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<ArticlePayload | undefined> {
  return await sanityClient?.fetch(
    articlesBySlugQuery,
    { slug },
  )
}