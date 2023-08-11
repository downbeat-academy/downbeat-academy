import { groq } from 'next-sanity'

export const pagesBySlugQuery = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
  }
`

export const pagePaths = groq`
  *[_type == 'page' && slug.current != null].slug.current
`