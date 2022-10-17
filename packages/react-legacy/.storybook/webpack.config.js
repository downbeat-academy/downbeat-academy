const path = require('path');

module.exports = async ({ config }) => {
	// Styles
	config.module.rules.push({
		test: /\.(sass|scss|css)$/,
		use: ['resolve-url-loader'],
		include: path.resolve(__dirname, '../src'),
	});
	// Fonts
	config.module.rules.push({
		test: /\.(png|woff|woff2|eot|ttf|svg)$/,
		use: [
			{
				loader: 'file-loader',
				query: {
					name: '[name].[ext]',
				},
			},
		],
		include: path.resolve(__dirname, '../src'),
	});

	return config;
};
