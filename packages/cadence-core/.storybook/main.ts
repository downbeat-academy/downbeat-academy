import type { StorybookConfig } from '@storybook/react-vite'

import { join, dirname, resolve } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['../public'],
	addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions')
    ],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	async viteFinal(config, { configType }) {
		// Ensure workspace dependencies are properly resolved
		config.resolve = config.resolve || {};
		
		// Point directly to the built files for workspace dependencies
		// This ensures Vite can load them properly in build environments
		const iconsDistPath = resolve(__dirname, '../../cadence-icons/dist/cadence-icons.es.js');
		const tokensDistPath = resolve(__dirname, '../../cadence-tokens/dist');
		
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'cadence-icons': iconsDistPath,
			'cadence-tokens': tokensDistPath,
		};
		
		return config;
	},
}
export default config
