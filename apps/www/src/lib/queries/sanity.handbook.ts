import { groq } from 'next-sanity'

export const handbooksBySlugQuery = groq`
    *[_type == 'handbook' && slug.current == $slug][0] {
      _id,
      _key,
      title,
      "slug": slug.current,
      excerpt,
      content,
      changelog[] {
          date,
          summary,
          description,
      } | order(date desc),
      categories[]-> {
          title,
          "slug": slug.current,
      },
    }
`

export const handbookPaths = groq`
    *[_type == 'handbook' && slug.current != null].slug.current
`

export const handbookPageQuery = groq`
  *[_type == 'handbook'] {
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
