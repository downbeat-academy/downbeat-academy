import { BiMicrophone } from 'react-icons/bi'

export default {
	name: `podcast`,
	title: `Podcast`,
	type: `document`,
	icon: BiMicrophone,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the podcast episode.`,
			validation: (Rule: any) => [
				Rule.required().error('The podcast episode needs a title.'),
			],
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			description: `Slug or URL of the episode.`,
			options: {
				source: `title`,
			},
			validation: (Rule: any) => [
				Rule.required().error('The podcast episode needs a slug.'),
			],
		},
		{
			name: 'hosts',
			title: 'Hosts',
			type: 'array',
			of: [
				{
					name: 'host',
					title: 'Host',
					type: 'reference',
					to: [{ type: 'person' }],
				},
			],
		},
		{
			name: 'guests',
			title: 'Guests',
			type: 'array',
			of: [
				{
					name: 'guest',
					title: 'Guest',
					type: 'reference',
					to: [{ type: 'person' }],
				},
			],
		},
		{
			name: `metadata`,
			title: `Metadata`,
			type: `metadata`,
		},
		{
			name: `date`,
			title: `Date`,
			type: `datetime`,
			description: `Date the podcast is published.`,
			validation: (Rule: any) => [
				Rule.required().error(
					`The podcast needs a date to be published correctly.`
				),
			],
		},
		{
			name: `audio`,
			title: `Audio File`,
			type: `file`,
			description: `Upload the audio file for the episode.`,
			validation: (Rule: any) => [
				Rule.required().warning(
					`It's recommended you upload an audio file to pair with the episode or link to it elsewhere.`
				),
			],
			options: {
				storeOriginalFilename: true,
				accept: `mp3, ogg, m4a, wav, flac`,
			},
		},
		{
			name: `transcription`,
			title: `Transcription`,
			type: `richText`,
			description: `Transcription of the audio from the episode.`,
			validation: (Rule: any) => [
				Rule.required().warning(
					`It's recommended you upload or provide a transcript of the episode for SEO and content distribution.`
				),
			],
		},
	],
}
