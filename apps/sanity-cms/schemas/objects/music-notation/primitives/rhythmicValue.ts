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
					{ title: `Whole Note`, value: `whole-note` },
					{ title: `Half Note`, value: `half-note` },
					{ title: `Quarter Note`, value: `quarter-note` },
					{ title: `Eighth Note`, value: `eighth-note` },
					{ title: `Sixteenth Note`, value: `sixteenth-note` },
					{ title: `Thirty-second Note`, value: `thirty-second-note`}
				],
			},
		},
	],
}
