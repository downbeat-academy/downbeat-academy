const linkResolver = (url: string, category: string) => {
	switch (category) {
		case 'page':
			return `/${url}`
		case 'article':
			return `/articles/${url}`
		case 'category':
			return `/categories/${url}`
		case 'contributor':
			return `/contributors/${url}`
		case 'person':
			return `/contributors/${url}`
		case 'podcast':
			return `/podcasts/${url}`
		case 'resource':
			return `/resources/${url}`
		case 'category':
			return `/categories/${url}`
		case 'landingPage':
			return `/p/${url}`
		default:
			return `/${url}`
	}
}

export { linkResolver }
