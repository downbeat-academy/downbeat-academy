import { groq } from 'next-sanity'

export const articlesBySlugQuery = groq`
    *[_type == 'article' && title != 'Test post' && slug.current == $slug][0] {
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

export const articlePaths = groq`
    *[_type == 'article' && slug.current != null].slug.current
`

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