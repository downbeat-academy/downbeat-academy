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