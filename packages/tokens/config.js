const { transform } = require('@divriots/style-dictionary-to-figma')

module.exports = {
	source: [`src/**/*.json`],
	transform: {},
	format: {
        figmaTokens: ({ dictionary }) => {
            const transformedTokens = transform(dictionary.tokens);
            return JSON.stringify(transformedTokens, null, 2);
        },
	},
	platforms: {
		styles: {
			transformGroup: 'css',
			buildPath: './dist/',
			files: [
				{
					destination: 'tokens.scss',
					format: 'scss/variables',
				},
				{
					destination: 'tokens.css',
					format: 'css/variables',
				},
			],
		},
        json: {
            transformGroup: 'js',
            buildPath: './dist/',
            files: [
                {
                    destination: 'figma-tokens.json',
                    format: 'figmaTokens'
                }
            ]
        }
	},
};
