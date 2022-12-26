import { BiWindow } from 'react-icons/bi'

export default {
	name: `banner`,
	title: `Banner`,
	type: `document`,
	icon: BiWindow,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Name the banner.`,
			validation: (Rule) => [Rule.required().error(`The banner needs a name.`)],
		},
		{
			name: `active`,
			title: `Active`,
			type: `boolean`,
			description: `Toggle whether the banner is active and shows up on all pages.`,
			validation: (Rule) => [
				Rule.required().error(
					'Either toggle the banner on or off. Only one banner can be toggled on at once.'
				),
			],
			options: {
				layout: `switch`,
			},
		},
		{
			name: `headline`,
			title: `Headline`,
			type: `string`,
			description: `Headline for the banner`,
			validation: (Rule) => [
				Rule.required().error(
					'A headline is required for the banner. Add something short and to the point.'
				),
			],
		},
		{
			name: `content`,
			title: `Content`,
			type: `text`,
			description: `Main content of the banner.`,
			validation: (Rule) => [
				Rule.required().error(
					'Main content is required for the banner. Add something informative, or a date to express content to the reader.'
				),
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'headline',
		},
	},
}
