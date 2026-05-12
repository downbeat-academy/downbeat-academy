import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import type { StorybookConfig } from '@storybook/web-components-vite';
import { join, dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
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
