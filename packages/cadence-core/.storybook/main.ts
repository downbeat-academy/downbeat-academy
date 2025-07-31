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
		
		// Resolve workspace packages to their root directories
		// This allows Vite to use their package.json exports
		const iconsPackagePath = resolve(__dirname, '../../cadence-icons');
		const tokensPackagePath = resolve(__dirname, '../../cadence-tokens');
		
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'cadence-icons': iconsPackagePath,
			'cadence-tokens': tokensPackagePath,
		};
		
		// Ensure Vite can resolve workspace dependencies
		config.resolve.conditions = config.resolve.conditions || [];
		if (!config.resolve.conditions.includes('source')) {
			config.resolve.conditions.push('source');
		}
		
		return config;
	},
}
export default config
