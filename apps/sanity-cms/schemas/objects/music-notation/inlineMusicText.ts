import { GiMusicalScore } from 'react-icons/gi'

export default {
	name: `inlineMusicText`,
	title: `Inline Music Text`,
	type: `object`,
	description: `Inline music styled text or symbols.`,
	icon: GiMusicalScore,
	fields: [
		{
			name: 'options',
			type: 'array',
			title: 'Options',
			of: [
				{ type: 'accidental' },
				{ type: 'musicText' },
				{ type: 'rhythmicValue' },
				{ type: 'clef' },
				{ type: 'barValue' },
				{ type: 'musicSymbol' },
			],
		},
	],
	preview: {
		select: {
			option1: 'options.0.options',
			option2: 'options.1.options',
			option3: 'options.2.options',
		},
		prepare: ({ option1, option2, option3 }: any) => {
			const options = [option1, option2, option3]
			const title = options.length > 0 ? options.join(' ') : ''
			console.log(option1)
			return {
				title,
			}
		},
	},
}
