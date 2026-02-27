import { BiPencil } from 'react-icons/bi'

export default {
	name: `article`,
	title: `article`,
	type: `document`,
	icon: BiPencil,
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
			type: `string`,
			title: `Title`,
			description: `Enter the title for the article.`,
			group: 'metadata',
			validation: (Rule: any) => [
				Rule.required()
					.min(5)
					.error(`The article title should be longer than 5 characters.`),
				Rule.required()
					.max(96)
					.warning(
						`That's a pretty long title, you might want to provide a shorter title.`
					),
				Rule.required().error(`You must enter a title for the article.`),
			],
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			description: `The slug determines the canonical organization of this article within the application.`,
			group: 'metadata',
			options: {
				source: `title`,
			},
			validation: (Rule: any) => [
				Rule.required().error(
					`The article needs a slug. Create one based on the title with "generate"`
				),
			],
		},
		{
			name: `metadata`,
			title: `Metadata`,
			type: `metadata`,
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
			name: `date`,
			title: `Date`,
			type: `date`,
			description: `Enter a date for when the published date of the article.`,
			group: 'metadata',
			validation: (Rule: any) => [
				Rule.required().error(`The article needs a published date.`),
			],
		},
		{
			name: 'updatedDate',
			title: 'Updated Date',
			type: 'date',
			group: 'metadata',
			description:
				'(Optional) If the article has been published with meaningful content changes, add an updated date.',
		},
		{
			name: `categories`,
			title: `Categories`,
			type: `array`,
			description: `Categorize this article so that it appears related to other articles.`,
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
			name: `featuredImage`,
			title: `Featured Image`,
			type: `mainImage`,
			description: `Select an image to show up at the top of the article.`,
			group: 'content',
			to: [{ type: `asset` }],
			validation: (Rule: any) => [
				Rule.required().error(`The article needs an image.`),
			],
		},
		{
			name: `excerpt`,
			title: `Excerpt`,
			type: `text`,
			description: `Provide an excerpt for the article for display and SEO purposes.`,
			rows: 5,
			group: 'content',
		},
		{
			name: `content`,
			title: `Content`,
			type: `richText`,
			description: `Content of the article.`,
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error(`The article needs content.`),
			],
		},
		{
			name: 'changelog',
			title: 'Changelog',
			type: 'array',
			group: 'changelog',
			description:
				'Track meaningful changes to this article over time. Each entry appears in a changelog drawer on the published page.',
			of: [{ type: 'changelogEntry' }],
			options: {
				sortable: true,
			},
		},
	],
	preview: {
		select: {
			title: `title`,
			subtitle: `date`,
			media: `featuredImage.image`,
		},
	},
}
