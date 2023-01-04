import { groq } from 'next-sanity'

export const contributorsBySlugQuery = groq`
  *[_type == "person" && slug.current == $slug][0] {
    _id,
    name,
    avatar,
    biography,
    instrument,
    "slug": slug.current,
    "content": *[
        references(^._id) 
        && _type != "page"
        && !(title match "Sample")
    ] {
        _id,
        title,
        "slug": slug.current,
    }
  }
`

export const contributorSlugsQuery = groq`
  *[_type == "person" && defined(slug.current)][].slug.current
`