import { Config } from '@stencil/core';
import { sass } from '@stencil/sass'

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
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/global.scss'
      ]
    })
  ]
};
