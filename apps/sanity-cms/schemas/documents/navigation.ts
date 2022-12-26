import { BiNavigation } from 'react-icons/bi'
import { BiLink } from 'react-icons/bi'

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
				{ type: `landingPage` },
				{ type: `page` },
				{ type: `person` },
				{ type: `podcast` },
				{ type: `article` },
				// {
				// 	name: `customLink`,
				// 	title: `Custom Link`,
				// 	type: `object`,
				// 	description: `Enter a custom link relative to the root application.`,
				// 	icon: BiLink,
				// 	fields: [
				// 		{
				// 			name: `link`,
				// 			title: `Link`,
				// 			type: `url`,
				// 			inputComponent: CustomLinkInput,
				// 			options: {
				// 				prepend: `https://downbeatacademy.com/`,
				// 			},
				// 		},
				// 	],
				// },
			],
		},
	],
}
