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
					{ title: `G Clef (𝄞)`, value: `𝄞` },
					{ title: `Alto Clef (𝄡)`, value: `𝄡` },
					{ title: `Bass Clef (𝄢)`, value: `𝄢` },
					{ title: `Drum Clef 1 (𝄥)`, value: `𝄥` },
					{ title: `Drum Clef 2 (𝄦)`, value: `𝄦` },
				],
			},
		},
	],
};
