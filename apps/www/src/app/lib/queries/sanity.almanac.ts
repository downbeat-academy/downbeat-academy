import { groq } from 'next-sanity'

export const almanacsBySlugQuery = groq`
    *[_type == 'almanac' && slug.current == $slug][0] {
      _id,
      _key,
      title,
      "slug": slug.current,
      excerpt,
      content,
      categories[]-> {
          title,
          "slug": slug.current,
      },
    }
`

export const almanacPaths = groq`
    *[_type == 'almanac' && slug.current != null].slug.current
`

export const almanacPageQuery = groq`
  *[_type == 'almanac'] {
      _id,
      _key,
      title,
      "slug": slug.current,
      excerpt,
      content,
      categories[]-> {
          title,
          "slug": slug.current,
      },
  } | order(date desc)
`