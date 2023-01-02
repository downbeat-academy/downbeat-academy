/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	parserOptions: {
		babelOptions: {
			presets: [require.resolve('next/babel')],
		},
	}
}

module.exports = nextConfig
