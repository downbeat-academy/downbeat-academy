import type { StorybookConfig } from '@storybook/react-vite'
import { join, dirname, resolve } from 'path'
import { existsSync } from 'fs'

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
		
		// For cadence-icons, try multiple resolution strategies
		const iconsPackageRoot = resolve(__dirname, '../../cadence-icons');
		const iconsDistPath = resolve(iconsPackageRoot, 'dist/cadence-icons.es.js');
		const iconsSrcPath = resolve(iconsPackageRoot, 'src/components/index.ts');
		
		// Use the source files if dist doesn't exist (during development or if build hasn't run)
		const iconsPath = existsSync(iconsDistPath) ? iconsDistPath : iconsSrcPath;
		
		// For tokens, use the dist directory
		const tokensDistPath = resolve(__dirname, '../../cadence-tokens/dist');
		
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'cadence-icons': iconsPath,
			'cadence-tokens': tokensDistPath,
		};
		
		// Add optimizeDeps configuration for better handling of workspace dependencies
		config.optimizeDeps = config.optimizeDeps || {};
		config.optimizeDeps.include = [
			...(config.optimizeDeps.include || []),
			'cadence-icons',
			'cadence-tokens'
		];
		
		return config;
	},
}
export default config
