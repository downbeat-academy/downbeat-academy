import { BiAlbum } from 'react-icons/bi'

export default {
	name: 'genre',
	title: 'Genre',
	type: 'document',
	icon: BiAlbum,
	fields: [
		{
			name: 'title',
			title: 'title',
			type: 'string',
			description: 'Genre title',
			validation: (Rule: any) => [
				Rule.required().error('The genre must have a title.'),
				Rule.min(3).warning(`That's a pretty short genre name.`),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'Generate a slug to provide accurate metadata for the genre.',
			options: {
				source: 'title',
			},
			validation: (Rule: any) => [Rule.required().error('The genre needs a slug.')],
		},
	],
}
