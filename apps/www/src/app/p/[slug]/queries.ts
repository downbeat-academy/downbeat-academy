import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client';
import { LandingPagePayload } from './types';

export async function getLandingPage({ slug }): Promise<LandingPagePayload | undefined> {
  const landingPage = await sanityClient?.fetch(
    groq`
      *[_type == "landingPage" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current
      }
    `,
    { slug, next: { revalidate: 60 } },
  )

  return landingPage
}

export async function getAllLandingPageSlugs(): Promise<Pick<LandingPagePayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(
      groq`
        *[_type == "landingPage" && defined(slug.current)][].slug.current
      `
    )) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}