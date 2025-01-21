import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from '@components/table'
import { formatTime } from '@utils/format-time'
import { deslugify } from '@utils/deslugify'
import { linkResolver } from '@utils/link-resolver'
import { Link } from '@components/link'
import { Badge } from 'cadence-core'

const LexiconTable = ({ data }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow isHeader>
					<TableHead>Artist</TableHead>
					<TableHead>Track</TableHead>
					<TableHead>Album</TableHead>
					<TableHead>Timestamp</TableHead>
					<TableHead>Style</TableHead>
					<TableHead>Length</TableHead>
					<TableHead>Chord progression</TableHead>
					<TableHead alignment="end">Link</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row) => {
					return (
						<TableRow key={row.id}>
							<TableCell>{row.artist}</TableCell>
							<TableCell>{row.track}</TableCell>
							<TableCell>{row.album}</TableCell>
							<TableCell>
								<Badge
									text={formatTime(row.timestamp).totalTime}
									type="neutral"
									size="medium"
									style="outlined"
								/>
							</TableCell>
							<TableCell>
								<Badge
									text={deslugify(row.style).sentence}
									type="neutral"
									size="medium"
									style="outlined"
								/>
							</TableCell>
							<TableCell>
								<Badge
									text={deslugify(row.length).sentence}
									type="neutral"
									size="medium"
									style="outlined"
								/>
							</TableCell>
							<TableCell>
								<Badge
									text={row.chordProgression}
									type="neutral"
									size="medium"
									style="outlined"
								/>
							</TableCell>
							<TableCell alignment="end">
								<Link href={linkResolver(row.slug, 'lexicon')}>See more</Link>
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}

export { LexiconTable }
