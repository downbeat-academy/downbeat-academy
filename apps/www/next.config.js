/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: true,
	},
	sassOptions: {
		includePaths: [
			path.join(__dirname, 'app/styles'),
			path.join(__dirname, 'app/components/**/*.scss'),
		],
	},
	images: {
		domains: ['cdn.sanity.io'],
	},
}

module.exports = nextConfig
