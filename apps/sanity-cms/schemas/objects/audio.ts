import { BiMusic } from 'react-icons/bi'

export default {
	name: `audio`,
	title: `Audio`,
	type: `object`,
	icon: BiMusic,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title for the embedded audio.`,
			validation: (Rule) => [
				Rule.required().error(`You must provide a title for the audio.`),
			],
		},
		{
			name: `description`,
			title: `Description`,
			type: `string`,
			description: `Briefly describe the audio you upload.`,
		},
		{
			name: `file`,
			title: `Audio File`,
			type: `file`,
			description: `Upload or select an audio file. Accepted files include .mp3, .m4a, .ogg, and .wav.`,
			validation: (Rule) => [
				Rule.required().error(`You must upload or select an audio file.`),
			],
			options: {
				accept: `.mp3, .m4a, .ogg, .wav`,
			},
		},
		{
			name: `download`,
			title: `Download`,
			type: `boolean`,
			description: `Make this audio file downloadable by the user?`,
			options: {
				layout: `switch`,
			},
		},
	],
	preview: {
		select: {
			title: `title`,
			subtitle: `description`,
		},
	},
}
