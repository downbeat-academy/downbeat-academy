import type { Preview } from '@storybook/react'
import '../node_modules/cadence-tokens/dist/web/tokens.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
}

export default preview
