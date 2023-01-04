import { groq } from 'next-sanity'

export const podcastsBySlugQuery = groq`
  *[_type == "podcast" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current
  }
`

export const podcastSlugsQuery = groq`
  *[_type == "podcast" && defined(slug.current)][].slug.current
`