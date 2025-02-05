import * as React from 'react'
import { BiMovie } from 'react-icons/bi'
import ReactPlayer from 'react-player'

// const Preview = ({ value }) => {
//     return <ReactPlayer url={value.url} />
// }

export default {
	name: `video`,
	title: `Video`,
	type: `object`,
	icon: BiMovie,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title for the embedded video.`,
			validation: (Rule: any) => [
				Rule.required().error(`You must provide a title for the video.`),
			],
		},
		{
			name: `description`,
			title: `Description`,
			type: `string`,
			description: `Briefly describe the video.`,
		},
		// {
		// 	name: 'source',
		// 	title: 'Source',
		// 	type: 'string',
		// 	description: 'Select where the video is coming from.',
		// 	options: {
		// 		list: [
		// 			{ title: 'URL', value: 'url' },
		// 			{ title: 'Mux Video', value: 'muxVideo' },
		// 		],
		// 		layout: 'dropdown',
		// 	},
		// },
		{
			name: `url`,
			title: `URL`,
			type: `url`,
			description: `Paste the URL for the video you would like to embed.`,
			hidden: ({ parent }) => parent?.source !== 'url',
		},
		{
			name: 'muxVideo',
			title: 'Mux Video',
			type: 'mux.video',
			description: 'Upload or select a video that gets served by Mux.',
			hidden: ({ parent }) => parent?.source !== 'muxVideo',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
		},
	},
}
