import { BiMusic } from 'react-icons/bi'

export default {
	name: 'instrument',
	title: 'Instrument',
	type: 'document',
	icon: BiMusic,
	fields: [
		{
			name: 'title',
			title: 'title',
			type: 'string',
			description: 'Instrument name',
			validation: (Rule) => [
				Rule.required().error('The instrument must have a title.'),
				Rule.min(3).warning(`That's a pretty short instrument name.`),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'Generate a slug to provide accurate metadata for the instrument.',
			options: {
				source: 'title',
			},
			validation: (Rule) => [
				Rule.required().error('The instrument needs a slug.'),
			],
		},
	],
}
