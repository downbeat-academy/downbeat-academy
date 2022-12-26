export default {
	name: 'accidental',
	title: 'Accidental',
	type: 'object',
	fields: [
		{
			name: 'options',
			title: 'Options',
			type: 'string',
			options: {
				list: [
					{ title: `Flat (♭)`, value: `♭` },
					{ title: `Sharp (♯)`, value: `♯` },
					{ title: `Double Flat (𝄫)`, value: `𝄫` },
					{ title: `Double Sharp (𝄪)`, value: `𝄪` },
				],
			},
		},
	],
}
