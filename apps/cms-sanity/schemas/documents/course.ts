import { BiBook } from 'react-icons/bi'

export default {
	name: `course`,
	title: `Course`,
	type: `document`,
	icon: BiBook,
	groups: [
		{
			name: 'metadata',
			title: 'Metadata',
		},
		{
			name: 'content',
			title: 'Content',
		},
		{
			name: 'changelog',
			title: 'Changelog',
		},
	],
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the lesson`,
			group: 'metadata',
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
			group: 'metadata',
			options: {
				source: `title`,
			},
		},
		{
			name: 'authors',
			title: 'Authors',
			type: 'array',
			group: 'metadata',
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
			group: 'metadata',
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
			group: 'content',
		},
		{
			name: `categories`,
			title: `Categories`,
			type: `array`,
			group: 'metadata',
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
			group: 'content',
			of: [{ type: `lesson` }],
		},
		{
			name: 'changelog',
			title: 'Changelog',
			type: 'array',
			group: 'changelog',
			description:
				'Track meaningful changes to this course over time. Each entry appears in a changelog drawer on the published page.',
			of: [{ type: 'changelogEntry' }],
			options: {
				sortable: true,
			},
		},
	],
}
