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
    "content": *[
      references(^._id) 
      && _type != "page"
      && !(title match "Sample")
      && !(title match "Test post")
    ] {
        _id,
        "type": _type,
        title,
        "slug": slug.current,
        excerpt,
    }
  }
`

export const contributorPaths = groq`
  *[_type == 'person' && slug.current != null].slug.current
`

export const contributorsPageQuery = groq`
  *[_type == 'person'] {
    _id,
    name,
    avatar,
    "slug": slug.current,
    instrument[],
  }
`