module.exports = {
	multipass: true,
	js2svg: {
		indent: 4,
		pretty: true,
	},
	plugins: [
		{ name: 'preset-default' },
		'sortAttrs',
		'removeScriptElement',
		'removeDimensions',
		'removeScriptElement',
		'removeDimensions',
	],
};
