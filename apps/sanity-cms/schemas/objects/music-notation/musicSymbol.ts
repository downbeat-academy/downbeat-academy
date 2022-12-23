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
					{ title: `Dal Segno (𝄉)`, value: `𝄉` },
					{ title: `Da Capo (𝄊)`, value: `𝄊` },
					{ title: `Segno (𝄋)`, value: `𝄋` },
					{ title: `Fermata (𝄐)`, value: `𝄐` },
					{ title: `Breath Mark (𝄒)`, value: `𝄒` },
					{ title: `Caesura (𝄓)`, value: `𝄓` },
				],
			},
		},
	],
};
