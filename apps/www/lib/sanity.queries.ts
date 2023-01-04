import { groq } from 'next-sanity';

// Article Queries

export const GET_ALL_ARTICLES = groq`
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
`;

export const GET_ARTICLE_PATHS = groq`
    *[_type == "article" && defined(slug.current)][].slug.current
`;

// Article Queries

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
`;

// Page Queries

export const GET_ALL_PAGES = groq`
    *[_type == "page" && slug.current == $slug][0] {
		_id,
		title,
		showTitle,
		"slug": slug.current,
		metadata,
        // moduleContent,
		// moduleContent: 
        //     *[_type == 'internalLink'][0] {
        //         internalLink[]->,
        //     }
        moduleContent
	}
`;

export const GET_PAGE_PATHS = groq`
    *[_type == "page" && defined(slug.current)][].slug.current
`;

// Podcast Queries

export const GET_ALL_PODCASTS = groq`
    *[_type == "podcast" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current
    }
`;

export const GET_PODCAST_PATHS = groq`
    *[_type == "podcast" && defined(slug.current)][].slug.current
`;

// Landing Page Queries

export const GET_ALL_LANDING_PAGES = groq`
    *[_type == "landingPage" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current
    }
`;

export const GET_LANDING_PAGE_PATHS = groq`
    *[_type == "landingPage" && defined(slug.current)][].slug.current
`;

// Category Queries

export const GET_ALL_CATEGORIES = groq`
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
`;

export const GET_CATEGORY_PATHS = groq`
    *[_type == "category" && defined(slug.current)][].slug.current
`;

// Contributor/Person queries

export const GET_ALL_CONTRIBUTORS = groq`
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
`;

export const GET_CONTRIBUTOR_PATHS = groq`
    *[_type == "person" && defined(slug.current)][].slug.current
`;

export const GET_CONTRIBUTORS = groq`
    *[_type == 'person'][] {
        _id,
        name,
        "slug": slug.current,
        avatar,
        instrument,
    }
    | order(name, desc)
`;

// Homepage

export const GET_HOMEPAGE_DATA = groq`
    *[_type == 'article'] {
        _id,
        _type,
        title,
        date,
        "image": featuredImage.image,
        "slug": slug.current,
        excerpt,
        authors[]-> {
            _id,
            name,
            avatar,
            slug { current },
        },
        categories[]-> {
            title,
            slug { current },
        },
    }
    | order(date desc)[0..9]
`;

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
`;

export const NOT_FOUND = groq`
    *[_type == "errorPage" && errorType == '404'][0] {
		_id,
		errorType,
		title,
		showTitle,
		moduleContent,
		metadata,
	}
`;

export const SERVER_ERROR = groq`
	*[_type == "errorPage" && errorType == '500'][0] {
		_id,
		errorType,
		title,
		showTitle,
		moduleContent,
		metadata,
	}
`;
