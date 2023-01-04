import { groq } from 'next-sanity'

export const landingPagesBySlugQuery = groq`
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current
  }
`

export const landingPageSlugsQuery = groq`
  *[_type == "landingPage" && defined(slug.current)][].slug.current
`