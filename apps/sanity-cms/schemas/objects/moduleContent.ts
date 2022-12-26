export default {
	name: 'moduleContent',
	title: 'Module Content',
	type: 'array',
	of: [
		{ type: 'pageTitle' },
		{ type: 'richText' },
		{ type: 'audio' },
		{ type: 'documentUpload' },
		{ type: 'musicNotation' },
		// { type: 'video' },
		{ type: 'form' },
	],
}
