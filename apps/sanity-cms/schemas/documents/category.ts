import { BiPurchaseTag } from 'react-icons/bi'

export default {
	name: 'category',
	title: 'Category',
	type: 'document',
	icon: BiPurchaseTag,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Name of the category',
			validation: (Rule) => [
				Rule.required().error('You must provide a title for the category.'),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'Slug for the category that will categorize all of the content related to it.',
			options: {
				source: 'title',
			},
			validation: (Rule) => [
				Rule.required().error(
					`The category must have a slug, generate it form the title.`
				),
			],
		},
	],
}
