import { groq } from 'next-sanity'

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    showTitle,
    "slug": slug.current,
    metadata,
    moduleContent
  }
`

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`