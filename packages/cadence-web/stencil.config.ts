import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target'

export const config: Config = {
  namespace: 'cadence-web',
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
    reactOutputTarget({
      componentCorePackage: 'cadence-web',
      proxiesFile: '../cadence-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
