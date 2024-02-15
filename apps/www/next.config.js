/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
	reactStrictMode: true,
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
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				port: '',
			}
		]
	},
}

module.exports = nextConfig
