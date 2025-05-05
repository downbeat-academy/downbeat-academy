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
			options: 'options',
		},
		prepare: ({ options = [] }) => {
			const getOptionValue = (option: any) => {
				if (!option) return ''

				switch (option._type) {
					case 'accidental':
					case 'rhythmicValue':
					case 'clef':
					case 'barValue':
					case 'musicSymbol':
						return option.options || ''
					case 'musicText':
						return option.musicText || ''
					default:
						return ''
				}
			}

			const values = options.map(getOptionValue).filter(Boolean)
			return {
				title: values.join(' ') || 'Empty music text',
			}
		},
	},
}
