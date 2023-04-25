import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target'

export const config: Config = {
  namespace: 'cadence-web',
  globalStyle: 'src/global/global.scss',
  srcDir: 'src',
  devServer: {
    openBrowser: false,
    port: 3333,
  },
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/global.scss'
      ]
    }),
  ],
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
