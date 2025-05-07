import { BiLink } from 'react-icons/bi'

export default {
	name: 'linkInBio',
	title: 'Link in Bio',
	type: 'document',
	icon: BiLink,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule: any) => [
				Rule.required().error('The link needs a title.'),
			],
		},
		{
			name: 'date',
			title: 'Date',
			type: 'datetime',
			validation: (Rule: any) => [
				Rule.required().error('The link needs a date.'),
			],
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
		{
			name: 'link',
			title: 'Link',
			type: 'reference',
			to: [
				{ type: 'article' },
				{ type: 'category' },
				{ type: 'page' },
				{ type: 'resource' },
				{ type: 'course' },
				{ type: 'curriculum' },
				{ type: 'lesson' },
				{ type: 'newsletter' },
				{ type: 'podcast' },
				{ type: 'snippet' },
				{ type: 'handbook' },
				{ type: 'genre' },
				{ type: 'instrument' },
				{ type: 'person' },
			],
			validation: (Rule: any) => [
				Rule.required().error('The link needs a reference.'),
			],
		},
	],
}
