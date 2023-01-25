const { transform } = require('@divriots/style-dictionary-to-figma')

module.exports = {
	source: [`tokens/**/*.json`],
	transform: {},
	format: {
		figmaTokens: ({ dictionary }) => {
			const transformedTokens = transform(dictionary.tokens)
			return JSON.stringify(transformedTokens, null, 2)
		},
	},
	platforms: {
		web: {
			transformGroup: 'css',
			buildPath: './dist/web/',
			files: [
				{
					destination: 'tokens.scss',
					format: 'scss/variables',
					options: {
						showFileHeader: false,
					},
				},
				{
					destination: 'tokens.css',
					format: 'css/variables',
					options: {
						showFileHeader: false,
					},
				},
			],
		},
		figma: {
			transformGroup: 'js',
			buildPath: './dist/figma/',
			files: [
				{
					destination: 'figma-tokens.json',
					format: 'figmaTokens',
				},
			],
		},
	},
}
