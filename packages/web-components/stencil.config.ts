import { Config } from '@stencil/core';
import { sass } from '@stencil/sass'
import { reactOutputTarget as react } from '@stencil/react-output-target'

export const config: Config = {
  namespace: 'web-components',
  globalStyle: 'src/global/global.scss',
  devServer: {
    openBrowser: false,
  },
  outputTargets: [
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
    react({
      componentCorePackage: 'web-components',
      proxiesFile: '../react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true
    })
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/global.scss'
      ]
    })
  ]
};
