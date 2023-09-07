import { groq } from 'next-sanity'

export const featuredPostQuery = groq`
    *[_type == 'article' && title != 'Test post'][0] {
        _id,
        _key,
        title,
        "slug": slug.current,
        excerpt,
        content,
        featuredImage,
        date,
        categories[]-> {
            ...,
            "slug": slug.current,
        },
        authors[]-> {
            "slug": slug.current,
            image,
            name,
        },
    }
`

export const homepageQuery = groq`
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
            ...,
            "slug": slug.current,
        },
        authors[]-> {
            "slug": slug.current,
            image,
            name,
        },
    }
`