import Link from 'next/link'
import { linkResolver } from '@utils/link-resolver'
import { Text } from 'cadence-core'
import { Badge, Flex } from 'cadence-core'
import s from './lexicon-item.module.css'

const LexiconItem = ({ title, url, album, track, timestamp }: { title: string; url: string; album: string; track: string; timestamp: string }) => {
	return (
		<Link href={linkResolver(url, 'lexicon')} className={s.root}>
			<Text
				tag="h2"
				size="h4"
				type="expressive-headline"
				color="primary"
				collapse
			>
				{title}
			</Text>
			<Flex direction="row" gap="small" wrap>
				<Badge
					text={`Album: ${album}`}
					type="neutral"
					style="outlined"
					size="small"
				/>
				<Badge
					text={`Track: ${track}`}
					type="neutral"
					style="outlined"
					size="small"
				/>
				<Badge text={timestamp} type="neutral" style="outlined" size="small" />
			</Flex>
		</Link>
	)
}

export { LexiconItem }
