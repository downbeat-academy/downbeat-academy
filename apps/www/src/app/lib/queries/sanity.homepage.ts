import { groq } from 'next-sanity'

export const homepageQuery = groq`
    *[_type == 'article'] {
        _id,
        _key,
        title,
        "slug": slug.current,
        content,
    }
`