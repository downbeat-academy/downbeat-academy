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
import { Link } from '@components/link'
import { linkResolver } from '@utils/link-resolver'

const LexiconTable = ({ data }) => {

  console.log(data)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Artist</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Album</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Style</TableHead>
          <TableHead>Length</TableHead>
          <TableHead>Chord progression</TableHead>
          <TableHead>Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => {
          return (
            <TableRow key={row._id}>
              <TableCell>{row.artist}</TableCell>
              <TableCell>{row.track}</TableCell>
              <TableCell>{row.album}</TableCell>
              <TableCell>{formatTime(row.timestamp).totalTime}</TableCell>
              <TableCell>{deslugify(row.style).sentence}</TableCell>
              <TableCell>{deslugify(row.length).sentence}</TableCell>
              <TableCell>{row.chordProgression}</TableCell>
              <TableCell><Link href={linkResolver(row.slug, 'lexicon')}>See more</Link></TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { LexiconTable }