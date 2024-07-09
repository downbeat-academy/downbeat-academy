module.exports = {
	source: [`tokens/**/*.json`],
	platforms: {
		web: {
			transformGroup: 'css',
			buildPath: './dist/web/',
			prefix: 'cds',
			transforms: ['attribute/cti', 'name/kebab', 'color/hex', 'size/rem'],
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
					prefix: 'cds',
					options: {
						showFileHeader: false,
					},
				},
			],
		},
	},
};

// const { transform } = require('@divriots/style-dictionary-to-figma')

// module.exports = {
// 	source: [`tokens/**/*.json`],
// 	transform: {},
// 	format: {
// 		figmaTokens: ({ dictionary }) => {
// 			const transformedTokens = transform(dictionary.tokens)
// 			return JSON.stringify(transformedTokens, null, 2)
// 		},
// 	},
// 	platforms: {
// 		web: {
// 			transformGroup: 'css',
// 			buildPath: './dist/web/',
// 			prefix: 'cds',
// 			transforms: ['attribute/cti', 'name/cti/kebab', 'color/hex', 'size/rem'],
// 			files: [
// 				{
// 					destination: 'tokens.scss',
// 					format: 'scss/variables',
// 					options: {
// 						showFileHeader: false,
// 					},
// 				},
// 				{
// 					destination: 'tokens.css',
// 					format: 'css/variables',
// 					prefix: 'cds',
// 					options: {
// 						showFileHeader: false,
// 					},
// 				},
// 			],
// 		},
// 		figma: {
// 			transformGroup: 'js',
// 			buildPath: './dist/figma/',
// 			files: [
// 				{
// 					destination: 'figma-tokens.json',
// 					format: 'figmaTokens',
// 				},
// 			],
// 		},
// 	},
// }
