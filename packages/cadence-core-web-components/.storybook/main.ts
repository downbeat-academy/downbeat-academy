import type { StorybookConfig } from '@storybook/web-components-vite';
import { join, dirname, resolve } from 'path';

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve || {};

    const tokensDistPath = resolve(__dirname, '../../cadence-tokens/dist');

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'cadence-tokens': tokensDistPath,
    };

    return config;
  },
};

export default config;
