export default {
	name: 'rhythmicValue',
	title: 'Rhythmic Value',
	type: 'object',
	fields: [
		{
			name: `options`,
			title: `Options`,
			type: `string`,
			options: {
				list: [
					{ title: `Whole Note (𝅝)`, value: `𝅝` },
					{ title: `Half Note (𝅗𝅥)`, value: `𝅗𝅥` },
					{ title: `Quarter Note (𝅘𝅥)`, value: `𝅘𝅥` },
					{ title: `Eighth Note (𝅘𝅥𝅮)`, value: `𝅘𝅥𝅮` },
					{ title: `Sixteenth Note(𝅘𝅥𝅯)`, value: `𝅘𝅥𝅯` },
				],
			},
		},
	],
}
