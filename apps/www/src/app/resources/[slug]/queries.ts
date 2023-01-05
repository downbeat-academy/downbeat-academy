import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client';
import { ResourcePayload } from './types';

export async function getResource({ slug }): Promise<ResourcePayload | undefined> {
  const resource = await sanityClient?.fetch(
    groq`
      *[_type == "resource" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
      }
    `,
    { slug, next: { revalidate: 60 } },
  )

  return resource
}

export async function getAllResourceSlugs(): Promise<Pick<ResourcePayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(
      groq`
        *[_type == "resource" && defined(slug.current)][].slug.current
      `
    )) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}