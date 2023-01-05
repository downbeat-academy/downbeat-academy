import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client';
import { PagePayload } from './types';

export async function getPage({ slug }): Promise<PagePayload | undefined> {
  const page = await sanityClient?.fetch(
    groq`
      *[_type == "page" && slug.current == $slug][0] {
        _id,
        title,
        showTitle,
        "slug": slug.current,
        metadata,
        moduleContent
      }
    `,
    { slug, next: { revalidate: 60 } },
  )

  return page
}

export async function getAllPageSlugs(): Promise<Pick<PagePayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(
      groq`
        *[_type == "page" && defined(slug.current)][].slug.current
      `
    )) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}