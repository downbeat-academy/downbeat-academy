import { BiInfoCircle } from 'react-icons/bi'

export default {
	name: `metadata`,
	title: `Metadata`,
	type: `object`,
	description: `Common metadata for document and page creation.`,
	icon: BiInfoCircle,
	options: {
		collapsable: true,
		collapsed: true,
	},
	fields: [
		{
			name: `noIndex`,
			title: `No Index`,
			type: `boolean`,
			description: `Disable search engines from indexing the page.`,
			initialValue: false,
		},
		{
			name: `noFollow`,
			title: `No Follow`,
			type: `boolean`,
			description: `Disable search engines from following links in the page.`,
			initialValue: false,
		},
		{
			name: `title`,
			title: `Meta Title`,
			type: `string`,
			description: `Alternate meta title that could be different from the document title.`,
			initialValue: 'Page title',
			validation: (Rule: any) => [
				Rule.max(60).warning(
					'A title longer than 60 characters will be truncated.'
				),
			],
		},
		{
			name: `description`,
			title: `Meta Description`,
			type: `string`,
			description: `Description of the content within the document.`,
		},
		{
			name: `ogImage`,
			title: `OG Image`,
			type: `image`,
			description: `Open graph image for sharing on social media. Images will be cropped to 1200 x 630`,
		},
	],
}
