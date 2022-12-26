import { BiTachometer } from 'react-icons/bi'

export default {
	name: 'difficulty',
	title: 'Difficulty',
	type: 'document',
	icon: BiTachometer,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			validation: (Rule) => [
				Rule.required().error(
					`The difficulty must have a slug, generate it form the title.`
				),
			],
		},
	],
}
