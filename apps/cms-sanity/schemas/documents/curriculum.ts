import { BiCollection } from 'react-icons/bi'

export default {
	name: `curriculum`,
	title: `Curriculum`,
	type: `document`,
	icon: BiCollection,
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
			description: `Title of the curriculum.`,
			group: 'metadata',
			validation: (Rule: any) => [
				Rule.required().min(5).error('Title must be longer than 5 characters'),
				Rule.required()
					.max(96)
					.warning('A title shorter than 96 characters might be better.'),
				Rule.required().error('You must enter a title for the curriculum.'),
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
			name: `courses`,
			title: `Courses`,
			type: `array`,
			group: 'content',
			of: [
				{
					name: `course`,
					title: `Course`,
					type: `reference`,
					to: [{ type: `course` }],
				},
			],
		},
		{
			name: 'changelog',
			title: 'Changelog',
			type: 'array',
			group: 'changelog',
			description:
				'Track meaningful changes to this curriculum over time. Each entry appears in a changelog drawer on the published page.',
			of: [{ type: 'changelogEntry' }],
			options: {
				sortable: true,
			},
		},
	],
}
