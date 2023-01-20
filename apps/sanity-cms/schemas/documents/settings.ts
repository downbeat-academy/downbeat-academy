import { BiCog } from 'react-icons/bi'

export default {
	name: `settings`,
	title: `Settings`,
	type: `document`,
	icon: BiCog,
	groups: [
		{
			title: 'SEO',
			name: 'seo',
		},
		{
			title: 'Social links',
			name: 'social'
		}
	],
	fields: [
		{
			name: `title`,
			title: `Site Title`,
			type: `string`,
			description: `Title of the site used for SEO and metadata purposes. `,
			group: 'seo'
		},
		{
			name: `description`,
			title: `Description`,
			type: `string`,
			description: `Short description of the site. If nothing else is provided, this will serve as the default description of a page.`,
			group: 'seo'
		},
		{
			name: `ogImage`,
			title: `OG Image`,
			type: `image`,
			description: `Open graph image for sharing on social media. Images will be cropped to 1200 x 630. Serves as the default OG image if none is provided.`,
			group: 'seo'
		},
		{
			name: 'twitterCard',
			title: 'Twitter Card',
			type: 'image',
			group: 'seo',
		},
		{
			name: 'twitterSite',
			title: 'Twitter Site',
			type: 'string',
			description: 'Twitter handle, ex: @jorytindall',
			group: 'seo',
		},
		{
			name: 'socialLinks',
			title: 'Social Links',
			type: 'array',
			group: 'social',
			of: [
				{ type: 'socialLink' }
			]
		}
	],
}
