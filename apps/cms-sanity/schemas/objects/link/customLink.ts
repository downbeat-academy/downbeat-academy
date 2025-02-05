import { BiLink } from 'react-icons/bi'

export default {
	name: 'customLink',
	title: 'Custom Link',
	type: 'object',
	icon: BiLink,
	fields: [
		{
			name: 'text',
			title: 'Text',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'string',
			description: 'Pass a URL to a page within the application, like about',
		},
	],
	preview: {
		select: {
			title: 'text',
			subtitle: 'slug',
		},
	},
}
