import { GiMusicalScore } from 'react-icons/gi'

export default {
	name: 'musicNotation',
	title: 'Music Notation',
	type: 'object',
	description:
		'Render music notation in the browser by uploading a MusicXML file.',
	icon: GiMusicalScore,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Title of the notation',
			validation: (Rule) => [
				Rule.required().error(
					'You must title the music notation you are uploading.'
				),
			],
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			description: 'Provide a brief description of your notation.',
			rows: 5,
		},
		{
			name: 'file',
			title: 'Upload File',
			type: 'file',
			description: 'Upload a MusicXML file',
			options: {
				accept: '.musicxml, .mxl, .xml',
			},
		},
	],
}
