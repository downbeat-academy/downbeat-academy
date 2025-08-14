import { sanityClient } from '@lib/sanity/sanity.client'
import { lexiconPaths, lexiconsBySlugQuery } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { formatTime } from '@utils/format-time'
import { Text } from 'cadence-core'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { RichText } from '@components/rich-text'
import { Badge, Flex } from 'cadence-core'
import { MusicNotation } from '@components/music-notation'
import { AudioPlayer } from '@components/audio'

import s from './lexicon-page.module.css'
import type { SlugParams, SlugString } from '../../../../../types/common'

const client = sanityClient

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; slug: string }>
}) {
	const { slug } = await params

	try {
		const lexicon = await sanityClient.fetch(
			lexiconsBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				}
			}
		)

		return {
			title: getOgTitle(
				`${lexicon.artist} - ${lexicon.album} - ${lexicon.track} - ${formatTime(lexicon.timestamp).totalTime
				}`
			),
			description: lexicon.excerpt,
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function generateStaticParams(): Promise<SlugParams[]> {
	try {
		const slugs: SlugString[] = await sanityClient.fetch(
			lexiconPaths,
			{},
			{
				next: {
					revalidate: 60,
				}
			}
		)

		return slugs.map((slug: string) => ({ slug }))
	} catch (error) {
		{
			console.error(error)
			throw error
		}
	}
}

export default async function LexiconSlugRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const lexicon = await client.fetch(lexiconsBySlugQuery, { slug })
	const {
		artist,
		album,
		track,
		timestamp,
		style,
		length,
		chordProgression,
		description,
		excerpt,
		audio,
	} = lexicon

	const lexiconMetadata = [
		{
			title: 'Artist',
			value: artist,
		},
		{
			title: 'Album',
			value: album,
		},
		{
			title: 'Track',
			value: track,
		},
		{
			title: 'Timestamp',
			value: formatTime(timestamp).totalTime,
		},
		{
			title: 'Style',
			value: style,
		},
		{
			title: 'Length',
			value: length,
		},
		{
			title: 'Chord Progression',
			value: chordProgression,
		},
	]

	const renderMetadata = lexiconMetadata.map((item: { title: string; value: string }) => {
		return (
			<Flex
				direction="column"
				alignItems="start"
				gap="2x-small"
				key={item.value}
			>
				<Text
					tag="p"
					type="productive-body"
					size="body-base"
					color="primary"
					collapse
				>
					{item.title}:
				</Text>
				<Badge text={item.value} type="neutral" size="large" />
			</Flex>
		)
	})

	return (
		<>
			<SectionContainer>
				<SectionTitle background="primary">
					<Flex direction="row" gap="large" justifyContent="space-between" wrap>
						{renderMetadata}
					</Flex>
				</SectionTitle>
				<section className={s.excerpt}>
					<Flex
						direction="column"
						gap="medium"
						className={s['excerpt-content']}
					>
						<RichText value={description.content} />
						<AudioPlayer tracks={audio} showTitle={false} showArtist={false} />
						<MusicNotation files={excerpt.files} collapse />
					</Flex>
				</section>
			</SectionContainer>
		</>
	)
}
