import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client'
import { CategoryPayload } from './types'

export async function getCategory({ slug }): Promise<CategoryPayload | undefined> {
  const category = await sanityClient?.fetch(
    groq`
      *[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        "references": *[_type == "post" && references(^._id)] {
            _id,
            title,
            "slug": slug.current,
        }
      }
    `,
    { slug, next: { revalidate: 60 } },
  )

  return category
}

export async function getAllCategorySlugs(): Promise<Pick<CategoryPayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(
      groq`
        *[_type == "category" && defined(slug.current)][].slug.current
      `
    )) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}
