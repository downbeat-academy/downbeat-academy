import { groq } from 'next-sanity'

export const categoriesBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "references": *[_type == "post" && references(^._id)] {
        _id,
        title,
        "slug": slug.current,
    }
  }
`

export const categorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`