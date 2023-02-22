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
					{ title: `Dal Segno`, value: `del-segno` },
					{ title: `Da Capo (𝄊)`, value: `del-capo` },
					{ title: `Segno`, value: `segno` },
					{ title: `Fermata`, value: `fermata` },
					{ title: `Breath Mark`, value: `breath-mark` },
					{ title: `Caesura`, value: `caesura` },
				],
			},
		},
	],
}
