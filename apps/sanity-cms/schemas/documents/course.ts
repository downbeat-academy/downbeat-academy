import { BiBook } from 'react-icons/bi'

export default {
	name: `course`,
	title: `Course`,
	type: `document`,
	icon: BiBook,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the lesson`,
			validation: (Rule: any) => [
				Rule.required().min(5).error('Title must be longer than 5 characters'),
				Rule.required()
					.max(96)
					.warning('A title shorter than 96 characters might be better.'),
				Rule.required().error('You must enter a title for the lesson.'),
			],
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			options: {
				source: `title`,
			},
		},
		{
			name: 'authors',
			title: 'Authors',
			type: 'array',
			of: [
				{
					name: 'author',
					title: 'Author',
					type: 'reference',
					to: [{ type: 'person' }],
				},
			],
		},
		{
			name: `metadata`,
			title: `Metadata`,
			type: `metadata`,
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
		},
		{
			name: `categories`,
			title: `Categories`,
			type: `array`,
			of: [
				{
					name: `category`,
					title: `Category`,
					type: `reference`,
					to: [{ type: `category` }],
				},
			],
		},
		{
			name: `lessons`,
			title: `Lessons`,
			type: `array`,
			of: [{ type: `lesson` }],
		},
	],
}
