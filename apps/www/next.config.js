const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
	reactStrictMode: true,
	images: {
		domains: [
			'cdn.sanity.io',
			'via.placeholder.com',
			'lh3.googleusercontent.com'
		],
	},
	async redirects() {
		return [
			{
				source: '/post/:slug*',
				destination: '/articles/:slug*',
				permanent: true,
			},
		];
	},
};

const sentryWebpackPluginOptions = {
	silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
