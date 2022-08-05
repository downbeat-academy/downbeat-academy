import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
    namespace: 'web-components',
    globalStyle: 'src/global/global.scss',
    devServer: {
        openBrowser: false,
    },
    outputTargets: [
        reactOutputTarget({
            componentCorePackage: '@downbeat-academy/web-components',
            proxiesFile: '../react-components/src/components/index.ts',
            includeDefineCustomElements: true,
        }),
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'docs-readme',
        },
        {
            type: 'dist-custom-elements',
        },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    plugins: [
        sass({
            injectGlobalPaths: ['src/global/global.scss'],
        }),
    ],
};
