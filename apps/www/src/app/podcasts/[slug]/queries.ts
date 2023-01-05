import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client';
import { PodcastPayload } from './types';

export async function getPodcast({ slug }): Promise<PodcastPayload | undefined> {
  const podcast = await sanityClient?.fetch(
    groq`
      *[_type == "podcast" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current
      }
    `,
    { slug, next: { revalidate: 60 } },
  )

  return podcast
}

export async function getAllPodcastSlugs(): Promise<Pick<PodcastPayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(
      groq`
        *[_type == "podcast" && defined(slug.current)][].slug.current
      `
    )) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}