import { BiCollection } from 'react-icons/bi'

export default {
	name: 'navigationSection',
	title: 'Navigation Section',
	type: 'object',
	icon: BiCollection,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Name of the section',
		},
		{
			name: 'links',
			title: 'Links',
			type: 'array',
			of: [
				{
					type: 'link',
					name: 'link',
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
		},
	},
}
