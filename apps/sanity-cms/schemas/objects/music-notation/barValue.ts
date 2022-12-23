export default {
	name: 'barValue',
	title: 'Bar Value',
	type: 'object',
	fields: [
		{
			name: `options`,
			title: `Options`,
			type: `string`,
			options: {
				list: [
					{ title: `Single (𝄀)`, value: `𝄀` },
					{ title: `Double (𝄁)`, value: `𝄁` },
					{ title: `Final (𝄂)`, value: `𝄂` },
					{ title: `Reverse Final (𝄃)`, value: `𝄃` },
					{ title: `Dashed (𝄄)`, value: `𝄄` },
					{ title: `Left Repeat (𝄆)`, value: `𝄆` },
					{ title: `Right Repeat (𝄇)`, value: `𝄇` },
				],
			},
		},
	],
};
