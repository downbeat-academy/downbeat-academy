/** @type {import('next').NextConfig} */

// const nextConfig = {
// 	reactStrictMode: true,
// 	swcMinify: true,
// };

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
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
