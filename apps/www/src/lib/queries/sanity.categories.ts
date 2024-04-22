import { groq } from 'next-sanity'

export const categoriesBySlugQuery = groq`
  *[_type == 'category' && slug.current == $slug][0] {
    _id,
    _key,
    title,
    "slug": slug.current,
    "references": *[
      references(^._id)
      && _type != "page"
      && !(title match "Sample")
      && !(title match "Test post")
    ] {
      _id,
      title,
      excerpt,
      date,
      "slug": slug.current,
      _type,
    } | order(date desc)
  }
`

export const categoryPaths = groq`
  *[_type == 'category' && slug.current != null].slug.current
`
