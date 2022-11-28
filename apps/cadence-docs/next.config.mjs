/** @type {import('next').NextConfig} */

import remarkFrontmatter from 'remark-frontmatter'

// const { remarkFrontmatter } = require('remark-frontmatter')

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [
			remarkFrontmatter,
		],
		rehypePlugins: [],
		providerImportSource: '@mdx-js/react',
	},
});

module.exports = withMDX({
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'badge.fury.io'
		]
	}
});
