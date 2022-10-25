// import fs from 'fs'
// import prettier from 'prettier'
import { globby } from 'globby';
import { getClient } from '@lib/sanity.server';
import { SITEMAP } from '@lib/queries';
import { linkResolver } from '@utils/linkResolver';

export default function SiteMap() {
	return <div>loading</div>;
}

export async function getServerSideProps({ res }) {
	const baseUrl = 'https://downbeatacademy.com';

	// Get slugs from local filesystem
	const fsPages = await globby([
		// include
		'src/pages/**/*.tsx',
		'src/pages/**/*.jsx',
		'src/pages/**/*.js',
		// exclude
		'!src/pages/_*.tsx',
		'!src/pages/_*.jsx',
		'!src/pages/_*.js',
		'!src/pages/api/*.js',
		'!src/pages/api/*.tsx',
		'!src/pages/api/*.jsx',
		'!src/pages/[slug].js',
		'!src/pages/blog/[slug].js',
		'!src/pages/p/[slug].js',
		'!src/pages/contributor/[slug].js',
		'!src/pages/podcast/[slug].js',
		'!src/pages/category/[slug].js',
	]);

	const fsUrls = fsPages.map((page) => {
		const path = page
			.replace('src/pages', '')
			.replace('.tsx', '')
			.replace('.jsx', '')
			.replace('.js', '')
			.replace(/\/index/g, '');
		return `
            <loc>${baseUrl}${path}</loc>
            <changefreq>weekly</changefreq>
        `;
	});

	// Get slugs & urls from Sanity
	const sanityPages = await getClient().fetch(SITEMAP);

	const sanityUrls = sanityPages.map((page) => {
		const renderSlug =
			page.slug.current === '/' ? '/' : `${page.slug.current}`;
		const resolveSlug = linkResolver(page._type, renderSlug);
		return `
            <loc>${baseUrl}${resolveSlug}</loc>
            <lastmod>${page._updatedAt}</lastmod>
            <changefreq>weekly</changefreq>
        `;
	});

	// Merge arrays of urls from Sanity and local filesystem
	const urls = [...sanityUrls, ...fsUrls];

	// Create sitemap
	const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls
				.map((url) => {
					return `
                    <url>${url}</url>
                `;
				})
				.join('')}
        </urlset>
    `;

	res.setHeader('Content-Type', 'text/xml');
	res.write(createSitemap());
	res.end();

	return {
		props: {},
	};
}
