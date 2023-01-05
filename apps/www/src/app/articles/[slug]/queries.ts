import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client';
import { ArticlePayload } from './types';

export async function getArticle({ slug }): Promise<ArticlePayload | undefined> {
  const article = await sanityClient?.fetch(
    groq`
      *[_type == "article" && slug.current == $slug][0] {
        title,
        content,
        excerpt,
        date,
        _updatedAt,
        authors,
        categories,
        featuredImage,
        metadata,
        "slug": slug.current,
      }
    `,
    { slug, next: { revalidate: 60 } },
  )

  return article
}

export async function getAllArticleSlugs(): Promise<Pick<ArticlePayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(
      groq`
        *[_type == "article" && defined(slug.current)][].slug.current
      `
    )) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}


