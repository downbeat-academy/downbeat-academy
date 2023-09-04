import { groq } from 'next-sanity'

export const homepageQuery = groq`
    *[_type == 'article' && title != 'Test post'] {
        _id,
        _key,
        title,
        "slug": slug.current,
        excerpt,
        content,
        author,
    }
`