import { BiPen } from 'react-icons/bi';

export default {
	name: 'resource',
	title: 'Resource',
	type: 'document',
	icon: BiPen,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Enter a title for the resource',
			validation: (Rule) => [
				Rule.required()
					.min(5)
					.max(96)
					.error(
						'The resource title should be between 5 and 96 characters.'
					),
				Rule.required().error(
					'You must enter a title for the resource.'
				),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'The slug determines the canonical organization of this resource within the application.',
			options: {
				source: 'title',
			},
			validation: (Rule) => [
				Rule.required().error('The resource requires a slug.'),
			],
		},
		{
			name: 'metadata',
			title: 'Metadata',
			type: 'metadata',
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
			name: 'date',
			title: 'Date',
			type: 'date',
			description:
				'Enter a date corresponding with when the resource is initially published.',
			validation: (Rule) => [
				Rule.required().error('The resource needs a date.'),
			],
		},
		{
			name: 'updatedDate',
			title: 'Updated Date',
			type: 'date',
			description:
				'(Optional) If the resource has be updated with meaningful content changes, add an updated date.',
		},
		{
			name: 'categories',
			title: 'Categories',
			type: 'array',
			description:
				'Categorize this resource to draw relationships and groupings between content.',
			of: [
				{
					name: 'category',
					title: 'Category',
					type: 'reference',
					to: [{ type: 'category' }],
				},
			],
		},
		{
			name: 'featuredImage',
			title: 'Featured Image',
			type: 'mainImage',
			description:
				'Select or upload an image to be paired with the resource.',
			to: [{ type: 'asset' }],
			validation: (Rule) => [
				Rule.required().error('The resource needs an image.'),
			],
		},
		{
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			description:
				'Provide a short excerpt for the resource for display and SEO purposes.',
			rows: 5,
		},
		{
			name: 'content',
			title: 'Content',
			type: 'richText',
			description: 'Content for the resource.',
			validation: (Rule) => [
				Rule.required().error('The resource needs content.'),
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'date',
			media: 'featureImage.image',
		},
	},
};
