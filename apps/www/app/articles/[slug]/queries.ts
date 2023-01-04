import { groq } from 'next-sanity'

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