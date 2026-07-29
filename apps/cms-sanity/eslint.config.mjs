// Flat config. The legacy `.eslintrc` this replaces was unreadable by ESLint 9, which
// meant `eslint .` exited 2 here — invisible until the repo-wide `lint` task started
// covering this workspace. @sanity/eslint-config-studio v6 exports a flat config array.
import studioConfig from '@sanity/eslint-config-studio'

export default [
	...studioConfig,
	{
		ignores: ['dist/**', 'static/**', '.sanity/**'],
	},
]
