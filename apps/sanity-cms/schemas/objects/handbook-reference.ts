import { BiInfoCircle } from 'react-icons/bi'

export default {
	name: 'handbookReference',
	type: 'object',
	title: 'Handbook Reference',
	icon: BiInfoCircle,
	fields: [
		{
			name: 'text',
			type: 'string',
			title: 'Text',
		},
		{
			name: 'reference',
			type: 'reference',
			title: 'Reference',
			to: [
				{
					type: 'handbook',
				},
			],
		},
	],
}
