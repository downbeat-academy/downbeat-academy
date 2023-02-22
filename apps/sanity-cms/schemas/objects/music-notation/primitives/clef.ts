export default {
	name: 'clef',
	title: 'Clef',
	type: 'object',
	fields: [
		{
			name: `options`,
			title: `Options`,
			type: `string`,
			options: {
				list: [
					{ title: `Treble Clef (𝄞)`, value: `treble-clef` },
					{ title: `Alto Clef (𝄡)`, value: `alto-clef` },
					{ title: `Bass Clef (𝄢)`, value: `bass-clef` },
					{ title: `Drum Clef`, value: `drum-clef` },
				],
			},
		},
	],
}
