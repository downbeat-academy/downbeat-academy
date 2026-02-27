import { BiPen } from 'react-icons/bi'

export default {
	name: 'resource',
	title: 'Resource',
	type: 'document',
	icon: BiPen,
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
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'metadata',
			description: 'Enter a title for the resource',
			validation: (Rule: any) => [
				Rule.required()
					.min(5)
					.max(96)
					.error('The resource title should be between 5 and 96 characters.'),
				Rule.required().error('You must enter a title for the resource.'),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'The slug determines the canonical organization of this resource within the application.',
			group: 'metadata',
			options: {
				source: 'title',
			},
			validation: (Rule: any) => [
				Rule.required().error('The resource requires a slug.'),
			],
		},
		{
			name: 'metadata',
			title: 'Metadata',
			type: 'metadata',
			group: 'metadata',
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
			name: 'date',
			title: 'Date',
			type: 'date',
			group: 'metadata',
			description:
				'Enter a date corresponding with when the resource is initially published.',
			validation: (Rule: any) => [
				Rule.required().error('The resource needs a date.'),
			],
		},
		{
			name: 'updatedDate',
			title: 'Updated Date',
			type: 'date',
			group: 'metadata',
			description:
				'(Optional) If the resource has be updated with meaningful content changes, add an updated date.',
		},
		{
			name: 'categories',
			title: 'Categories',
			type: 'array',
			group: 'metadata',
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
			group: 'content',
			description: 'Select or upload an image to be paired with the resource.',
			to: [{ type: 'asset' }],
			validation: (Rule: any) => [
				Rule.required().error('The resource needs an image.'),
			],
		},
		{
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			description:
				'Provide a short excerpt for the resource for display and SEO purposes.',
			group: 'content',
			rows: 5,
		},
		{
			name: 'content',
			title: 'Content',
			type: 'richText',
			group: 'content',
			description: 'Content for the resource.',
			validation: (Rule: any) => [
				Rule.required().error('The resource needs content.'),
			],
		},
		{
			name: 'changelog',
			title: 'Changelog',
			type: 'array',
			group: 'changelog',
			description:
				'Track meaningful changes to this resource over time. Each entry appears in a changelog drawer on the published page.',
			of: [{ type: 'changelogEntry' }],
			options: {
				sortable: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'date',
			media: 'featureImage.image',
		},
	},
}
