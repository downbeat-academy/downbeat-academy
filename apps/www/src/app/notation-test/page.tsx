import OpenSheetMusicDisplay from '@components/music-notation/music-notation/osmd-component'
import { Text } from 'cadence-core'

export default function NotationTest() {
	return (
		<>
			<Text>Uncompressed MusicXML</Text>
			<OpenSheetMusicDisplay
				file="/notation-test-flute.musicxml"
				transpose={5}
			/>
		</>
	)
}
