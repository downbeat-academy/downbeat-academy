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
					{ title: `Flat (♭)`, value: `flat` },
					{ title: `Sharp (♯)`, value: `sharp` },
					{ title: `Double Flat (𝄫)`, value: `double-flat` },
					{ title: `Double Sharp (𝄪)`, value: `double-sharp` },
				],
			},
		},
	],
}
