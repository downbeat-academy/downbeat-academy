import { BiBookmarkAlt } from 'react-icons/bi';

export default {
	name: `lesson`,
	title: `Lesson`,
	type: `object`,
	icon: BiBookmarkAlt,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the lesson`,
			validation: (Rule) => [
				Rule.required()
					.min(5)
					.error('Title must be longer than 5 characters'),
				Rule.required()
					.max(96)
					.warning(
						'A title shorter than 96 characters might be better.'
					),
				Rule.required().error('You must enter a title for the lesson.'),
			],
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
		},
		{
			name: `moduleContent`,
			title: `Module Content`,
			type: `moduleContent`,
		},
	],
	preview: {
		select: {
			title: `title`,
			subtitle: `description`,
		},
	},
};
