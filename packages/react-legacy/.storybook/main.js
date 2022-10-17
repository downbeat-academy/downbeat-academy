module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-docs',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'storybook-addon-designs',
	],
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFormEnum: true,
			propFilter: (prop) =>
				prop.parent
					? !/node_modules/.test(
							prop.parent.fileName
					  )
					: true,
		},
	},
};
