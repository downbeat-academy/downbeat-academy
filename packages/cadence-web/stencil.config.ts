import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target'

export const config: Config = {
  namespace: 'cadence-web',
  globalStyle: 'src/global/global.css',
  srcDir: 'src',
  devServer: {
    openBrowser: false,
  },
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'cadence-web',
      proxiesFile: '../cadence-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
