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
			validation: (Rule: any) => [
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
			name: 'files',
			title: 'Files',
			type: 'array',
			description: 'Upload multiple MusicXML files in different keys',
			of: [
				{
					name: 'file',
					title: 'File',
					type: 'file',
					options: {
						accept: '.musicxml, .mxl, .xml',
					},
					fields: [
						{
							name: 'label',
							title: 'Label',
							type: 'string',
							description:
								'Label the notation snippet with the key or instrument (Concert C, Trumpet, etc).',
						},
					],
				},
			],
		},
	],
}
