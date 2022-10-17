import { globalCss } from '../src/stitches.config';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	backgrounds: {
		default: 'white',
		values: [
			{
				name: 'white',
				value: '#FFFFFF',
			},
			{
				name: 'light',
				value: '#F2F2F4',
			},
			{
				name: 'dark',
				value: '#23234B',
			},
		],
	},
};

export const decorators = [
	(Story) => {
		globalCss({});
		return <Story />;
	},
];
