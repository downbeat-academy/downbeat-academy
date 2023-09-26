export default {
	name: 'musicSymbol',
	title: 'Music Symbol',
	type: 'object',
	fields: [
		{
			name: `options`,
			title: `Options`,
			type: `string`,
			options: {
				list: [
					{ title: `Dal Segno`, value: `dal-segno` },
					{ title: `Da Capo (𝄊)`, value: `da-capo` },
					{ title: `Segno`, value: `segno` },
					{ title: `Fermata`, value: `fermata` },
					{ title: `Breath Mark`, value: `breath-mark` },
					{ title: `Caesura`, value: `caesura` },
					{ title: `Code`, value: `code` },
				],
			},
		},
	],
}
