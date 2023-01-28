import { groq } from 'next-sanity'

// Article Queries

export const getArticles = groq`
    *[_type == "article" && slug.current == $slug][0] {
        _id,
        _updatedAt,
        title,
        "slug": slug.current,
        content {
            content[] {
                ...,
                markDefs[] {
                    ...,
                    _type == "internalLink" => {
                        "type": @.reference->_type,
                        "slug": @.reference->slug.current,
                    }
                }
            }
        },
        excerpt,
        date,
        authors[]->,
        categories[]->,
        featuredImage,
        metadata
    }
`

export const getArticlePaths = groq`
    *[_type == "article" && defined(slug.current)][].slug.current
`

// Blog Queries

export const GET_ARTICLES = groq`
    *[_type == 'article'][] {
        _id,
        _type,
        title,
        date,
        "slug": slug.current,
        "image": featuredImage.image,
        authors[]->,
        categories[]->,
        excerpt,
    }
    | order(date desc)
`

// Page Queries

export const getPages = groq`
    *[_type == "page" && slug.current == $slug][0] {
		_id,
		title,
		showTitle,
		"slug": slug.current,
		metadata,
        moduleContent
	}
`

export const getPagePaths = groq`
    *[_type == "page" && defined(slug.current)][].slug.current
`

// Podcast Queries

export const getPodcasts = groq`
    *[_type == "podcast" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current
    }
`

export const getPodcastPaths = groq`
    *[_type == "podcast" && defined(slug.current)][].slug.current
`

// Landing Page Queries

export const getLandingPages = groq`
    *[_type == "landingPage" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current
    }
`

export const getLandingPagePaths = groq`
    *[_type == "landingPage" && defined(slug.current)][].slug.current
`

// Category Queries

export const getCategories = groq`
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

export const getCategoryPaths = groq`
    *[_type == "category" && defined(slug.current)][].slug.current
`

// Contributor/Person queries

export const getContributors = groq`
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

export const getContributorPaths = groq`
    *[_type == "person" && defined(slug.current)][].slug.current
`

export const GET_CONTRIBUTORS = groq`
    *[_type == 'person'][] {
        _id,
        name,
        "slug": slug.current,
        avatar,
        instrument,
    }
    | order(name, desc)
`

// Resources queries

export const getResources = groq`
    *[_type == "resource" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
    }
`

export const getResourcePaths = groq`
    *[_type == "resource" && defined(slug.current)][].slug.current
`

// Homepage

export const getHomepageData = groq`
    *[_type == 'article'] {
        _id,
        _type,
        title,
        date,
        featuredImage,
        "slug": slug.current,
        excerpt,
        authors[]-> {
            _id,
            name,
            avatar,
            "slug": slug.current,
        },
        categories[]-> {
            title,
            "slug": slug.current,
        },
    }
    | order(date desc)[0..9]
`

export const SITEMAP = groq`
    *[_type in [
        'post', 
        'page',
        'people',
        'category',
        'difficultyLevel',
        'podcast',
        'landingPage',
        'course',
        'curriculum',
    ]] {
        slug,
        _type,
        _updatedAt,
    }
`

export const NOT_FOUND = groq`
    *[_type == "errorPage" && errorType == '404'][0] {
		_id,
		errorType,
		title,
		showTitle,
		moduleContent,
		metadata,
	}
`

export const SERVER_ERROR = groq`
	*[_type == "errorPage" && errorType == '500'][0] {
		_id,
		errorType,
		title,
		showTitle,
		moduleContent,
		metadata,
	}
`
