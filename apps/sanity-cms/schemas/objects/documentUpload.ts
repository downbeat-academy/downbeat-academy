import { BiUpload } from 'react-icons/bi'

export default {
	name: `documentUpload`,
	title: `Document`,
	type: `object`,
	icon: BiUpload,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title for the document`,
			validation: (Rule: any) => [
				Rule.required().error(`The document needs a title.`),
			],
		},
		{
			name: `file`,
			title: `File`,
			type: `file`,
			description: `Upload or select a file from your media library.`,
			options: {
				storeOriginalFilename: true,
			},
			validation: (Rule: any) => [
				Rule.required().error(`You must upload or select a file.`),
			],
		},
	],
	preview: {
		select: {
			title: `title`,
		},
	},
}
