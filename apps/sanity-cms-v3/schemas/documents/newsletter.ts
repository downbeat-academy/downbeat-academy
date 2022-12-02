import { BiNews } from 'react-icons/bi';

export default {
	name: 'newsletter',
	title: 'Newsletter',
	type: 'document',
	icon: BiNews,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => [
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
			validation: (Rule) => [
				Rule.required().error('The newsletter needs a slug.'),
			],
		},
	],
};
