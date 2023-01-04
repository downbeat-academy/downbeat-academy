import { groq } from 'next-sanity'

export const resourcesBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
  }
`

export const resourceSlugsQuery = groq`
  *[_type == "resource" && defined(slug.current)][].slug.current
`