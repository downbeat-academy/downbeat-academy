export const linkResolver = (type, slug) => {
	switch (type) {
		case 'person':
			return `/contributors/${slug}`;
		case 'category':
			return `/categories/${slug}`;
		case 'page':
			return `/${slug}`;
		case 'article':
			return `/articles/${slug}`;
		case 'podcast':
			return `/podcasts/${slug}`;
		case 'landingPage':
			return `/p/${slug}`;
		case 'course':
			return `/courses/${slug}`;
		case 'curriculum':
			return `/curriculum/${slug}`;
		default:
			return `/${slug}`;
	}
};
