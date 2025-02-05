import { BiImage } from 'react-icons/bi'

export default {
	title: `Image`,
	name: `mainImage`,
	type: `object`,
	icon: BiImage,
	options: {
		collapsible: true,
		collapsed: false,
	},
	fields: [
		{
			title: `Image`,
			name: `image`,
			type: `image`,
		},
		{
			title: `Alternative Text`,
			description: `Alternative text for screen readers and accessibility.`,
			name: `alternativeText`,
			type: `string`,
		},
		{
			title: `Caption`,
			description: `Use a caption to describe your image. Can be the same as the alternative text.`,
			name: `caption`,
			type: `string`,
		},
	],
	preview: {
		select: {
			title: `alternativeText`,
			subtitle: `caption`,
			media: `image`,
		},
	},
}
