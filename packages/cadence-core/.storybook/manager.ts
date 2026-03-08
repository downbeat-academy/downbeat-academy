import { addons } from '@storybook/manager-api'

addons.setConfig({
	initialActive: 'sidebar',
	sidebar: {
		showRoots: true,
	},
	isFullscreen: false,
	showPanel: true,
	enableShortcuts: true,
})
