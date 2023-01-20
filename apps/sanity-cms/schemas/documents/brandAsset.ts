import { BiBrush } from 'react-icons/bi'

export default {
	name: `brandAsset`,
	title: `Brand Asset`,
	type: `document`,
	icon: BiBrush,
	preview: {
		select: {
			title: `title`,
			subtitle: `description`,
			media: `asset.image`,
		},
	},
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Give this brand asset a title.`,
			validation: (Rule: any) => [
				Rule.required().error(
					`You must provide a title for the brand asset for cataloging purposes.`
				),
			],
		},
		{
			name: `description`,
			title: `Description`,
			type: `string`,
			description: `(Optional) Briefly describe the brand asset.`,
		},
		{
			name: `asset`,
			title: `Asset`,
			type: `mainImage`,
			description: `Upload or select what you would like to be used for your brand asset.`,
			options: {
				hotspot: true,
			},
			validation: (Rule: any) => [
				Rule.required().error(`You must either upload or select an asset.`),
			],
		},
	],
}
