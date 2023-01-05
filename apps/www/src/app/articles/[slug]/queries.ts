import { groq } from 'next-sanity'
import { sanityClient } from '@lib/sanity.client';
import { ArticlePayload } from './types';

export const articlesBySlugQuery = groq`
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
`

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`

export async function getArticle({ slug }): Promise<ArticlePayload | undefined> {
  const article = await sanityClient?.fetch(
    articlesBySlugQuery,
    { slug, next: { revalidate: 60 } },
  )

  return article
}

export async function getAllArticleSlugs(): Promise<Pick<ArticlePayload, 'slug'>[]> {
  if (sanityClient) {
    const slugs = (await sanityClient.fetch<string[]>(articleSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }

  return []
}


