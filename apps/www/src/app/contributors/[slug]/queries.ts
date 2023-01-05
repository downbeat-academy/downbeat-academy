import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client';
import { ContributorPayload } from './types';

export async function getContributor({ slug }): Promise<ContributorPayload | undefined> {
  const contributor = await sanityClient?.fetch(
    groq`
      *[_type == "person" && slug.current == $slug][0] {
        _id,
        name,
        avatar,
        biography,
        instrument,
        "slug": slug.current,
        "content": *[
            references(^._id) 
            && _type != "page"
            && !(title match "Sample")
        ] {
            _id,
            title,
            "slug": slug.current,
        }
      }
    `,
    { slug, next: { revalidate: 60 } },
  )

  return contributor
}

export async function getAllContributorSlugs(): Promise<Pick<ContributorPayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(
      groq`
        *[_type == "person" && defined(slug.current)][].slug.current
      `
    )) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}