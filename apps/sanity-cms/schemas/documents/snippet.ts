import { BiCut } from 'react-icons/bi'

export default {
	name: 'snippet',
	title: 'Snippet',
	type: 'document',
	icon: BiCut,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule: any) => [
				Rule.required()
					.min(5)
					.max(96)
					.error('The title must be between 5 and 96 characters.'),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			validation: (Rule: any) => [
				Rule.required().error('The snippet needs a slug.'),
			],
		},
	],
}
