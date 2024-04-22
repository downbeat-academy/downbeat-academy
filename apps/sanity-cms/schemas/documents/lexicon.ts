import { BiCabinet } from 'react-icons/bi'
import { timestampFormat } from '../../utils/timestamp-format'
import { getTime } from '../../utils/getTime'
import { slugify } from '../../utils/slugify'

type LexiconTitle = {
	artist: string
	album: string
	track: string
	timestamp: number
}

export default {
	name: 'lexicon',
	title: 'Lexicon',
	type: 'document',
	icon: BiCabinet,
	groups: [
		{
			name: 'content',
			title: 'Content',
		},
		{
			name: 'metadata',
			title: 'Metadata',
		},
	],
	fields: [
		{
			name: 'artist',
			title: 'Artist',
			type: 'string',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error('Please enter the artist.'),
			],
		},
		{
			name: 'instrument',
			title: 'Instrument',
			type: 'reference',
			group: 'metadata',
			to: [{ type: 'instrument' }],
			validation: (Rule: any) => [
				Rule.required().error('Please select an instrument.'),
			],
		},
		{
			name: 'album',
			title: 'Album',
			type: 'string',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error('Please enter the album.'),
			],
		},
		{
			name: 'track',
			title: 'Track',
			type: 'string',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error('Please enter the track.'),
			],
		},
		{
			name: 'timestamp',
			title: 'Timestamp',
			description: 'Number of seconds from the beginning of the track.',
			type: 'number',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error('Please enter the timestamp.'),
			],
		},
		{
			name: 'year',
			title: 'Year',
			type: 'string',
			validation: [
				(Rule: any) => [Rule.required().error('Please enter the year.')],
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'metadata',
			options: {
				source: (doc: any) => {
					const { artist, album, track, timestamp } = doc
					const slug = slugify([
						artist,
						album,
						track,
						getTime(timestamp).totalTimeToString,
					])
					return slug
				},
			},
		},
		{
			name: 'style',
			title: 'Style',
			type: 'string',
			group: 'content',
			options: {
				list: [
					{ title: 'Early jazz', value: 'early-jazz' },
					{ title: 'Swing', value: 'swing' },
					{ title: 'Bebop', value: 'bebop' },
					{ title: 'Cool jazz', value: 'cool-jazz' },
					{ title: 'Hard bop', value: 'hard-bop' },
					{ title: 'Modal jazz', value: 'modal-jazz' },
					{ title: 'Free jazz', value: 'free-jazz' },
					{ title: 'Fusion', value: 'fusion' },
					{ title: 'Smooth jazz', value: 'smooth-jazz' },
					{ title: 'Post-bop', value: 'post-bop' },
					{ title: 'Neo-soul', value: 'neo-soul' },
					{ title: 'Contemporary', value: 'contemporary' },
					{ title: 'Other', value: 'other' },
				],
			},
			validation: (Rule: any) => [
				Rule.required().error('Please select a style.'),
			],
		},
		{
			name: 'length',
			title: 'Length',
			type: 'string',
			group: 'content',
			options: {
				list: [
					{ title: 'One bar', value: 'one-bar' },
					{ title: 'Two bars', value: 'two-bars' },
					{ title: 'Four bars', value: 'four-bars' },
					{ title: 'Eight bars', value: 'eight-bars' },
					{ title: 'Other', value: 'other' },
				],
			},
			validation: (Rule: any) => [
				Rule.required().error('Please select a length.'),
			],
		},
		{
			name: 'chordProgression',
			title: 'Chord Progression',
			type: 'string',
			group: 'content',
			options: {
				list: [
					{ title: 'ii-V-I', value: 'ii-v-i' },
					{ title: 'iii-VI-ii-V-I', value: 'iii-vi-ii-v-i' },
					{ title: 'I-IV-ii-v-I', value: 'i-iv-ii-v-i' },
					{ title: 'blues', value: 'blues' },
					{ title: 'Modal', value: 'modal' },
					{ title: 'Coltrane changes', value: 'coltrane-changes' },
					{ title: 'Other', value: 'other' },
				],
			},
			validation: (Rule: any) => [
				Rule.required().error('Please select a chord progression.'),
			],
		},
		{
			name: 'description',
			title: 'Description',
			type: 'richText',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error('Please enter a description.'),
			],
		},
		{
			name: 'category',
			type: 'reference',
			title: 'Category',
			group: 'metadata',
			to: [{ type: 'category' }],
			validation: (Rule: any) => [
				Rule.required().error('Please select a category.'),
			],
		},
		{
			name: 'difficulty',
			type: 'reference',
			title: 'Difficulty',
			group: 'metadata',
			to: [{ type: 'difficulty' }],
			validation: (Rule: any) => [
				Rule.required().error('Please select a difficulty.'),
			],
		},
		{
			name: 'excerpt',
			title: 'Excerpt',
			type: 'musicNotation',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error('Please enter an excerpt.'),
			],
		},
		{
			name: 'audio',
			title: 'Audio',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'audio',
					title: 'Audio file',
				},
			],
		},
		{
			name: 'metadata',
			type: 'metadata',
			title: 'Metadata',
			group: 'metadata',
			validation: (Rule: any) => [
				Rule.required().error('Please enter metadata.'),
			],
		},
	],
	preview: {
		select: {
			artist: 'artist',
			album: 'album',
			track: 'track',
			timestamp: 'timestamp',
		},
		prepare: ({ artist, album, track, timestamp }: LexiconTitle) => {
			const lexiconTitle = `${artist} - ${album} - ${track} (${timestampFormat(
				timestamp
			)})`
			return {
				title: lexiconTitle,
			}
		},
	},
}
