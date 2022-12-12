/** @type {import('next').NextConfig} */

import remarkFrontmatter from 'remark-frontmatter'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.mdx?$/,
			use: [
				options.defaultLoaders.babel,
				{
					loader: '@mdx-js/loader',
					options: {
						providerImportSource: '@mdx-js/react',
						remarkPlugins: [ remarkFrontmatter ],
						rehypePlugins: [],
					}
				}
			]
		});
		return config;
	},
	pageExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'md', 'mdx' ],
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'badge.fury.io',
		]
	}
}

