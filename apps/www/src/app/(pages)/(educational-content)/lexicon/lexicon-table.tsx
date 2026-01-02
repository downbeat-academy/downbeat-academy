'use client'

import { useMemo } from 'react'
import {
	DataTable,
	Badge,
	createTextColumn,
	createCustomColumn,
} from 'cadence-core'
import { formatTime } from '@utils/format-time'
import { deslugify } from '@utils/deslugify'
import { linkResolver } from '@utils/link-resolver'
import { Link } from '@components/link'

interface LexiconRowData {
	id: string
	artist: string
	track: string
	album: string
	timestamp: number
	style: string
	length: string
	chordProgression: string
	slug: string
}

const LexiconTable = ({ data }: { data: LexiconRowData[] }) => {
	const columns = useMemo(
		() => [
			createTextColumn<LexiconRowData>('artist', 'Artist'),
			createTextColumn<LexiconRowData>('track', 'Track'),
			createTextColumn<LexiconRowData>('album', 'Album'),
			createCustomColumn<LexiconRowData, number>('timestamp', 'Timestamp', (timestamp) => (
				<Badge
					text={formatTime(timestamp).totalTime}
					type="neutral"
					size="medium"
					style="outlined"
				/>
			), { enableSorting: false }),
			createCustomColumn<LexiconRowData, string>('style', 'Style', (style) => (
				<Badge
					text={deslugify(style).sentence}
					type="neutral"
					size="medium"
					style="outlined"
				/>
			)),
			createCustomColumn<LexiconRowData, string>('length', 'Length', (length) => (
				<Badge
					text={deslugify(length).sentence}
					type="neutral"
					size="medium"
					style="outlined"
				/>
			)),
			createCustomColumn<LexiconRowData, string>('chordProgression', 'Chord progression', (chordProgression) => (
				<Badge
					text={chordProgression}
					type="neutral"
					size="medium"
					style="outlined"
				/>
			)),
			createCustomColumn<LexiconRowData, string>('slug', 'Link', (slug) => (
				<Link href={linkResolver(slug, 'lexicon')}>See more</Link>
			), { alignment: 'end', enableSorting: false }),
		],
		[]
	)

	return (
		<DataTable
			data={data}
			columns={columns}
			sorting={{ enabled: true }}
		/>
	)
}

export { LexiconTable }
