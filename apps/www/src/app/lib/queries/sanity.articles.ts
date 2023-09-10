import { groq } from 'next-sanity'

export const articlesPageQuery = groq`
    *[_type == 'article' && title != 'Test post'] {
        _id,
        _key,
        title,
        "slug": slug.current,
        excerpt,
        content,
        featuredImage,
        date,
        categories[]-> {
            title,
            "slug": slug.current,
        },
        authors[]-> {
            "slug": slug.current,
            image,
            name,
        },
    }
`