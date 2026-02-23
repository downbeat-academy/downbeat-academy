import type { Preview } from '@storybook/react'
import '../node_modules/cadence-tokens/dist/web/tokens.css'
import '../node_modules/cadence-tokens/dist/web/tokens-dark.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		theme: {
			description: 'Theme for components',
			toolbar: {
				title: 'Theme',
				icon: 'paintbrush',
				items: [
					{ value: 'light', title: 'Light', icon: 'sun' },
					{ value: 'dark', title: 'Dark', icon: 'moon' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: 'light',
	},
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme || 'light'

			document.documentElement.setAttribute('data-theme', theme)
			document.body.style.backgroundColor =
				theme === 'dark' ? '#0f1629' : '#ffffff'
			document.body.style.color =
				theme === 'dark' ? '#f3f3f6' : '#081034'

			return Story()
		},
	],
}

export default preview
