import { groq } from 'next-sanity'

export const linkInBioPageQuery = groq`
  *[_type == 'linkInBio'] {
      _id,
      _key,
      title,
      "slug": slug.current,
      description,
      link-> {
          _id,
          _type,
          "slug": slug.current,
      }
  }
`
