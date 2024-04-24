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
					{ title: 'Major 7', value: 'major7' },
					{ title: 'Major 6', value: 'major6' },
					{ title: 'Dominant 7', value: 'dominant7' },
					{ title: 'Minor', value: 'minor' },
					{ title: 'Minor 7', value: 'minor7' },
					{ title: 'Minor/Major 7', value: 'minMaj7' },
					{ title: 'Diminished', value: 'dim' },
					{ title: 'Diminished 7', value: 'dim7' },
					{ title: 'Half diminished 7', value: 'halfDim7' },
					{ title: 'Suspended (sus4)', value: 'sus4' },
					{ title: 'Augmented', value: 'aug' },
					{ title: 'Augmented 7', value: 'aug7' },
				],
				layout: 'dropdown',
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
					{ title: '♯5', value: 'sharp5' },
					{ title: '♭13', value: 'flat13' },
					{ title: '♯9', value: 'sharp9' },
					{ title: '♯11', value: 'sharp11' },
					{ title: '♯9/♭9', value: 'sharp9flat9' },
					{ title: '6/9', value: 'sixNine' },
					{ title: 'Altered', value: 'altered' },
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
			root: 'root',
			type: 'type',
			quality: 'quality',
			extension: 'extension',
		},
		prepare(selection: any) {
			const { root, quality, extension } = selection
			return {
				title: `${root && root} ${quality && quality} ${
					extension && extension
				}`,
			}
		},
	},
}
