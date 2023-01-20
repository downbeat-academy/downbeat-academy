import { BiNavigation } from 'react-icons/bi'

export default {
	name: `navigation`,
	title: `Navigation`,
	type: `document`,
	icon: BiNavigation,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title or location of the navigation element.`,
		},
		{
			name: `links`,
			title: `Links`,
			type: `array`,
			description: `Links, pages, or content that appear in the navigation.`,
			of: [
				{ type: 'link' }
			],
		},
	],
}
