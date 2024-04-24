import { groq } from 'next-sanity'

export const articlesBySlugQuery = groq`
    *[_type == 'article' && slug.current == $slug][0] {
        _id,
        _key,
        title,
        "slug": slug.current,
        excerpt,
        content {
            ...,
            _type == "richText" => {
                content[] {
                    ...,
                    children[] {
                        ...,
                        _type == "handbookReference" => {
                            reference-> {
                                ...,
                                "slug": slug.current,
                                title,
                                excerpt,
                                categories[]-> {
                                    _id,
                                    title,
                                }
                            }
                        }
                    }
                }
            }
        },
        featuredImage,
        date,
        metadata,
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
    *[_type == 'article'] {
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
    } | order(date desc)
`
