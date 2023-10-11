import { groq } from 'next-sanity'

export const pagesBySlugQuery = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    metadata,
    moduleContent[] {
      ...,
      _type == "richText" => {
        ...,
        content[] {
          ...,
            markDefs[] {
              ...,
              "slug": reference->slug.current,
              "type": reference->_type
            }
        }
      }
    }
  }
`

export const pagePaths = groq`
  *[_type == 'page' && slug.current != null].slug.current
`

export const pageMetadata = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    metadata
  }
`