import { globalCss } from 'cadence-design-system';

export const globalStyles = globalCss({
	'@font-face': [
		{
			fontFamily: 'Favorit',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontDisplay: 'swap',
			src: 'local("Favorit Std Regular"), url("/fonts/favorit/FavoritStd-Regular.woff") format("woff"), url("/fonts/favorit/FavoritStd-Regular.woff2") format("woff2")',
		},
		{
			fontFamily: 'Favorit',
			fontStyle: 'italic',
			fontWeight: 'normal',
			fontDisplay: 'swap',
			src: 'local("Favorit Std Italic"), url("/fonts/favorit/FavoritStd-Italic.woff") format("woff"), url("/fonts/favorit/FavoritStd-Italic.woff2") format("woff2")',
		},
		{
			fontFamily: 'Favorit',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontDisplay: 'swap',
			src: 'local("Favorit Std Bold"), url("/fonts/favorit/FavoritStd-Bold.woff") format("woff"), url("/fonts/favorit/FavoritStd-Bold.woff2") format("woff2")',
		},
		{
			fontFamily: 'Favorit',
			fontStyle: 'italic',
			fontWeight: 'bold',
			fontDisplay: 'swap',
			src: 'local("Favorit Std Bold Italic"), url("/fonts/favorit/FavoritStd-BoldItalic.woff") format("woff"), url("/fonts/favorit/FavoritStd-BoldItalic.woff2") format("woff2")',
		},
		{
			fontFamily: 'Favorit Expanded',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontDisplay: 'swap',
			src: 'local("Favorit Std Expanded Bold"), url("/fonts/favorit/FavoritStd-BoldExpanded.woff") format("woff"), url("/fonts/favorit/FavoritStd-BoldExpanded.woff2") format("woff2")',
		},
		{
			fontFamily: 'Favorit Mono',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontDisplay: 'swap',
			src: 'local("Favorit Mono Std Regular"), url("/fonts/favorit/FavoritMonoStd-Regular.woff") format("woff"), url("/fonts/favorit/FavoritMonoStd-Regular.woff2") format("woff2")',
		},
		{
			fontFamily: 'Favorit Mono',
			fontStyle: 'italic',
			fontWeight: 'normal',
			fontDisplay: 'swap',
			src: 'local("Favorit Std Mono Regular Italic"), url("/fonts/favorit/FavoritMonoStd-Italic.woff") format("woff"), url("/fonts/favorit/FavoritMonoStd-Italic.woff2") format("woff2")',
		},
		{
			fontFamily: 'Tiempos Text',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontDisplay: 'swap',
			src: 'local("Tiempos Text Regular"), url("/fonts/tiempos-text/TiemposText-Regular.woff") format("woff"), url("/fonts/tiempos-text/TiemposText-Regular.woff2") format("woff2")',
		},
		{
			fontFamily: 'Tiempos Text',
			fontStyle: 'italic',
			fontWeight: 'normal',
			fontDisplay: 'swap',
			src: 'local("Tiempos Text Regular Italic"), url("/fonts/tiempos-text/TiemposText-RegularItalic.woff") format("woff"), url("/fonts/tiempos-text/TiemposText-RegularItalic.woff2") format("woff2")',
		},
		{
			fontFamily: 'Tiempos Text',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontDisplay: 'swap',
			src: 'local("Tiempos Text Bold"), url("/fonts/tiempos-text/TiemposText-SemiBold.woff") format("woff"), url("/fonts/tiempos-text/TiemposText-Bold.woff2") format("woff2")',
		},
		{
			fontFamily: 'Tiempos Text',
			fontStyle: 'italic',
			fontWeight: 'bold',
			fontDisplay: 'swap',
			src: 'local("Tiempos Text Bold Italic"), url("/fonts/tiempos-text/TiemposText-SemiBoldItalic.woff") format("woff"), url("/fonts/tiempos-text/TiemposText-BoldItalic.woff2") format("woff2")',
		},
		{
			fontFamily: 'Noto Music',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontDisplay: 'swap',
			src: 'local("Favorit Std Bold Expanded"), url("/fonts/favorit/FavoritStd-BoldExpanded.woff") format("woff"), url("/fonts/favorit/FavoritStd-BoldExpanded.woff2") format("woff2")',
		},
	],

	'*, *::before, *::after': {
		boxSizing: 'border-box',
	},

	'*': {
		margin: 0,
		padding: 0,
	},

	'html, body': {
		height: '100%',
	},

	body: {
		fontSize: '16px',
		color: '$blackberry900',
		fontFamily: `$interfaceBody`,
		webkitFontSmoothing: 'antialiased',
	},

	'p, h1, h2, h3, h4, h5, h6': {
		overflowWrap: 'break-word',
	},
});
