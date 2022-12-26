import { BiCog } from 'react-icons/bi'

export default {
	name: `settings`,
	title: `Settings`,
	type: `document`,
	icon: BiCog,
	fields: [
		{
			name: `title`,
			title: `Site Title`,
			type: `string`,
			description: `Title of the site used for SEO and metadata purposes. `,
		},
		{
			name: `description`,
			title: `Description`,
			type: `string`,
			description: `Short description of the site. If nothing else is provided, this will serve as the default description of a page.`,
		},
		{
			name: `ogImage`,
			title: `OG Image`,
			type: `image`,
			description: `Open graph image for sharing on social media. Images will be cropped to 1200 x 630. Serves as the default OG image if none is provided.`,
		},
	],
}
