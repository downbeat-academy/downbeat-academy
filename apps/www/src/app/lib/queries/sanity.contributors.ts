import { groq } from 'next-sanity'

export const contributorsBySlugQuery = groq`
  *[_type == 'person' && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    socialLinks[]->,
    image,
    instruments[]->,
    biography,
  }
`

export const contributorPaths = groq`
  *[_type == 'person' && slug.current != null].slug.current
`