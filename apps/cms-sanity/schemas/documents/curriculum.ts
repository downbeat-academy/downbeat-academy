import { BiCollection } from 'react-icons/bi'

export default {
	name: `curriculum`,
	title: `Curriculum`,
	type: `document`,
	icon: BiCollection,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the curriculum.`,
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
			options: {
				source: `title`,
			},
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
			name: `courses`,
			title: `Courses`,
			type: `array`,
			of: [
				{
					name: `course`,
					title: `Course`,
					type: `reference`,
					to: [{ type: `course` }],
				},
			],
		},
	],
}
