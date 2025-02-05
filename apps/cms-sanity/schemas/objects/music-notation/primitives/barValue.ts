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
					{ title: `Single (𝄀)`, value: `single` },
					{ title: `Double (𝄁)`, value: `double` },
					{ title: `Final (𝄂)`, value: `final` },
					{ title: `Reverse Final (𝄃)`, value: `final-reverse` },
					{ title: `Dashed (𝄄)`, value: `dashed` },
					{ title: `Left Repeat (𝄆)`, value: `repeat-left` },
					{ title: `Right Repeat (𝄇)`, value: `repeat-right` },
				],
			},
		},
	],
}
