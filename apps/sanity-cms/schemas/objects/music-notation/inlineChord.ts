import { BsMusicNoteList } from 'react-icons/bs'

export default {
	name: 'inlineChord',
	title: 'Inline Chord',
	type: 'object',
	description: 'Inline a chord in text.',
	icon: BsMusicNoteList,
	fields: [
		{
			name: 'root',
			title: 'Root',
			type: 'string',
			description: 'The root center of the chord.',
		},
		{
			name: 'quality',
			title: 'Chord Quality',
			type: 'string',
			description: 'Chord symbol and quality of the chord.',
			options: {
				list: [
					{ title: 'Major', value: 'major' },
					{ title: 'Minor', value: 'minor' },
					{ title: 'Diminished', value: 'dim' },
					{ title: 'Suspended', value: 'sus4' },
					{ title: 'Augmented', value: 'aug' },
				],
				layout: 'dropdown',
			},
		},
		{
			name: 'seventh',
			title: 'Seventh',
			type: 'string',
			description: 'Quality of the 7th scale degree of the chord',
			options: {
				list: [
					{ title: 'Major 7', value: 'major7' },
					{ title: 'Dominant 7', value: 'dominant7' },
					{ title: 'Minor 7', value: 'minor7' },
					{ title: 'Half Diminished 7', value: 'halfDiminished7' },
					{ title: 'Diminished 7', value: 'diminished7' },
				],
			},
		},
		{
			name: 'extension',
			title: 'Extension',
			type: 'string',
			description: 'Extension or alteration of the chord.',
			options: {
				list: [
					{ title: '♭9', value: 'flat9' },
					{ title: '♭5', value: 'flat5' },
					{ title: '♭13', value: 'flat13' },
					{ title: '♯9', value: 'sharp9' },
					{ title: '♯11', value: 'sharp11' },
					{ title: '♯9/♭9', value: 'sharp9flat9' },
					{ title: '6/9', value: 'sixNine' },
				],
			},
		},
		{
			name: 'alternateBass',
			title: 'Alternate Bass Note',
			type: 'string',
			description:
				'(Optional) Give an alternate bass note to the root of the chord.',
		},
	],
	preview: {
		select: {
			title: 'root',
			type: 'type',
			quality: 'quality',
			seventh: 'seventh',
			extension: 'extension',
			alternateBass: 'alternateBass',
		},
		prepare(selection: any) {
			const { title, quality, seventh, extension, alternateBass } = selection
			return {
				title: `${title} ${seventh}`
			}
		},
	},
}
