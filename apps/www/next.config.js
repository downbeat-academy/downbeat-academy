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
		prependData: `
			@import "./node_modules/cadence-tokens/dist/web/tokens.scss";
			@import "./node_modules/typeface-favorit";
			@import "./node_modules/typeface-tiempos-text";`
	},
	images: {
		domains: ['cdn.sanity.io'],
	},
}

module.exports = nextConfig
